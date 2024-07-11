
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_API;

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

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
