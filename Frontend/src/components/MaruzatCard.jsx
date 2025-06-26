import {
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  XCircle,
  Share,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
export const MaruzatCard = ({ maruzat, replies }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 lg:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-2 sm:space-y-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {maruzat.category}
          </span>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-xs">
              {maruzat.user.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-600 text-sm">@{maruzat.user}</span>
            <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs font-medium">
              {maruzat.userLevel}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-500 text-sm flex items-center space-x-1">
            <Clock size={14} />
            <span>{maruzat.date}</span>
          </span>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-blue-600">
              <Share size={18} />
            </button>
            <button className="text-gray-400 hover:text-orange-600">
              <Bookmark size={18} />
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Başlık */}
      <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
        {maruzat.title}
      </h1>

      {/* İçerik */}
      <div className="prose max-w-none mb-6">
        <p className="text-gray-700 mb-4 text-sm lg:text-base">
          {maruzat.description}
        </p>
        <div className="text-gray-700 text-sm lg:text-base whitespace-pre-line">
          {maruzat.content}
        </div>
      </div>

      {/* Görsel */}
      {maruzat.hasImage && (
        <div className="w-full h-48 lg:h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
          <span className="text-gray-500">Kod Örneği Görseli</span>
        </div>
      )}

      {/* Alt bilgiler */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
              <ArrowUp size={18} />
              <span className="font-medium">{maruzat.upvotes}</span>
            </button>
            <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
              <ArrowDown size={18} />
              <span className="font-medium">{maruzat.downvotes}</span>
            </button>
          </div>

          <div className="flex items-center space-x-1 text-gray-600">
            <MessageCircle size={18} />
            <span>{replies.length} cevap</span>
          </div>

          <div className="flex items-center space-x-1 text-gray-600">
            <span className="text-sm">{maruzat.views} görüntüleme</span>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          {maruzat.isOpen ? (
            <>
              <CheckCircle size={18} className="text-green-600" />
              <span className="text-green-600 font-medium">Açık</span>
            </>
          ) : (
            <>
              <XCircle size={18} className="text-red-600" />
              <span className="text-red-600 font-medium">Kapalı</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
