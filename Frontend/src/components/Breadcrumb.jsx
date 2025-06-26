import { ArrowLeft } from "lucide-react";
export const Breadcrumb = ({ title }) => {
  return (
    <div className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <button className="hover:text-blue-900 flex items-center space-x-1">
          <ArrowLeft size={16} />
          <a href="/">Ana Sayfa</a>
        </button>
        <span>/</span>
        <span className="text-gray-900">{title ? title : "Maruzat"}</span>
      </div>
    </div>
  );
};
