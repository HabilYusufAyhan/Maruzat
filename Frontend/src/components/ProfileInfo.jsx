import { User, ArrowUp, ArrowDown, Edit } from "lucide-react";
export const ProfileInfo = ({ user }) => {
  return (
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
        </div>
      </div>
    </div>
  );
};
