import axios from "axios";

const api = axios.create({
  baseURL: "/api/",
});

api.interceptors.request.use(
  (config) => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      const token = parsedUser?.user?.token?.token;
      if (token) {
        config.headers.Authorization = `Basic ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export { api };
