import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:9000/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("dali-auth-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function setAccessToken(token: string): void {
  localStorage.setItem("dali-auth-token", token);
}

export function clearAccessToken(): void {
  localStorage.removeItem("dali-auth-token");
}

export default api;
