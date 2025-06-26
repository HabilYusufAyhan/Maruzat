import React, { useState } from "react";
import { Heart, CreditCard, Coffee, Gift, CheckCircle } from "lucide-react";

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("credit-card");
  const [isDonated, setIsDonated] = useState(false);

  const predefinedAmounts = [10, 25, 50, 100, 250];

  const handleDonate = () => {
    setIsDonated(true);
  };
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const getSelectedAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-6">
        {!isDonated ? (
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
                Bağış Yap
              </h2>
              <p className="text-sm text-gray-500">
                Maruzat topluluğunu destekle, projemizin büyümesine katkı sağla.
              </p>
            </div>

            {/* Bağış Miktarı */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Bağış Miktarı (₺)
              </label>

              <div className="grid grid-cols-3 gap-2">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                    className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                      selectedAmount === amount
                        ? "bg-blue-900 text-white border-blue-900"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-900"
                    }`}
                  >
                    ₺{amount}
                  </button>
                ))}
              </div>

              <div>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  placeholder="Özel miktar (₺)"
                  className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Ödeme Yöntemi */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Ödeme Yöntemi
              </label>

              <div className="space-y-2">
                <button
                  onClick={() => setSelectedMethod("credit-card")}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    selectedMethod === "credit-card"
                      ? "bg-blue-50 border-blue-900 text-blue-900"
                      : "bg-white border-gray-300 hover:border-blue-900"
                  }`}
                >
                  <CreditCard size={20} />
                  <span className="font-medium">Kredi/Banka Kartı</span>
                </button>
              </div>
            </div>
            {selectedMethod === "credit-card" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kart Numarası
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, "");
                      value = value.replace(/(.{4})/g, "$1 ").trim();
                      setCardNumber(value);
                    }}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16 + 3} // boşluklar dahil
                    className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      Son Kullanma Tarihi
                    </label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => {
                        let value = e.target.value.replace(/\D/g, "");
                        if (value.length > 2) {
                          value = value.slice(0, 2) + "/" + value.slice(2, 4);
                        }
                        setExpiryDate(value);
                      }}
                      placeholder="AA/YY"
                      maxLength={5}
                      className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                  </div>

                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Kart Üzerindeki İsim
                  </label>
                  <input
                    type="text"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Ad Soyad"
                    className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Bağış Mesajı */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Mesaj (İsteğe Bağlı)
              </label>
              <textarea
                placeholder="Desteklediğin için teşekkürler!"
                className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none resize-none"
                rows="3"
              />
            </div>

            <button
              onClick={handleDonate}
              disabled={getSelectedAmount() === 0}
              className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium flex justify-center items-center gap-2"
            >
              <Heart size={18} />
              {getSelectedAmount() > 0
                ? `₺${getSelectedAmount()} Bağışla`
                : "Bağışla"}
            </button>
          </>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-semibold text-gray-800">
              Teşekkürler! 🎉
            </h2>
            <p className="text-sm text-gray-600">
              <span className="font-medium">₺{getSelectedAmount()}</span>{" "}
              bağışın için çok teşekkürler! Desteğin sayesinde Maruzat topluluğu
              büyümeye devam edecek.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs text-blue-800">
                Bağış makbuzun e-posta adresine gönderilecek.
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

export default DonationPage;
