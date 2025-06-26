export const ProfileStatistics = ({ user }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
        <h4 className="text-sm text-gray-500">Maruzat Sayısı</h4>
        <p className="text-2xl font-bold text-blue-900">{user.maruzatCount}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
        <h4 className="text-sm text-gray-500">Cevap Sayısı</h4>
        <p className="text-2xl font-bold text-blue-900">{user.replyCount}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-center">
        <h4 className="text-sm text-gray-500">Seviye</h4>
        <p className="text-2xl font-bold text-blue-900">{user.level}</p>
      </div>
    </div>
  );
};
