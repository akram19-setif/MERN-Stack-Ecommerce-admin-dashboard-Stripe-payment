import axios from "axios";

const BASE_URL = "http://localhost:5000/api";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDhjNTM5OGNkMzY4NTY0ODVmN2ZhNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NjQwNzYyOCwiZXhwIjoxNjg2NjY2ODI4fQ.ChzYtWn4kyvpgDALf0aVT5F6JbTBKCXQiRWmGYUQS0s";

// JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.currentUser)
//   ?.accessToken || "";

const stripeApiKey = process.env.REACT_APP_STRIPE;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `akram ${TOKEN}`,
  },
});
export const stripeRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${stripeApiKey}`,
  },
});
