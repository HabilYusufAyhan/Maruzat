import { X, User, UserPlus, UserMinus } from "lucide-react";
import { useState } from "react";

export const FollowersModal = ({
  isOpen,
  onClose,
  type, // "followers" veya "following"
  users, // takipçi veya takip edilen kullanıcılar listesi
  currentUserId,
  onFollowToggle, // takip et/takibi bırak işlemi için
}) => {
  const [activeUsers, setActiveUsers] = useState(users || []);

  if (!isOpen) return null;

  const title = type === "followers" ? "Takipçiler" : "Takip Edilenler";

  const handleFollowToggle = (userId) => {
    if (onFollowToggle) {
      onFollowToggle(userId);
    }

    // Local state'i güncelle
    setActiveUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeUsers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <User size={48} className="mx-auto mb-2 opacity-30" />
              <p>
                {type === "followers"
                  ? "Henüz takipçi yok"
                  : "Henüz kimseyi takip etmiyor"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {activeUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <User size={20} className="text-gray-500" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{user.name}</h4>
                      <p className="text-sm text-gray-500">@{user.username}</p>
                      {user.bio && (
                        <p className="text-xs text-gray-400 mt-1 max-w-48 truncate">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Follow/Unfollow Button - sadece kendi profili değilse göster */}
                  {user.id !== currentUserId && (
                    <button
                      onClick={() => handleFollowToggle(user.id)}
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        user.isFollowing
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                    >
                      {user.isFollowing ? (
                        <>
                          <UserMinus size={14} />
                          <span>Takibi Bırak</span>
                        </>
                      ) : (
                        <>
                          <UserPlus size={14} />
                          <span>Takip Et</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            Toplam {activeUsers.length}{" "}
            {type === "followers" ? "takipçi" : "takip"}
          </p>
        </div>
      </div>
    </div>
  );
};
