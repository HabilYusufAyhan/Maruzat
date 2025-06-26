import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { MobileHeader } from "../components/MobileHeader";
import { SearchAndFilter } from "../components/SearchandFilter";
import { Maruzat } from "../partials/Maruzat";
import { Plus, X, Image, Send } from "lucide-react";
import { CreateMaruzatModal } from "../components/CreateMaruzatModal";
import TestAd from "../partials/TestAd";
import { MobileSidebar } from "../components/MobileSidebar";

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Reklam yüklenemedi:", e);
    }
  }, []);

  // Kategoriler listesi
  const categories = [
    "Teknoloji",
    "Sanat",
    "Felsefe",
    "Bilim",
    "Edebiyat",
    "Müzik",
    "Spor",
    "Siyaset",
    "Ekonomi",
    "Sağlık",
  ];

  // Maruzatlar state olarak tanımlandı
  const [maruzatlar, setMaruzatlar] = useState([
    // örnek maruzatlar (aynı sizin verdiğiniz)
    {
      id: 1,
      category: "Teknoloji",
      user: "ahmet_dev",
      title: "React Hook'ları ile State Yönetimi",
      description:
        "Modern React uygulamalarında state yönetimi için en iyi yaklaşımlar nelerdir?",
      date: "2 saat önce",
      upvotes: 15,
      downvotes: 2,
      replies: 8,
      isOpen: true,
      hasImage: false,
    },
    {
      id: 2,
      category: "Sanat",
      user: "sanat_lover",
      title: "Türk Resminde Yeni Akımlar",
      description:
        "Günümüz Türk resim sanatında görülen yeni eğilimler ve sanatçılar hakkında düşünceleriniz nelerdir?",
      date: "4 saat önce",
      upvotes: 23,
      downvotes: 1,
      replies: 12,
      isOpen: true,
      hasImage: true,
    },
    {
      id: 3,
      category: "Felsefe",
      user: "dusunur123",
      title: "Varoluşçuluk ve Modern Hayat",
      description:
        "Sartre'ın varoluşçu felsefesi günümüz yaşam tarzına nasıl uygulanabilir?",
      date: "1 gün önce",
      upvotes: 31,
      downvotes: 5,
      replies: 18,
      isOpen: false,
      hasImage: false,
    },
    // örnek için toplam 15 tane yapalım
    {
      id: 4,
      category: "Bilim",
      user: "bilimci",
      title: "Kuantum Fiziği",
      description: "...",
      date: "3 gün önce",
      upvotes: 12,
      downvotes: 0,
      replies: 4,
      isOpen: true,
      hasImage: false,
    },
    {
      id: 5,
      category: "Edebiyat",
      user: "edebiyatci",
      title: "Şiir ve Duygular",
      description: "...",
      date: "5 gün önce",
      upvotes: 8,
      downvotes: 2,
      replies: 2,
      isOpen: true,
      hasImage: false,
    },
    {
      id: 6,
      category: "Müzik",
      user: "muzisyen",
      title: "Türk Müziği Tarihi",
      description: "...",
      date: "6 gün önce",
      upvotes: 20,
      downvotes: 1,
      replies: 10,
      isOpen: true,
      hasImage: true,
    },
    {
      id: 7,
      category: "Spor",
      user: "sporcu",
      title: "Futbol Taktikleri",
      description: "...",
      date: "1 hafta önce",
      upvotes: 5,
      downvotes: 0,
      replies: 0,
      isOpen: true,
      hasImage: false,
    },
    {
      id: 8,
      category: "Siyaset",
      user: "politikaci",
      title: "Demokrasi ve Özgürlük",
      description: "...",
      date: "8 gün önce",
      upvotes: 15,
      downvotes: 5,
      replies: 7,
      isOpen: true,
      hasImage: false,
    },
    {
      id: 9,
      category: "Ekonomi",
      user: "ekonomist",
      title: "Küresel Piyasalar",
      description: "...",
      date: "9 gün önce",
      upvotes: 30,
      downvotes: 3,
      replies: 14,
      isOpen: true,
      hasImage: false,
    },
    {
      id: 10,
      category: "Sağlık",
      user: "doktor",
      title: "Sağlıklı Yaşam İpuçları",
      description: "...",
      date: "10 gün önce",
      upvotes: 25,
      downvotes: 1,
      replies: 9,
      isOpen: true,
      hasImage: true,
    },
    {
      id: 11,
      category: "Teknoloji",
      user: "teknoloji_uzmani",
      title: "Yapay Zeka Geleceği",
      description: "...",
      date: "11 gün önce",
      upvotes: 40,
      downvotes: 4,
      replies: 20,
      isOpen: true,
      hasImage: false,
    },
    {
      id: 12,
      category: "Sanat",
      user: "sanatci",
      title: "Heykeltraşlık Teknikleri",
      description: "...",
      date: "12 gün önce",
      upvotes: 10,
      downvotes: 2,
      replies: 5,
      isOpen: true,
      hasImage: false,
    },
    {
      id: 13,
      category: "Felsefe",
      user: "filozof",
      title: "Stoacılık Nedir?",
      description: "...",
      date: "13 gün önce",
      upvotes: 18,
      downvotes: 1,
      replies: 8,
      isOpen: true,
      hasImage: false,
    },
    {
      id: 14,
      category: "Bilim",
      user: "fizikci",
      title: "Evrenin Sırları",
      description: "...",
      date: "14 gün önce",
      upvotes: 35,
      downvotes: 3,
      replies: 11,
      isOpen: true,
      hasImage: true,
    },
    {
      id: 15,
      category: "Edebiyat",
      user: "yazar",
      title: "Modern Roman Anlatısı",
      description: "...",
      date: "15 gün önce",
      upvotes: 22,
      downvotes: 2,
      replies: 7,
      isOpen: true,
      hasImage: false,
    },
  ]);
  const PAGE_SIZE = 10;
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Görüntülenen maruzatlar sayısını güncelle
  const displayedMaruzatlar = maruzatlar.slice(0, visibleCount);

  // "Daha Fazla Yükle" butonu için handler
  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, maruzatlar.length));
  };
  const [newMaruzat, setNewMaruzat] = useState({
    title: "",
    description: "",
    category: "Teknoloji",
    hasImage: false,
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState({
    type: "",
    title: "",
    message: "",
  });
  const handleCreateMaruzat = () => {
    if (!newMaruzat.title.trim() || !newMaruzat.description.trim()) {
      setAlertData({
        type: "warning",
        title: "Maruzat Oluşturulamadı!",
        message: "Lütfen başlık ve açıklama alanlarını doldurun.",
      });
      setOpenAlert(true);
      return;
    }

    const maruzat = {
      id: Date.now(),
      title: newMaruzat.title,
      description: newMaruzat.description,
      category: newMaruzat.category,
      user: "kullanici", // Gerçek uygulamada oturum açmış kullanıcı
      date: "Az önce",
      upvotes: 0,
      downvotes: 0,
      replies: 0,
      isOpen: true,
      hasImage: newMaruzat.hasImage,
    };

    setMaruzatlar([maruzat, ...maruzatlar]);
    setNewMaruzat({
      title: "",
      description: "",
      category: "Teknoloji",
      hasImage: false,
    });
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMainPage={true}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80">
          <Sidebar
            showCategories={true}
            setSidebarOpen={setSidebarOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <MobileSidebar
            showCategories={true}
            setSidebarOpen={setSidebarOpen}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {/* Ana İçerik */}
        <div className="flex-1 min-w-0">
          {/* Kapak Banner */}
          <div className="h-16 my-5 lg:flex bg-white hidden items-center justify-start px-4">
            <div className="text-center text-white">
              <img
                src={
                  localStorage.getItem("theme") === "light"
                    ? "/maruzatLogo.png"
                    : "/maruzatLogoDark.png"
                }
                className="h-16"
                alt=""
              />
            </div>
          </div>

          <div className="p-4 lg:p-6">
            <SearchAndFilter />

            {/* Maruzat Oluştur Butonu */}
            <div className="mb-6">
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full sm:w-auto bg-blue-900 hover:bg-blue-800 text-white px-6 lg:px-8 py-3 lg:py-4 rounded-lg font-medium transition-colors text-sm lg:text-base flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <Plus size={18} />
                <span>Yeni Maruzat Oluştur</span>
              </button>
            </div>

            {/* Maruzatlar */}

            <div className="space-y-4 lg:space-y-6">
              {displayedMaruzatlar.map((maruzat, index) => (
                <div key={maruzat.id || index}>
                  <Maruzat maruzat={maruzat} />
                  {index !== 0 && index % 10 === 0 && <TestAd />}
                </div>
              ))}
            </div>

            {/* Daha Fazla Yükle Butonu */}
            {visibleCount < maruzatlar.length && (
              <div className="text-center mt-6 lg:mt-8">
                <button
                  onClick={loadMore}
                  className="bg-blue-900 hover:bg-blue-800 text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg font-medium transition-colors text-sm lg:text-base w-full sm:w-auto"
                >
                  Daha Fazla Maruzat Yükle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Maruzat Oluşturma Modal */}
      {showCreateModal && (
        <CreateMaruzatModal
          newMaruzat={newMaruzat}
          setNewMaruzat={setNewMaruzat}
          setShowCreateModal={setShowCreateModal}
          handleCreateMaruzat={handleCreateMaruzat}
          categories={categories}
          openAlert={openAlert}
          setOpenAlert={setOpenAlert}
          alertData={alertData}
        />
      )}
    </div>
  );
};

export default MainPage;
