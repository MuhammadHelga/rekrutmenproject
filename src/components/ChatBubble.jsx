import React from "react";

function ChatBubble({ text, sender, time }) {
  const isUser = sender === "user";

  return (
    <div
        className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
        <div
            className={`max-w-[75%] p-4 rounded-2xl ${
            isUser
                ? "bg-[#0D3556] text-white"
                : "bg-gray-200 text-gray-800"
            }`}
        >
            <p className="text-sm leading-relaxed break-words">{text}</p>
            {time && (
            <div
                className={`text-[10px] mt-1 text-right ${
                isUser ? "text-gray-200" : "text-gray-500"
                }`}
            >
                {time}
            </div>
            )}
        </div>
    </div>
  );
}

export default ChatBubble;
