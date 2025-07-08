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
import { renderSecuritySection } from "../components/Settings/renderSecuritySection";
import { renderProfileSection } from "../components/Settings/renderProfileSection";
import { renderAppearanceSection } from "../components/Settings/renderAppearanceSection";
import { renderPrivacySection } from "../components/Settings/renderPrivacySection";
import { renderNotificationsSection } from "../components/Settings/renderNotificationsSection";

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
      socialMedia: {
        instagram: "",
        twitter: "",
        linkedin: "",
        facebook: "",
        youtube: "",
        tiktok: "",
        github: "",
        website: "",
      },

      // Bildirim Ayarları
      emailNotifications: true,

      // Güvenlik Ayarları
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorAuth: false,

      // Görünüm

      theme: savedTheme || "auto", // localStorage'dan gelen veya 'auto'

      // Gizlilik Ayarları
      profileVisibility: "public",
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

  const handleInputChange = (fieldPath, value) => {
    setSettings((prev) => {
      const keys = fieldPath.split(".");
      if (keys.length === 1) {
        return { ...prev, [keys[0]]: value };
      } else if (keys.length === 2) {
        return {
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        };
      }
    });
    console.log("Updated settings:", settings);
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
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return renderProfileSection({
          handleImageUpload,
          handleInputChange,
          settings,
        });
      case "notifications":
        return renderNotificationsSection({ settings });
      case "security":
        return renderSecuritySection({
          showPassword,
          setShowPassword,
          handleInputChange,
          settings,
        });
      case "appearance":
        return renderAppearanceSection({
          settings,
          handleInputChange,
        });
      case "privacy":
        return renderPrivacySection({
          handleInputChange,
          settings,
        });
      default:
        return renderProfileSection({
          handleImageUpload,
          handleInputChange,
          settings,
        });
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
