import { useState } from "react";

const Mention = ({ username, getUserInfo }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const userInfo = {
    name: "Deniz Yılmaz",
    username: username,
    level: "Yeni",
    role: "Üye",
  };

  return (
    <span
      className="text-blue-600 font-semibold cursor-pointer relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      @{username}
      {showTooltip && (
        <div className="absolute flex gap-2 items-center -top-28 left-0 z-10 w-48 p-2 bg-white border rounded shadow-lg text-xs text-gray-700 border-blue-500">
          <div className="bg-container bg-no-repeat bg-center mb-2">
            <img className="w-20 h-20  rounded-full" src="/avatar.jpg" alt="" />
          </div>

          <div>
            <div>
              <strong>{userInfo.name}</strong>
            </div>
            <div>Seviye: {userInfo.level}</div>
            <div>Rol: {userInfo.role}</div>
          </div>
        </div>
      )}
    </span>
  );
};

export default Mention;
