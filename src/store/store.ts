import { configureStore } from "@reduxjs/toolkit";

import ordersReducer from "./ordersSlice";
import contactInfoReducer from "./contactInfoSlice";
import productsReducer from "./productsSlice";
import biographiesReducer from "./biographiesSlice";

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    contactInfo: contactInfoReducer,
    products: productsReducer,
    biographies: biographiesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
