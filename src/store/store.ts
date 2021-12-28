import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "./ordersSlice";

const store = configureStore({
  reducer: { order: orderReducer },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
