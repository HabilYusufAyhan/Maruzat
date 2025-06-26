import { Search } from "lucide-react";

export const SearchAndFilter = () => {
  return (
    <div className="mb-4 lg:mb-6">
      <div className="relative z-10 mb-3 lg:mb-4">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
          size={18}
        />
        <input
          type="text"
          placeholder="Maruzat ara..."
          className="w-full pl-10 pr-4 py-2.5 lg:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm lg:text-base"
        />
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <select className="flex-1 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm lg:text-base">
          <option>En Yeni</option>
          <option>En Popüler</option>
          <option>En Çok Cevaplanan</option>
        </select>
        <select className="flex-1 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm lg:text-base">
          <option>Tüm Durumlar</option>
          <option>Açık Maruzatlar</option>
          <option>Kapalı Maruzatlar</option>
        </select>
        <select className="flex-1 px-3 lg:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent text-sm lg:text-base">
          <option>Hepsi</option>
          <option>Türkçe</option>
          <option>İngilizce</option>
        </select>
      </div>
    </div>
  );
};
