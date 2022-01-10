import { createSlice } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { firebaseStorage } from "../firebase";

const DB_URI = process.env.REACT_APP_DB_URI as string;

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
    _addProduct(state, action) {
      console.log("addProduct");
      state.products.push(state.products[0]);
    },
    _updateProduct(state, action) {
      console.log("updateProduct");
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products[index] = { ...state.products[index], ...action.payload };
    },
    _deleteProduct(state, action) {
      console.log("deleteProduct");
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const fetchProducts = () => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/products`);
      if (response.ok) {
        const products = await response.json();
        dispatch(loadProducts(products));
      } else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error fetching products: " + error);
    }
  };
};

export const addProduct = (product: Product) => {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`${DB_URI}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      if (response.ok) {
        const newProduct = await response.json();
        dispatch(_addProduct(newProduct));
      } else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error adding product: " + error);
    }
  };
};

type UpdateProductPayload = {
  productId: string;
  newProduct: Partial<Product>;
  image: Blob | null; // if in edit and image uploaded, type is Blob. if in edit and image not uploaded (same image), it is null.
};
export const updateProduct = ({
  productId,
  newProduct,
  image,
}: UpdateProductPayload) => {
  return async (dispatch: any) => {
    const imageId = uuidv4();
    const imageRef = ref(firebaseStorage, `product-images/${imageId}`);
    try {
      if (image) {
        // upload the new image and get url to set product.imageUrl
        await uploadBytes(imageRef, image);
        newProduct.imageUrl = await getDownloadURL(imageRef);
        // // delete old image from db if editing, an image uploaded, and an old image exists
        // implement delete old image from db
      }

      const response = await fetch(`${DB_URI}/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) dispatch(_updateProduct(newProduct));
      else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error updating product: " + error);
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: any, getState: any) => {
    try {
      const response = await fetch(`${DB_URI}/products/${productId}`, {
        method: "DELETE",
      });
      if (response.ok) dispatch(_deleteProduct(productId));
      else throw new Error(`${response.status} - ${response.statusText}`);
    } catch (error) {
      throw new Error("Error deleting product: " + error);
    }
  };
};

export const { loadProducts, _addProduct, _updateProduct, _deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
