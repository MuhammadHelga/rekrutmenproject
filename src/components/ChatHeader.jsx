import React from 'react';

function ChatHeader({ isFinished }) {
  return (
    <div className='w-full bg-[#0D3556] text-white px-6 py-4 text-lg font-semibold shadow-md z-[100]'>
      {isFinished ? "Wawancara telah Selesai" : "Proses Wawancara Dimulai"}
      <div className="mt-2">
        <div className={`h-[3px] w-16 rounded-full transition-all duration-500
          ${isFinished ? "bg-green-500" : "bg-yellow-400"}`}
        />
      </div>
    </div>
  );
}

export default ChatHeader;
