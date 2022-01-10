import { createSlice } from "@reduxjs/toolkit";

const DB_URI = process.env.REACT_APP_DB_URI as string;

interface OrdersState {
  orders: Order[];
  archivedOrders: Order[];
}

const initialState: OrdersState = {
  orders: [],
  archivedOrders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    loadOrders(state, action) {
      console.log("loadOrders");
      state.orders = action.payload;
      console.log(state.orders);
    },
    loadArchive(state, action) {
      console.log("loadArchive");
      state.archivedOrders = action.payload;
      console.log(state.archivedOrders);
    },
    _addOrder(state, action) {
      console.log("addOrder");
      state.orders.push(state.orders[0]);
    },
    _updateOrder(state, action) {
      console.log("updateOrder");
      const index = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      const updatedOrder = { ...state.orders[index], ...action.payload };
      if (action.payload.done) {
        state.orders.splice(index, 1);
        state.archivedOrders.push(updatedOrder);
      } else state.orders[index] = updatedOrder;
    },
  },
});

export const fetchOrders = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/orders?done=false`);
      if (response.ok) {
        const orders = await response.json();
        dispatch(loadOrders(orders));
      } else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error fetching orders: " + error);
    }
  };
};

export const fetchArchive = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/orders?done=true`);
      if (response.ok) {
        const archivedOrders = await response.json();
        dispatch(loadArchive(archivedOrders));
      } else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error fetching archived orders: " + error);
    }
  };
};

export const addOrder = (order: Order) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (response.ok) {
        const newOrder = await response.json();
        dispatch(_addOrder(newOrder));
      } else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error adding order: " + error);
    }
  };
};

type UpdateOrderPayload = {
  orderId: string;
  newOrder: Partial<Order>;
};
export const updateOrder = ({ newOrder, orderId }: UpdateOrderPayload) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      if (response.ok) dispatch(_updateOrder(newOrder));
      else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error updating order: " + error);
    }
  };
};

export const { loadOrders, loadArchive, _addOrder, _updateOrder } =
  ordersSlice.actions;

export default ordersSlice.reducer;
