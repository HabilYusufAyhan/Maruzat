import {
  MessageCircle,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
export const Maruzat = ({ maruzat }) => {
  console.log(maruzat);

  return (
    <a
      href={`/maruzat/${maruzat.id} my-2 lg:my-3`}
      className="block"
      key={maruzat.id}
    >
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 space-y-2 sm:space-y-0">
          <div className="flex flex-wrap items-center gap-2 sm:space-x-3">
            <span className="bg-blue-100 text-blue-800 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
              {maruzat.category}
            </span>
            <span className="text-gray-600 text-xs lg:text-sm">
              @{maruzat.user}
            </span>
          </div>
          <span className="text-gray-500 text-xs lg:text-sm flex items-center space-x-1">
            <Clock size={12} className="lg:hidden" />
            <Clock size={14} className="hidden lg:block" />
            <span>{maruzat.date}</span>
          </span>
        </div>

        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {maruzat.title}
        </h3>
        <p className="text-gray-700 mb-4 text-sm lg:text-base line-clamp-3">
          {maruzat.description}
        </p>

        {maruzat.hasImage && (
          <div className="w-full h-32 lg:h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <img
              src={
                maruzat.hasImage instanceof File
                  ? URL.createObjectURL(maruzat.hasImage)
                  : maruzat.hasImage
              }
              alt="Maruzat Görseli"
              className="max-h-full w-full object-cover rounded-lg"
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                <ArrowUp size={16} className="lg:hidden" />
                <ArrowUp size={18} className="hidden lg:block" />
                <span className="font-medium text-sm lg:text-base">
                  {maruzat.upvotes}
                </span>
              </button>
              <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                <ArrowDown size={16} className="lg:hidden" />
                <ArrowDown size={18} className="hidden lg:block" />
                <span className="font-medium text-sm lg:text-base">
                  {maruzat.downvotes}
                </span>
              </button>
            </div>

            <div className="flex items-center space-x-1 text-gray-600">
              <MessageCircle size={16} className="lg:hidden" />
              <MessageCircle size={18} className="hidden lg:block" />
              <span className="text-sm lg:text-base">
                {maruzat.replies} cevap
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            {maruzat.isOpen ? (
              <>
                <CheckCircle size={16} className="text-green-600 lg:hidden" />
                <CheckCircle
                  size={18}
                  className="text-green-600 hidden lg:block"
                />
                <span className="text-green-600 font-medium text-sm lg:text-base">
                  Açık
                </span>
              </>
            ) : (
              <>
                <XCircle size={16} className="text-red-600 lg:hidden" />
                <XCircle size={18} className="text-red-600 hidden lg:block" />
                <span className="text-red-600 font-medium text-sm lg:text-base">
                  Kapalı
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};
