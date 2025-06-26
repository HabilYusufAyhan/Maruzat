import React, { useState } from "react";
import { CoverandProfile } from "../components/CoverandProfile";
import { ProfileInfo } from "../components/ProfileInfo";
import { ProfileStatistics } from "../components/ProfileStatistics";
import { ProfileSocialMedia } from "../components/ProfileSocialMedia";
import { Clock, MessageSquare, ThumbsDown, ThumbsUp, User } from "lucide-react";
import { UserPosts } from "../components/UserPosts";
import { UserReplies } from "../components/UserReplies";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("maruzatlar");
  const user = {
    name: "Mehmet Yılmaz",
    username: "mehmet_dev",
    role: "Moderatör",
    level: "Uzman",
    maruzatCount: 24,
    replyCount: 156,
    upvotes: 812,
    downvotes: 29,
    bio: "Teknolojiye tutkulu, öğrenmeyi seven bir yazılım geliştirici.",
    avatar: "/avatar.jpg",
    cover: "/avatar.jpg",
    socials: {
      twitter: "https://twitter.com/mehmet_dev",
      instagram: "https://instagram.com/mehmet_dev",
      linkedin: "https://linkedin.com/in/mehmet_dev",
      github: "https://github.com/mehmet_dev",
      website: "https://mehmetdev.com",
      youtube: "https://youtube.com/mehmet_dev",
      facebook: "https://facebook.com/mehmet_dev",
      tiktok: "https://tiktok.com/@mehmet_dev",
    },
  };
  const userPosts = [
    {
      id: 1,
      title: "React Hook'ları ile State Yönetimi",
      content:
        "React Hook'ları kullanarak nasıl daha etkili state yönetimi yapabiliriz? Özellikle useState ve useEffect konularında deneyimlerinizi paylaşabilir misiniz?",
      replyCount: 15,
      upvotes: 42,
      downvotes: 3,
      createdAt: "2 gün önce",
    },
    {
      id: 2,
      title: "Node.js Performance Optimizasyonu",
      content:
        "Node.js uygulamalarında performance sorunları yaşıyorum. Özellikle database query'leri çok yavaş çalışıyor. Bu konuda hangi teknikleri önerirsiniz?",
      replyCount: 28,
      upvotes: 67,
      downvotes: 5,
      createdAt: "1 hafta önce",
    },
    {
      id: 3,
      title: "TypeScript vs JavaScript",
      content:
        "Yeni bir proje başlarken TypeScript mı yoksa JavaScript mi tercih etmeliyim? Her ikisinin de avantajları var ama karar veremiyorum.",
      replyCount: 35,
      upvotes: 89,
      downvotes: 12,
      createdAt: "2 hafta önce",
    },
  ];

  const userReplies = [
    {
      id: 1,
      originalPostTitle: "CSS Grid vs Flexbox",
      originalPostContent:
        "Web geliştirmede CSS Grid ve Flexbox arasında nasıl seçim yapabilirim? Hangi durumda hangisini kullanmalıyım? Performans açısından fark var mı?",
      originalPostAuthor: "Ali Kaya",
      originalPostDate: "2 gün önce",
      content:
        "Flexbox tek boyutlu layout'lar için mükemmel, Grid ise iki boyutlu layout'lar için tasarlanmış. Kompleks grid sistemleri için CSS Grid, basit hizalama işlemleri için Flexbox kullanmanı öneririm.",
      upvotes: 23,
      downvotes: 1,
      createdAt: "1 gün önce",
    },
    {
      id: 2,
      originalPostTitle: "API Rate Limiting Nasıl Yapılır?",
      originalPostContent:
        "Node.js Express uygulamama rate limiting eklemek istiyorum. Hangi yöntemleri önerirsiniz? Redis kullanmalı mıyım yoksa memory-based çözümler yeterli mi?",
      originalPostAuthor: "Zeynep Demir",
      originalPostDate: "4 gün önce",
      content:
        "Express.js için express-rate-limit middleware'ini kullanabilirsin. Redis ile daha gelişmiş rate limiting de yapabilirsin. Örnekle açıklayayım...",
      upvotes: 18,
      downvotes: 0,
      createdAt: "3 gün önce",
    },
    {
      id: 3,
      originalPostTitle: "MongoDB vs PostgreSQL",
      originalPostContent:
        "Yeni bir e-ticaret projesi için veritabanı seçimi yapıyorum. MongoDB mu yoksa PostgreSQL mi daha uygun olur? Pros ve cons'ları neler?",
      originalPostAuthor: "Emre Özkan",
      originalPostDate: "1 hafta önce",
      content:
        "Proje gereksinimlerine göre değişir. İlişkisel veri ve ACID compliance önemliyse PostgreSQL, esnek şema ve hızlı prototipleme gerekiyorsa MongoDB tercih edilebilir.",
      upvotes: 45,
      downvotes: 3,
      createdAt: "5 gün önce",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Kapak ve Profil */}

      <CoverandProfile user={user} />
      {/* İçerik */}
      <div className="mt-20 px-4 sm:px-8 py-4 space-y-6">
        {/* Temel Bilgiler */}
        <ProfileInfo user={user} />
        {/* İstatistikler */}
        <ProfileStatistics user={user} />

        {/* Sosyal Medya */}
        <ProfileSocialMedia user={user} />
        <div className="text-center p-4 border-t bg-white">
          <a
            href="/"
            className="text-blue-900 font-medium hover:underline text-sm"
          >
            Ana sayfaya dön
          </a>
        </div>
        {/* Maruzat ve Cevaplar Sekmeli Bölüm */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Sekme Başlıkları */}
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("maruzatlar")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "maruzatlar"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Maruzatları ({user.maruzatCount})
              </button>
              <button
                onClick={() => setActiveTab("cevaplar")}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === "cevaplar"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Cevapları ({user.replyCount})
              </button>
            </nav>
          </div>

          {/* Sekme İçerikleri */}
          <div className="p-6">
            {activeTab === "maruzatlar" && <UserPosts userPosts={userPosts} />}

            {activeTab === "cevaplar" && (
              <UserReplies userReplies={userReplies} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
