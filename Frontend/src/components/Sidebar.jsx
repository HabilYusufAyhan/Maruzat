import {
  Settings,
  User,
  LogOut,
  Heart,
  Flag,
  Monitor,
  Smartphone,
  Bell,
  BellDot,
  Dot,
  X,
  MessageCircle,
  ThumbsUp,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import React, { useState } from "react";

export const Sidebar = ({
  showCategories,
  setSidebarOpen,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const categories = [
    "Tümü",
    "Sanat",
    "Bilim",
    "Teknoloji",
    "Edebiyat",
    "Turizm",
    "Hukuk",
    "Siyaset",
    "Din",
    "Ekonomi",
    "Felsefe",
  ];

  const userStats = {
    name: "Mehmet Yılmaz",
    maruzatCount: 24,
    replyCount: 156,
    level: "Uzman",
    role: "Moderatör",
    device: "Casper Excalibur G770",
  };

  // Örnek bildirimler
  const notifications = [
    {
      id: 1,
      type: "reply",
      title: "Yeni Cevap",
      message: "Ahmet Kaya maruzatınıza cevap verdi",
      time: "5 dk önce",
      isRead: false,
      icon: MessageCircle,
    },
    {
      id: 2,
      type: "like",
      title: "Beğeni",
      message: "Ayşe Demir maruzatınızı beğendi",
      time: "1 saat önce",
      isRead: false,
      icon: ThumbsUp,
    },
    {
      id: 3,
      type: "follow",
      title: "Yeni Takipçi",
      message: "Fatma Öz sizi takip etmeye başladı",
      time: "2 saat önce",
      isRead: true,
      icon: UserPlus,
    },
    {
      id: 4,
      type: "system",
      title: "Sistem Bildirimi",
      message: "Profil bilgilerinizi güncelleyin",
      time: "1 gün önce",
      isRead: true,
      icon: AlertCircle,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type) => {
    const iconProps = { size: 16, className: "text-blue-600" };
    switch (type) {
      case "reply":
        return <MessageCircle {...iconProps} />;
      case "like":
        return <ThumbsUp {...iconProps} />;
      case "follow":
        return <UserPlus {...iconProps} />;
      case "system":
        return <AlertCircle {...iconProps} />;
      default:
        return <Bell {...iconProps} />;
    }
  };

  return (
    <div
      className={`bg-white sticky top-0 shadow-lg flex flex-col h-screen z-50`}
    >
      {/* Kullanıcı Bilgileri */}
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl">
              MY
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-gray-900 text-sm lg:text-base truncate">
                {userStats.name}
              </h3>
              <p className="text-xs lg:text-sm text-gray-600">
                {userStats.role}
              </p>
            </div>
          </div>

          {/* Bildirim Butonu */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-blue-900 transition-colors rounded-full hover:bg-gray-100"
            >
              {unreadCount > 0 ? (
                <BellDot size={20} className="text-blue-600" />
              ) : (
                <Bell size={20} />
              )}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Bildirim Container'ı */}
            {showNotifications && (
              <div className="relative z-50">
                <div className="absolute top-full right-0 left-0  w-80 bg-white rounded-lg shadow-xl border border-gray-200 mt-2  max-h-[26rem] z-50">
                  <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900">Bildirimler</h3>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        Henüz bildirim yok
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`z-50 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                            !notification.isRead ? "bg-blue-50" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-gray-900 text-sm">
                                  {notification.title}
                                </p>
                                {!notification.isRead && (
                                  <Dot className="text-blue-600 w-4 h-4" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 mt-2">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                      Tüm bildirimleri gör
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 lg:gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg lg:text-2xl font-bold text-blue-900">
              {userStats.maruzatCount}
            </div>
            <div className="text-xs text-gray-600">Maruzat</div>
          </div>
          <div className="text-center">
            <div className="text-lg lg:text-2xl font-bold text-blue-900">
              {userStats.replyCount}
            </div>
            <div className="text-xs text-gray-600">Cevap</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs lg:text-sm">
          <div className="flex items-center space-x-1">
            <Monitor size={14} className="text-gray-600 hidden sm:block" />
            <Smartphone size={14} className="text-gray-600 sm:hidden" />
            <span className="text-gray-600 hidden sm:inline">
              {userStats.device}
            </span>
            <span className="text-gray-600 sm:hidden">Mobil</span>
          </div>
          <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
            {userStats.level}
          </div>
        </div>

        {/* Kullanıcı Menüsü */}
        <div className="relative mt-4">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center justify-center space-x-2 py-2 text-gray-600 hover:text-blue-900 transition-colors"
          >
            <span className="text-lg">⋯</span>
          </button>

          {showUserMenu && (
            <div className="absolute top-full left-0 w-full bg-white rounded-lg shadow-lg border border-gray-200 mt-1 z-20">
              <a
                href="/settings"
                className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
              >
                <Settings size={16} />
                <span>Ayarlar</span>
              </a>
              <a
                href="/profile"
                className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
              >
                <User size={16} />
                <span>Profil</span>
              </a>
              <a
                href="/donation"
                className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
              >
                <Heart size={16} />
                <span>Bağışta Bulun</span>
              </a>
              <a
                href="/complaints"
                className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-sm"
              >
                <Flag size={16} />
                <span>Şikayet & İstek</span>
              </a>
              <hr className="my-1" />
              <a
                href="/logout"
                className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-gray-50 transition-colors text-red-600 text-sm"
              >
                <LogOut size={16} />
                <span>Çıkış Yap</span>
              </a>
            </div>
          )}
        </div>
      </div>

      {showCategories && (
        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <h4 className="font-bold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">
            Kategoriler
          </h4>

          <div className="space-y-1 lg:space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  console.log(`Kategori seçildi: ${category}`);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left px-2 lg:px-3 py-2 rounded-lg transition-colors text-sm lg:text-base ${
                  selectedCategory === category
                    ? "bg-blue-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
