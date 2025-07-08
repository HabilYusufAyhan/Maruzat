// src/api/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // 🌐 API adresini buraya yaz
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${token}`, // Gerekirse token buraya eklenebilir
  },
});

// Request Interceptor (istek öncesi)
axiosInstance.interceptors.request.use(
  (config) => {
    // Örn: her istekte token göndermek istersen
    const refreshToken = localStorage.getItem("refreshToken");
    const token = localStorage.getItem("accessToken") || refreshToken; // Token veya refresh token kullan
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (yanıt sonrası)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Hataları burada yakalayabilirsin
    if (error.response?.status === 401) {
      console.warn("Yetkisiz! Giriş yapmanız gerekiyor.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
