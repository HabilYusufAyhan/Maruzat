export const renderAppearanceSection = ({ settings, handleInputChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">
        Tema
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {[
          { value: "light", label: "Açık" },
          { value: "dark", label: "Koyu" },
          { value: "auto", label: "Otomatik" },
        ].map((theme) => (
          <button
            key={theme.value}
            onClick={() => handleInputChange("theme", theme.value)}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
              settings.theme === theme.value
                ? "bg-blue-50 border-blue-500 text-blue-700"
                : "bg-white border-gray-300 hover:border-blue-500"
            }`}
          >
            {theme.label}
          </button>
        ))}
      </div>
    </div>
  </div>
);
