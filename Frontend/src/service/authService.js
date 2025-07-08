// src/api/userAPI.js
import axios from "../config/axios.js";

// Kullanıcı bilgilerini al
export const login = async (userData) => {
  const response = await axios.get(`/login`, userData);
  return response;
};

// Yeni kullanıcı oluştur
export const signup = async (userData) => {
  const response = await axios.post("/signup", userData);
  return response;
};
