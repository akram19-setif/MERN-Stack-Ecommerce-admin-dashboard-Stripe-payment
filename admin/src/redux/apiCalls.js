import { publicRequest, userRequest } from "../requestMethods";
import {
  addProductFailure,
  addProductStart,
  addProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  getProductFailure,
  getProductStart,
  getProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
} from "./productReducer";
import { loginFailure, loginStart, loginSuccess } from "./userReducer";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", user);
    dispatch(loginSuccess(res?.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};
// get products
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res?.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
// delete
export const deleteProducts = async (product, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.post(`/products`, { product });
    dispatch(deleteProductSuccess(res.data));
  } catch (error) {
    dispatch(deleteProductFailure());
  }
};
// add product
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  console.log("product:", product);
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    console.log("error:", error.message);
    dispatch(addProductFailure());
  }
};
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${id}`);
    dispatch(updateProductSuccess({ id, product }));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};
