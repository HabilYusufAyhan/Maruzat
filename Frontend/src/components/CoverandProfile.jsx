import { FastAverageColor } from "fast-average-color";
import { useEffect, useState } from "react";

export const CoverandProfile = ({ user }) => {
  const fac = new FastAverageColor();
  const [color, setColor] = useState(null);
  useEffect(() => {
    fac.getColorAsync(user.avatar).then((color) => {
      console.log(color.hex); // Örnek: "#aabbcc"
      setColor(color.hex);
    });
  }, [user]);

  return (
    <div className="relative h-48 bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40 filtered-exception" />
      <img
        src={user.cover}
        alt="Cover"
        className="w-full h-full object-cover rounded-b-2xl"
      />
      <div
        className={`absolute bottom-[-40px] left-4 sm:left-8 flex items-center space-x-4 py-2 px-2 rounded-t-2xl`}
        style={{
          backgroundImage: `linear-gradient(to bottom, ${
            color || "#000"
          } 0%, ${"#f9fafb"} 70%, #f9fafb 100%)`,
        }}
      >
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover shadow-lg"
        />
        <div className="text-black">
          <h2 className="text-xl sm:text-2xl font-bold">{user.name}</h2>
          <p className="text-sm sm:text-base">@{user.username}</p>
        </div>
      </div>
    </div>
  );
};
