import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { MobileHeader } from "../components/MobileHeader";
import { Breadcrumb } from "../components/Breadcrumb";
import { MobileSidebar } from "../components/MobileSidebar";
import { MaruzatCard } from "../components/MaruzatCard";
import { MaruzatReplies } from "../components/MaruzatReplies";

const MaruzatDetail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const maruzat = {
    id: 1,
    category: "Teknoloji",
    user: "ahmet_dev",
    userLevel: "Uzman",
    title: "React Hook'ları ile State Yönetimi",
    description:
      "Modern React uygulamalarında state yönetimi için en iyi yaklaşımlar nelerdir? Özellikle büyük projelerde useState ve useReducer arasında nasıl seçim yapmalıyız? Context API ile birlikte kullanımında dikkat edilmesi gereken noktalar nelerdir?",
    content: `Merhaba arkadaşlar,

Son zamanlarda React projelerinde state yönetimi konusunda kafam karıştı. Şu anda bir e-ticaret sitesi geliştiriyorum ve karmaşık state yapıları ile uğraşıyorum.

## Karşılaştığım Problemler:

1. **useState vs useReducer**: Hangi durumda hangisini kullanmalıyım?
2. **Context API**: Global state için her zaman gerekli mi?
3. **Performance**: Re-render optimizasyonu nasıl yapılır?

Koddan bir örnek:

\`\`\`javascript
const [cart, setCart] = useState([]);
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
\`\`\`

Bu yaklaşım doğru mu yoksa başka bir yöntem mi kullanmalıyım?`,
    date: "2 saat önce",
    upvotes: 15,
    downvotes: 2,
    isOpen: true,
    hasImage: true,
    views: 234,
  };

  // Ana cevaplar sadece burada, alt cevaplar bu ana cevapların `replies` içinde olacak.
  const replies = [
    {
      id: 1,
      user: "react_master",
      userLevel: "Senior",
      parentId: null, // Ana cevap olduğu için parentId yok
      content:
        "useState basit state'ler için, useReducer karmaşık state mantığı için kullanılır. E-ticaret projende cart için useReducer daha mantıklı olur çünkü add, remove, update gibi farklı action'lar var.",
      date: "1 saat önce",
      likes: 8,
      replies: [],
    },
    {
      id: 2,
      user: "frontend_guru",
      userLevel: "Mentor",
      parentId: null, // Ana cevap olduğu için parentId yok
      content:
        "Context API her zaman gerekli değil. Prop drilling problemi yaşıyorsan kullan. Performance için React.memo, useMemo ve useCallback hook'larına bak. Özellikle büyük listelerde önemli.",
      date: "30 dakika önce",
      likes: 5,
      replies: [],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isMainPage={false}
      />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80">
          <Sidebar showCategories={false} setSidebarOpen={setSidebarOpen} />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <MobileSidebar
            showCategories={false}
            setSidebarOpen={setSidebarOpen}
          />
        )}

        {/* Ana İçerik */}
        <div className="flex-1 min-w-0">
          <Breadcrumb title={maruzat.title} />
          <div className="p-4 lg:p-6">
            <MaruzatCard maruzat={maruzat} replies={replies} />
            <MaruzatReplies initialReplies={replies} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaruzatDetail;
