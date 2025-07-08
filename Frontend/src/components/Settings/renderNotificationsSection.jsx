export const renderNotificationsSection = ({ settings }) => (
  <div className="space-y-4">
    {[
      {
        key: "emailNotifications",
        label: "E-posta Bildirimleri",
        desc: "Önemli güncellemeler için e-posta alın",
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
  </div>
);
