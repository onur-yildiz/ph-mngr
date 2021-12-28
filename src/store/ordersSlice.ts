import { createSlice } from "@reduxjs/toolkit";

interface OrdersState {
  orders: Order[];
  showArchived: boolean;
}

const initialState: OrdersState = {
  orders: [],
  showArchived: false,
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
    add(state, action) {
      console.log("add");
      state.orders.push(state.orders[0]);
    },
    toggleDone(state, action) {
      console.log("toggleDone");
      const order = state.orders.find(
        (order) => order.uid === action.payload.uid
      );
      if (order) order.done = !order.done;
    },
  },
});

export const { loadOrders, add, toggleDone } = ordersSlice.actions;

export default ordersSlice.reducer;
