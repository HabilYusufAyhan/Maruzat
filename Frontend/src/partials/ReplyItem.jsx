import { useState } from "react";
import { Heart, Reply, Clock, MoreHorizontal } from "lucide-react";
import { ReplyForm } from "../components/ReplyForm";
import { renderContentWithMentions } from "../config/RenderContentWithMentions.jsx";

export const ReplyItem = ({ reply, onReplySubmit }) => {
  const [likedReplies, setLikedReplies] = useState({}); // id bazlı like durumu
  const [replyingToId, setReplyingToId] = useState(null); // hangi cevapta form açık

  const toggleLike = (id) => {
    setLikedReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReplyClick = (id) => {
    setReplyingToId(replyingToId === id ? null : id);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      {/* Ana mesaj başlığı */}
      <div>
        <div className="flex justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {reply.user.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">@{reply.user}</span>
                <span className="text-xs bg-gray-200 px-2 rounded">
                  {reply.userLevel}
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-500">
                <Clock size={12} />
                <span className="ml-1">{reply.date}</span>
              </div>
            </div>
          </div>
          <MoreHorizontal size={16} className="text-gray-400" />
        </div>

        <p className="text-sm text-gray-700 whitespace-pre-line">
          {renderContentWithMentions(reply.content)}
        </p>

        <div className="flex items-center space-x-4 mt-3 text-sm">
          <button
            onClick={() => toggleLike(reply.id)}
            className={`flex items-center space-x-1 ${
              likedReplies[reply.id] ? "text-red-600" : "text-gray-500"
            }`}
          >
            <Heart
              size={16}
              fill={likedReplies[reply.id] ? "currentColor" : "none"}
            />
            <span>{reply.likes + (likedReplies[reply.id] ? 1 : 0)}</span>
          </button>
          <button
            onClick={() => handleReplyClick(reply.id)}
            className="flex items-center space-x-1 text-gray-500 hover:text-blue-600"
          >
            <Reply size={16} />
            <span>Yanıtla</span>
          </button>
        </div>
      </div>

      {/* Ana cevap için yanıt formu */}
      {replyingToId === reply.id && (
        <ReplyForm
          placeholder={`@${reply.user} kullanıcısına yanıt...`}
          onCancel={() => setReplyingToId(null)}
          onSubmit={(content) => {
            // Eğer kullanıcı etiketleme yoksa otomatik ekle
            const finalContent = content.startsWith("@")
              ? content
              : `@${reply.user} ${content}`;
            onReplySubmit(reply.id, finalContent);
            setReplyingToId(null);
          }}
        />
      )}

      {/* Alt cevaplar */}
      {reply.replies && reply.replies.length > 0 && (
        <div className="mt-4 space-y-2 pl-6 border-l-2 border-gray-200">
          {reply.replies.map((subReply) => (
            <div
              key={subReply.id}
              className="bg-white p-3 rounded-lg border border-gray-200"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-800">
                    @{subReply.user}
                  </span>
                  <span className="text-xs text-gray-400">{subReply.date}</span>
                </div>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-line">
                {renderContentWithMentions(subReply.content)}
              </p>
              <div className="flex items-center mt-2 text-xs space-x-4 text-gray-500">
                <button
                  onClick={() => handleReplyClick(subReply.id)}
                  className="hover:text-blue-600 flex items-center space-x-1"
                >
                  <Reply size={14} />
                  <span>Yanıtla</span>
                </button>
                <button
                  onClick={() => toggleLike(subReply.id)}
                  className={`hover:text-red-600 flex items-center space-x-1 ${
                    likedReplies[subReply.id] ? "text-red-600" : ""
                  }`}
                >
                  <Heart
                    size={14}
                    fill={likedReplies[subReply.id] ? "currentColor" : "none"}
                  />
                  <span>
                    {subReply.likes + (likedReplies[subReply.id] ? 1 : 0)}
                  </span>
                </button>
              </div>

              {/* Alt cevap için yanıt formu */}
              {replyingToId === subReply.id && (
                <ReplyForm
                  placeholder={`@${subReply.user} kullanıcısına yanıt...`}
                  onCancel={() => setReplyingToId(null)}
                  onSubmit={(content) => {
                    const finalContent = content.startsWith("@")
                      ? content
                      : `@${subReply.user} ${content}`;
                    onReplySubmit(subReply.parentId, finalContent);
                    setReplyingToId(null);
                  }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
