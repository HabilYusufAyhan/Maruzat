import { Sidebar } from "./Sidebar";

export const MobileSidebar = ({
  showCategories,
  setSidebarOpen,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="lg:hidden fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setSidebarOpen(false)}
      />
      <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw]">
        <Sidebar
          showCategories={showCategories}
          setSidebarOpen={setSidebarOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};
