import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

const ForgotPasswordPage = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Email gönderme işlemi burada yapılacak
    setIsEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
        {!isEmailSent ? (
          <>
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
                Şifremi Unuttum
              </h2>
              <p className="text-sm text-gray-500">
                E-posta adresini gir, sana şifre sıfırlama linki gönderelim.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                  E-posta Adresi
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@email.com"
                  className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-900 hover:bg-blue-800 text-white py-2.5 rounded-lg font-medium flex justify-center items-center gap-2"
              >
                <Mail size={18} /> Sıfırlama Linki Gönder
              </button>
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800">
              E-posta Gönderildi!
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{email}</span> adresine şifre
              sıfırlama linki gönderdik. E-postanı kontrol et ve linke
              tıklayarak şifreni sıfırla.
            </p>
            <p className="text-xs text-gray-500">
              E-posta gelmedi mi? Spam klasörünü kontrol et.
            </p>
          </div>
        )}

        <div className="text-center">
          <a
            href="/login"
            className="text-blue-900 font-medium hover:underline flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft size={16} /> Giriş sayfasına dön
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
