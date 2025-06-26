import { Clock, ThumbsDown, ThumbsUp, User } from "lucide-react";

export const UserReplies = ({ userReplies }) => (
  <div className="space-y-6">
    {userReplies.map((reply) => (
      <a href={`/maruzat/${reply.id}`} className="block" key={reply.id}>
        <div
          key={reply.id}
          className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
        >
          {/* Orijinal Soru */}
          <div className="bg-white p-4 border-b">
            <h4 className="font-medium text-gray-900 mb-2">
              {reply.originalPostTitle}
            </h4>
            <p className="text-gray-600 text-sm line-clamp-2">
              {reply.originalPostContent}
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
              <span className="flex items-center">
                <User className="w-3 h-3 mr-1" />
                {reply.originalPostAuthor}
              </span>
              <span className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {reply.originalPostDate}
              </span>
            </div>
          </div>

          {/* Kullanıcının Cevabı */}
          <div className="bg-blue-50 p-4">
            <div className="flex items-start space-x-3">
              <div className="w-1 h-8 bg-blue-900 rounded-full flex-shrink-0 mt-1"></div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-blue-900">
                    Cevap:
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-3">{reply.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {reply.createdAt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    ))}
  </div>
);
