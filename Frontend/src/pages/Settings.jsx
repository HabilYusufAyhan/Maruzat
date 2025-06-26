import React, { useEffect, useState } from "react";
import {
  User,
  Bell,
  Lock,
  Globe,
  Palette,
  Shield,
  Save,
  Check,
  ChevronRight,
  Mail,
  Phone,
  Eye,
  EyeOff,
  UserPen,
  Delete,
  X,
  NotebookText,
  Camera,
  Menu,
  ArrowLeft,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  Music,
  Github,
  Music2,
  Home,
} from "lucide-react";
import { FcAbout } from "react-icons/fc";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isSaved, setIsSaved] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [sidebarOpenSettings, setSidebarOpenSettings] = useState(false);

  const [settings, setSettings] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    return {
      // Profil Ayarları
      firstName: "Ahmet",
      lastName: "Yılmaz",
      email: "ahmet.yilmaz@email.com",
      username: "ahmet_yilmaz",
      about: "Merhaba, ben Ahmet. Yazılım geliştiricisiyim.",
      profilePhoto: "",
      coverPhoto: "",
      instagram: "",
      twitter: "",
      linkedin: "",
      facebook: "",
      youtube: "",
      tiktok: "",
      github: "",
      website: "",

      // Bildirim Ayarları
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      marketingEmails: false,

      // Güvenlik Ayarları
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorAuth: false,

      // Görünüm
      language: "tr",
      fontSize: "medium",
      theme: savedTheme || "auto", // localStorage'dan gelen veya 'auto'

      // Gizlilik Ayarları
      profileVisibility: "public",
      dataSharing: false,
      analytics: true,
    };
  });

  const handleImageUpload = (field, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange(field, e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    setSidebarOpenSettings(false); // Mobile'da sidebar'ı kapat
  };

  useEffect(() => {
    const updateTheme = () => {
      let finalTheme = settings.theme;

      if (settings.theme === "dark") {
        document.documentElement.classList.add("dark-mode");
      } else if (settings.theme === "light") {
        document.documentElement.classList.remove("dark-mode");
      } else if (settings.theme === "auto") {
        const isDarkMode = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        finalTheme = isDarkMode ? "dark" : "light";

        if (isDarkMode) {
          document.documentElement.classList.add("dark-mode");
        } else {
          document.documentElement.classList.remove("dark-mode");
        }
      }

      // localStorage'a kaydet
      localStorage.setItem("theme", finalTheme);
    };

    updateTheme();
  }, [settings.theme]);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const sections = [
    { id: "profile", label: "Profil Bilgileri", icon: User },
    { id: "notifications", label: "Bildirimler", icon: Bell },
    { id: "security", label: "Güvenlik", icon: Lock },
    { id: "appearance", label: "Görünüm", icon: Palette },
    { id: "privacy", label: "Gizlilik", icon: Shield },
    { id: "language", label: "Dil & Bölge", icon: Globe },
  ];

  const renderProfileSection = () => (
    <div className="space-y-4">
      {/* Profil ve Kapak Fotoğrafı Alanı */}
      <div className="space-y-4">
        {/* Kapak Fotoğrafı */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Kapak Fotoğrafı
          </label>
          <div className="relative">
            <div
              className={
                "w-full h-24 sm:h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors " +
                (settings.coverPhoto ? "filtered-exception" : "")
              }
              style={{
                backgroundImage: settings.coverPhoto
                  ? `url(${settings.coverPhoto})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!settings.coverPhoto && (
                <div className="text-center">
                  <Camera className="mx-auto h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mb-2" />
                  <p className="text-xs sm:text-sm text-gray-500">
                    Kapak fotoğrafı yükle
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload("coverPhoto", e.target.files[0])
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            {settings.coverPhoto && (
              <button
                onClick={() => handleInputChange("coverPhoto", "")}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Profil Fotoğrafı */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Profil Fotoğrafı
          </label>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <div
                className={
                  "w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors overflow-hidden " +
                  (settings.profilePhoto ? "filtered-exception" : "")
                }
                style={{
                  backgroundImage: settings.profilePhoto
                    ? `url(${settings.profilePhoto})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!settings.profilePhoto && (
                  <User className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleImageUpload("profilePhoto", e.target.files[0])
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
              {settings.profilePhoto && (
                <button
                  onClick={() => handleInputChange("profilePhoto", "")}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="h-2 w-2 sm:h-3 sm:w-3" />
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500">
              <p>Profil fotoğrafınızı yükleyin</p>
              <p className="text-xs">JPG, PNG veya GIF formatında</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mevcut Form Alanları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Ad
          </label>
          <input
            type="text"
            value={settings.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Soyad
          </label>
          <input
            type="text"
            value={settings.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          E-posta
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="email"
            value={settings.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Kullanıcı Adı
        </label>
        <div className="relative">
          <UserPen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={settings.username}
            onChange={(e) => handleInputChange("username", e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Hakkımda
        </label>
        <div className="relative">
          <NotebookText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <textarea
            value={settings.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            rows={3}
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Sosyal Medya Hesapları */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-700 border-b border-gray-200 pb-2">
          Sosyal Medya Hesapları
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Instagram
            </label>
            <div className="relative">
              <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={settings.instagram || ""}
                onChange={(e) => handleInputChange("instagram", e.target.value)}
                placeholder="Profil URL'si"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Twitter / X
            </label>
            <div className="relative">
              <Twitter className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={settings.twitter || ""}
                onChange={(e) => handleInputChange("twitter", e.target.value)}
                placeholder="Profil URL'si"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={settings.linkedin || ""}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                placeholder="Profil URL'si"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Facebook
            </label>
            <div className="relative">
              <Facebook className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={settings.facebook || ""}
                onChange={(e) => handleInputChange("facebook", e.target.value)}
                placeholder="Profil URL'si"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              YouTube
            </label>
            <div className="relative">
              <Youtube className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={settings.youtube || ""}
                onChange={(e) => handleInputChange("youtube", e.target.value)}
                placeholder="Kanal URL'si"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              TikTok
            </label>
            <div className="relative">
              <Music2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={settings.tiktok || ""}
                onChange={(e) => handleInputChange("tiktok", e.target.value)}
                placeholder="Profil URL'si"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* GitHub ve Website için tam genişlik */}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              GitHub
            </label>
            <div className="relative">
              <Github className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={settings.github || ""}
                onChange={(e) => handleInputChange("github", e.target.value)}
                placeholder="GitHub profil URL'si"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Website
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="url"
                value={settings.website || ""}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://example.com"
                className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
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

  const renderSecuritySection = () => (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Mevcut Şifre
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={settings.currentPassword}
            onChange={(e) =>
              handleInputChange("currentPassword", e.target.value)
            }
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
            onChange={(e) =>
              handleInputChange("twoFactorAuth", e.target.checked)
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  const renderAppearanceSection = () => (
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

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Yazı Boyutu
        </label>
        <select
          value={settings.fontSize}
          onChange={(e) => handleInputChange("fontSize", e.target.value)}
          className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
        >
          <option value="small">Küçük</option>
          <option value="medium">Orta</option>
          <option value="large">Büyük</option>
        </select>
      </div>
    </div>
  );

  const renderLanguageSection = () => (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Dil
        </label>
        <select
          value={settings.language}
          onChange={(e) => handleInputChange("language", e.target.value)}
          className="w-full px-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
        >
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-4">
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Profil Görünürlüğü
        </label>
        <select
          value={settings.profileVisibility}
          onChange={(e) =>
            handleInputChange("profileVisibility", e.target.value)
          }
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

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection();
      case "notifications":
        return renderNotificationsSection();
      case "security":
        return renderSecuritySection();
      case "appearance":
        return renderAppearanceSection();
      case "language":
        return renderLanguageSection();
      case "privacy":
        return renderPrivacySection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpenSettings(!sidebarOpenSettings)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">Ayarlar</h1>
        </div>
        <img
          src={
            localStorage.getItem("theme") === "light"
              ? "/maruzatLogo.png"
              : "/maruzatLogoDark.png"
          }
          alt="Logo"
          className="h-8"
        />
      </div>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpenSettings && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpenSettings(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed lg:relative inset-y-0 left-0 z-50 w-80 lg:w-1/3 bg-white lg:bg-gray-50 border-r transform ${
            sidebarOpenSettings ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 transition-transform duration-300 ease-in-out overflow-y-auto`}
        >
          <div className="p-4 lg:p-6">
            {/* Mobile close button */}
            <div className="flex lg:hidden items-center justify-between mb-6">
              <button
                onClick={() => setSidebarOpenSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-lg font-semibold text-gray-800">Ayarlar</h2>
              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Desktop header */}
            <div className="hidden lg:block text-center mb-6">
              <img
                src={
                  localStorage.getItem("theme") === "light"
                    ? "/maruzatLogo.png"
                    : "/maruzatLogoDark.png"
                }
                alt="Logo"
                className="h-10 mx-auto"
              />
              <h2 className="text-xl font-semibold text-gray-800 mt-2">
                Ayarlar
              </h2>
              <p className="text-sm text-gray-500">
                Hesap ve uygulama ayarlarınızı yönetin
              </p>
            </div>

            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => handleSectionChange(section.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-blue-50 border border-blue-200 text-blue-700"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium flex-1">{section.label}</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white lg:bg-transparent">
          <div className="p-4 lg:p-6 max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-800">
                {sections.find((s) => s.id === activeSection)?.label}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Bu bölümde ilgili ayarlarınızı düzenleyebilirsiniz.
              </p>
            </div>

            <div className="bg-white lg:bg-transparent lg:border-0 border rounded-lg lg:rounded-none p-4 lg:p-0">
              {renderContent()}
            </div>

            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleSave}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-medium flex items-center justify-center mb-20 gap-2 transition-colors ${
                  isSaved
                    ? "bg-green-600 text-white"
                    : "bg-blue-900 hover:bg-blue-800 text-white"
                }`}
              >
                {isSaved ? (
                  <>
                    <Check size={18} />
                    Kaydedildi
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Değişiklikleri Kaydet
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center p-4 border-t bg-white fixed bottom-0 left-0 right-0 z-50">
        <a
          href="/"
          className="text-blue-900 font-medium hover:underline text-sm flex items-center justify-center mx-auto"
        >
          <ArrowLeft
            width={12}
            height={12}
            className="mr-1 flex object-center mt-[2px]"
          />
          <p>Ana sayfaya dön</p>
        </a>
        <p className="text-[10px] text-gray-500">
          Maruzat © {new Date().getFullYear()} - Tüm hakları saklıdır.
        </p>
      </div>
    </div>
  );
};

export default SettingsPage;
