import {
  User,
  Globe,
  Mail,
  UserPen,
  X,
  NotebookText,
  Camera,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  Github,
  Music2,
} from "lucide-react";
export const renderProfileSection = ({
  handleImageUpload,
  handleInputChange,
  settings,
}) => (
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
              value={settings.socialMedia.instagram || ""}
              onChange={(e) =>
                handleInputChange("socialMedia.instagram", e.target.value)
              }
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
              value={settings.socialMedia.twitter || ""}
              onChange={(e) =>
                handleInputChange("socialMedia.twitter", e.target.value)
              }
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
              value={settings.socialMedia.linkedin || ""}
              onChange={(e) =>
                handleInputChange("socialMedia.linkedin", e.target.value)
              }
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
              value={settings.socialMedia.facebook || ""}
              onChange={(e) =>
                handleInputChange("socialMedia.facebook", e.target.value)
              }
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
              value={settings.socialMedia.youtube || ""}
              onChange={(e) =>
                handleInputChange("socialMedia.youtube", e.target.value)
              }
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
              value={settings.socialMedia.tiktok || ""}
              onChange={(e) =>
                handleInputChange("socialMedia.tiktok", e.target.value)
              }
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
              value={settings.socialMedia.github || ""}
              onChange={(e) =>
                handleInputChange("socialMedia.github", e.target.value)
              }
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
              value={settings.socialMedia.website || ""}
              onChange={(e) =>
                handleInputChange("socialMedia.website", e.target.value)
              }
              placeholder="https://example.com"
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-900 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
