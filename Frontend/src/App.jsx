import React, { useEffect, memo } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import MaruzatDetail from "./pages/MaruzatDetail.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import DonationPage from "./pages/DonationPage.jsx";
import ForgotPasswordPage from "./pages/ForgetPassword.jsx";
import ComplaintRequestPage from "./pages/ComplaintsandRequests.jsx";
import SettingsPage from "./pages/Settings.jsx";

const App = () => {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "auto";
    console.log(`Saved theme: ${savedTheme}`);

    const applyTheme = (theme) => {
      if (theme === "dark") {
        document.documentElement.classList.add("dark-mode");
      } else if (theme === "light") {
        document.documentElement.classList.remove("dark-mode");
      } else if (theme === "auto") {
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        if (isDarkMode) {
          document.documentElement.classList.add("dark-mode");
        } else {
          document.documentElement.classList.remove("dark-mode");
        }
      }
    };

    applyTheme(savedTheme);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/maruzat/:id" element={<MaruzatDetail />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/donation" element={<DonationPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/complaints" element={<ComplaintRequestPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default memo(App);
