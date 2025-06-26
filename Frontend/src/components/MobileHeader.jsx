import { Menu, X } from "lucide-react";
import { BiLeftArrow } from "react-icons/bi";
export const MobileHeader = ({ sidebarOpen, setSidebarOpen, isMainPage }) => {
  return (
    <div className="lg:hidden sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200 p-4 flex items-center justify-between">
      {!isMainPage && (
        <a
          href="/"
          className="text-gray-600 hover:text-blue-900 flex items-center space-x-2 "
        >
          <BiLeftArrow />
        </a>
      )}
      <div className="flex items-center space-x-3">
        <img
          src={
            localStorage.getItem("theme") === "light"
              ? "/maruzatLogo.png"
              : "/maruzatLogoDark.png"
          }
          alt="Maruzat Logo"
          className="w-32 h-auto"
        />
      </div>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="p-2 text-gray-600 hover:text-blue-900"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};
