import { useState } from "react";
import { MessageCircle } from "lucide-react";

import { ReplyItem } from "../partials/ReplyItem";
import { ReplyForm } from "./ReplyForm";

export const MaruzatReplies = ({ initialReplies }) => {
  const [replies, setReplies] = useState(initialReplies);
  console.log(replies);
  const handleReplySubmit = (parentId, content) => {
    const newReply = {
      id: Date.now(),
      content,
      user: "Sen",
      userLevel: "Yeni",
      date: new Date().toLocaleTimeString(),
      likes: 0,
      parentId: parentId || null, // Ebeveyn cevabın ID'si
      replies: [], // Alt cevaplar için boş dizi
    };

    if (parentId === null) {
      // Ana cevap olarak ekle
      setReplies((prev) => [...prev, newReply]);
    } else {
      // Alt cevap ekle: parentId ile eşleşen ana cevabın replies dizisine ekle
      setReplies((prevReplies) =>
        prevReplies.map((reply) =>
          reply.id === parentId
            ? { ...reply, replies: [...(reply.replies || []), newReply] }
            : reply
        )
      );
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span>{replies.length} Cevap</span>
        </h3>
      </div>

      <ReplyForm
        placeholder="Cevabınızı yazın..."
        onSubmit={(content) => handleReplySubmit(null, content)}
      />

      <div className="mt-6 space-y-2">
        {replies.map((reply) => (
          <ReplyItem
            key={reply.id}
            reply={reply}
            onReplySubmit={handleReplySubmit}
          />
        ))}
      </div>
    </div>
  );
};
