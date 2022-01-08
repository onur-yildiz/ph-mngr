import { createSlice } from "@reduxjs/toolkit";

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts(state, action) {
      console.log("loadProduct");
      state.products = action.payload;
      console.log(state.products);
    },
    addProduct(state, action) {
      console.log("addProduct");
      state.products.push(state.products[0]);
    },
    updateProduct(state, action) {
      console.log("updateProduct");
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products[index] = action.payload;
    },
    deleteProduct(state, action) {
      console.log("deleteProduct");
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { loadProducts, addProduct, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
