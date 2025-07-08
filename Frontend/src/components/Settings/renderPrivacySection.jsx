import { X } from "lucide-react";
export const renderPrivacySection = ({ handleInputChange, settings }) => (
  <div className="space-y-4">
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Profil Görünürlüğü
      </label>
      <select
        value={settings.profileVisibility}
        onChange={(e) => handleInputChange("profileVisibility", e.target.value)}
        className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
      >
        <option value="public">Herkese Açık</option>
        <option value="friends">Sadece Arkadaşlar</option>
        <option value="private">Gizli</option>
      </select>
    </div>

    {[
      {
        key: "Ad",
        label: "Kişiselleştirilmiş Reklamlar",
        desc: "Açık olduğunda, kişiselleştirilmiş reklamlar görürsünüz.",
      },
    ].map((item) => (
      <div
        key={item.key}
        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
      >
        <div className="flex-1">
          <p className="font-medium text-gray-800">{item.label}</p>
          <p className="text-sm text-gray-500">{item.desc}</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings[item.key]}
            onChange={(e) => handleInputChange(item.key, e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    ))}
    <button
      className={`w-full sm:w-auto px-6 py-2.5 border-red-600 text-red-600 hover:bg-red-600 hover:text-white border-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors`}
    >
      <X size={18} className="flex items-center justify-center" />
      Hesabı Sil
    </button>
  </div>
);
