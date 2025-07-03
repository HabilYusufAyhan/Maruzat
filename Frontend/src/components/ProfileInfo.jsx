import {
  User,
  ArrowUp,
  ArrowDown,
  Edit,
  UserPlus,
  UserPlus2Icon,
} from "lucide-react";
import { useState } from "react";
import { FollowersModal } from "./FollowersModal";

export const ProfileInfo = ({
  user,
  followers = [],
  following = [],
  currentUserId,
  onFollowToggle,
}) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: null,
  });
  const [isFollowing, setisFollowing] = useState(user.isFollowing || false);
  // Follow User
  const handleFollow = () => {
    if (onFollowToggle) {
      onFollowToggle(user.id);

      setisFollowing(!isFollowing);
    }
  };

  // ... diğer takip edilenler
  const openModal = (type) => {
    setModalState({
      isOpen: true,
      type: type,
    });
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: null,
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Hakkımda</h3>
            <p className="text-sm text-gray-600">{user.bio}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-700">
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span>
              Rol: <strong>{user.role}</strong>
            </span>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center space-x-1">
              <ArrowUp size={16} className="text-green-600" />
              <span>Olumlu Oy: {user.upvotes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ArrowDown size={16} className="text-red-600" />
              <span>Olumsuz Oy: {user.downvotes}</span>
            </div>

            <div
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => openModal("followers")}
            >
              <UserPlus size={16} />
              <span>{user.followers} Takipçi</span>
            </div>
            <div
              className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => openModal("following")}
            >
              <UserPlus2Icon size={16} />
              <span>{user.following} Takip</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        {currentUserId !== user.id && (
          <button
            onClick={() => handleFollow()}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isFollowing
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <UserPlus size={16} className="inline mr-1" />
            {isFollowing ? "Takip İsteği Gönderildi." : "Takip Et"}
          </button>
        )}
      </div>
      {/* Modal */}
      <FollowersModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        users={modalState.type === "followers" ? followers : following}
        currentUserId={currentUserId}
        onFollowToggle={onFollowToggle}
      />
    </>
  );
};
