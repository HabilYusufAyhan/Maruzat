import { Eye, EyeOff } from "lucide-react";
export const renderSecuritySection = ({
  showPassword,
  setShowPassword,
  handleInputChange,
  settings,
}) => (
  <div className="space-y-4">
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Mevcut Şifre
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={settings.currentPassword}
          onChange={(e) => handleInputChange("currentPassword", e.target.value)}
          placeholder="Mevcut şifrenizi girin"
          className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>

    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Yeni Şifre
      </label>
      <input
        type="password"
        value={settings.newPassword}
        onChange={(e) => handleInputChange("newPassword", e.target.value)}
        placeholder="Yeni şifrenizi girin"
        className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
      />
    </div>

    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
      <div className="flex-1">
        <p className="font-medium text-gray-800">İki Faktörlü Doğrulama</p>
        <p className="text-sm text-gray-500">
          Hesabınız için ek güvenlik katmanı
        </p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={settings.twoFactorAuth}
          onChange={(e) => handleInputChange("twoFactorAuth", e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
      </label>
    </div>
  </div>
);
