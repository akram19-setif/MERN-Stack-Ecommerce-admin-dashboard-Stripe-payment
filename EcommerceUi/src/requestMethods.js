import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_API;

// JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.currentUser)
//   ?.accessToken || "";

const stripeApiKey = process.env.REACT_APP_STRIPE;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
function getTokenFromLocalStorage() {
  try {
    const accessToken = localStorage.getItem("accessToken") || "";
    return accessToken;
  } catch (error) {
    // Handle error if localStorage access fails
    return "";
  }
}
const TOKEN = getTokenFromLocalStorage();
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
export const stripeRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${stripeApiKey}`,
  },
});
