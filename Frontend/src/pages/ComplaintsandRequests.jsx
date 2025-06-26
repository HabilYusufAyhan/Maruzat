import React, { useState } from "react";
import {
  MessageSquare,
  AlertTriangle,
  Lightbulb,
  Send,
  CheckCircle,
} from "lucide-react";
import { Alert } from "../partials/Alert";
import { isValidEmail } from "../config/isValidEmail";

const ComplaintRequestPage = () => {
  const [selectedType, setSelectedType] = useState("complaint");
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    description: "",
    priority: "medium",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    title: "",
    message: "",
  });
  const handleSubmit = () => {
    if (!isValidEmail(formData.email)) {
      setAlertData({
        type: "warning",
        title: "Form Gönderilemedi!",
        message: "Lütfen geçerli bir email adresi girin.",
      });
      setOpenAlert(true);
      return;
    }

    setIsSubmitted(true);
  };

  const getTypeIcon = () => {
    switch (selectedType) {
      case "complaint":
        return <AlertTriangle className="h-6 w-6 text-red-500" />;
      case "request":
        return <Lightbulb className="h-6 w-6 text-yellow-500" />;
      case "suggestion":
        return <MessageSquare className="h-6 w-6 text-blue-500" />;
      default:
        return <MessageSquare className="h-6 w-6 text-gray-500" />;
    }
  };

  const getTypeText = () => {
    switch (selectedType) {
      case "complaint":
        return "Şikayet";
      case "request":
        return "İstek";
      case "suggestion":
        return "Öneri";
      default:
        return "Geri Bildirim";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
        {!isSubmitted ? (
          <div>
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
                Şikayet & İstek
              </h2>
              <p className="text-sm text-gray-500">
                Geri bildirimleriniz bizim için çok değerli. Lütfen detaylı
                açıklama yapın.
              </p>
            </div>

            {/* Tip Seçimi */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Geri Bildirim Türü
              </label>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedType("complaint")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    selectedType === "complaint"
                      ? "bg-red-50 border-red-500 text-red-700"
                      : "bg-white border-gray-300 hover:border-red-500"
                  }`}
                >
                  <AlertTriangle size={20} />
                  <span className="font-medium">Şikayet</span>
                </button>

                <button
                  onClick={() => setSelectedType("request")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    selectedType === "request"
                      ? "bg-yellow-50 border-yellow-500 text-yellow-700"
                      : "bg-white border-gray-300 hover:border-yellow-500"
                  }`}
                >
                  <Lightbulb size={20} />
                  <span className="font-medium">Özellik İsteği</span>
                </button>

                <button
                  onClick={() => setSelectedType("suggestion")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    selectedType === "suggestion"
                      ? "bg-blue-50 border-blue-500 text-blue-700"
                      : "bg-white border-gray-300 hover:border-blue-500"
                  }`}
                >
                  <MessageSquare size={20} />
                  <span className="font-medium">Öneri</span>
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Sizinle iletişim kurabilmemiz için email adresinizi yazın"
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            {/* Başlık */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Başlık
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Kısa ve öz bir başlık yazın"
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>

            {/* Öncelik */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Öncelik Seviyesi
              </label>
              <select
                value={formData.priority}
                onChange={(e) => handleInputChange("priority", e.target.value)}
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              >
                <option value="low">Düşük</option>
                <option value="medium">Orta</option>
                <option value="high">Yüksek</option>
                <option value="urgent">Acil</option>
              </select>
            </div>

            {/* Açıklama */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Detaylı Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Lütfen problemi veya isteğinizi detaylı bir şekilde açıklayın..."
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none resize-none"
                rows="5"
              />
            </div>
            {openAlert && (
              <Alert
                type={alertData.type}
                title={alertData.title}
                message={alertData.message}
                onClose={() => setOpenAlert(false)}
              />
            )}
            <button
              onClick={handleSubmit}
              disabled={!formData.title || !formData.description}
              className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium flex justify-center items-center gap-2"
            >
              <Send size={18} /> Gönder
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Gönderildi! ✨
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">{getTypeText()}</span> formunuz
              başarıyla gönderildi. Ekibimiz en kısa sürede değerlendirip size
              geri dönüş yapacak.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-center gap-2 text-sm text-blue-800">
                {getTypeIcon()}
                <span className="font-medium">{formData.title}</span>
              </div>
              <p className="text-xs text-blue-600">
                Takip numaranız: #MZ
                {Math.random().toString(36).substr(2, 6).toUpperCase()}
              </p>
            </div>
          </div>
        )}

        <div className="text-center">
          <a
            href="/"
            className="text-blue-900 font-medium hover:underline text-sm"
          >
            Ana sayfaya dön
          </a>
        </div>
      </div>
    </div>
  );
};

export default ComplaintRequestPage;
