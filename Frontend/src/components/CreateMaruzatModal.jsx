import { Plus, X, Image, Send } from "lucide-react";
import { useState } from "react";
import { Alert } from "../partials/Alert";

export const CreateMaruzatModal = ({
  newMaruzat,
  setNewMaruzat,
  setShowCreateModal,
  handleCreateMaruzat,
  categories,
  openAlert,
  setOpenAlert,
  alertData,
}) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setNewMaruzat({ ...newMaruzat, hasImage: file });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setShowCreateModal(false)}
      />
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-200">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
            Yeni Maruzat Oluştur
          </h2>
          <button
            onClick={() => setShowCreateModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
          {/* Kategori Seçimi */}
          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              value={newMaruzat.category}
              onChange={(e) =>
                setNewMaruzat({ ...newMaruzat, category: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Başlık */}
          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
              Başlık *
            </label>
            <input
              type="text"
              value={newMaruzat.title}
              onChange={(e) =>
                setNewMaruzat({ ...newMaruzat, title: e.target.value })
              }
              placeholder="Maruzatınızın başlığını yazın..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
              maxLength={100}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {newMaruzat.title.length}/100
            </div>
          </div>

          {/* Açıklama */}
          <div>
            <label className="block text-sm lg:text-base font-medium text-gray-700 mb-2">
              Açıklama *
            </label>
            <textarea
              value={newMaruzat.description}
              onChange={(e) =>
                setNewMaruzat({ ...newMaruzat, description: e.target.value })
              }
              placeholder="Maruzatınızı detaylı olarak açıklayın..."
              rows={6}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm lg:text-base"
              maxLength={500}
            />
            <div className="text-right text-xs text-gray-500 mt-1">
              {newMaruzat.description.length}/500
            </div>
          </div>

          {/* Görsel Ekleme */}
          <div>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={newMaruzat.hasImage}
                onChange={(e) =>
                  setNewMaruzat({ ...newMaruzat, hasImage: e.target.checked })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Image size={18} className="text-gray-600" />
              <span className="text-sm lg:text-base text-gray-700">
                Görsel eklemek istiyorum
              </span>
            </label>

            {newMaruzat.hasImage && (
              <div className="mt-3 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Seçilen görsel"
                    className="max-h-64 rounded-lg border border-gray-300 object-contain"
                  />
                )}
              </div>
            )}
          </div>
          {openAlert && (
            <Alert
              type={alertData.type}
              title={alertData.title}
              message={alertData.message}
              onClose={() => setOpenAlert(false)}
            />
          )}
          {/* Butonlar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="flex-1 px-4 py-2.5 lg:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm lg:text-base font-medium"
            >
              İptal
            </button>
            <button
              onClick={handleCreateMaruzat}
              className="flex-1 px-4 py-2.5 lg:py-3 bg-blue-900 hover:bg-blue-800 text-white rounded-lg transition-colors text-sm lg:text-base font-medium flex items-center justify-center space-x-2"
            >
              <Send size={16} />
              <span>Maruzat Oluştur</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
