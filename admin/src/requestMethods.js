import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

const local = localStorage.getItem("persist:root");
// const currentUser = local ? JSON.parse(JSON.parse(local)?.currentUser) : false;
// const TOKEN = currentUser ? currentUser?.accessToken : "";
const TOKEN = process.env.REACT_APP_TOKEN;
console.log("react token:", process.env.REACT_APP_TOKEN);
// !Chouf ki ykon persiste kayen mais currentuser undifined

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
