import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

// 🔥 RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // 🚫 Don't retry refresh request itself
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    // ✅ Retry only once for 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        console.log("Refresh successful");
        return api(originalRequest);
      } catch (refreshError) {
        // 🔥 HARD STOP (no loop)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
