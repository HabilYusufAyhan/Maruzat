import { Clock, MessageSquare, ThumbsDown, ThumbsUp } from "lucide-react";

export const UserPosts = ({ userPosts }) => (
  <div className="space-y-6">
    {userPosts.map((post) => (
      <a href={`/maruzat/${post.id}`} className="block" key={post.id}>
        <div
          key={post.id}
          className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
        >
          <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {post.content}
          </p>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                {post.replyCount} cevap
              </span>
            </div>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.createdAt}
            </span>
          </div>
        </div>
      </a>
    ))}
  </div>
);
