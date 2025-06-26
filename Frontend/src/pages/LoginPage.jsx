import React, { useState } from "react";
import { LogIn, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
        <div className="text-center">
          <img
            src={
              localStorage.getItem("theme") === "light"
                ? "/maruzatLogo.png"
                : "/maruzatLogoDark.png"
            }
            alt="Logo"
            className="h-12 mx-auto"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mt-2">
            Giriş Yap
          </h2>
          <p className="text-sm text-gray-500">
            Bir maruzatın mı var? Hemen giriş yap.
          </p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Kullanıcı Adı
            </label>
            <input
              type="text"
              placeholder="kullanici_adi"
              className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium flex justify-center items-center gap-2"
          >
            <LogIn size={18} /> Giriş Yap
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Hesabın yok mu?{" "}
          <a
            href="/register"
            className="text-blue-900 font-medium hover:underline"
          >
            Kayıt Ol
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
