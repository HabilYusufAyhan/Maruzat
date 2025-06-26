import { Send } from "lucide-react";
import { useState } from "react";

export const ReplyForm = ({ placeholder, onSubmit, onCancel }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text);
      setText("");
    }
  };

  return (
    <div className="mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
      />
      <div className="flex items-center justify-between mt-2">
        <div className="flex space-x-2">
          {onCancel && (
            <button onClick={onCancel} className="text-gray-600 px-3 py-1">
              İptal
            </button>
          )}
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Send size={16} />
            <span>Gönder</span>
          </button>
        </div>
      </div>
    </div>
  );
};
