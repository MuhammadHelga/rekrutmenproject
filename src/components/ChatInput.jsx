import React, { useRef, useEffect } from 'react'

function ChatInput({ value, onChange, onSend }) {
  const textareaRef = useRef(null)
  const MAX_HEIGHT = 100

  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = "auto"

    if (textarea.scrollHeight > MAX_HEIGHT) {
      textarea.style.height = MAX_HEIGHT + "px"
      textarea.style.overflowY = "auto"
    } else {
      textarea.style.height = textarea.scrollHeight + "px"
      textarea.style.overflowY = "hidden"
    }
  }, [value])

  return (
    <div className='bg-[#F9F9F9] px-4 py-3 flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]'>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='Tulis Jawaban...'
          rows={1}
          className="flex-1 resize-none overflow-hidden px-2 md:px-4 py-2 md:py-3 rounded-xl bg-white border border-gray-300 outline-none"
        />
        <button 
          onClick={onSend}
          className='self-end bg-[#FEBD5A] px-3 md:px-6 py-2 md:py-3 rounded-xl text-white text-[16px] md:text-lg font-semibold hover:bg-[#e6a845]'
        >
          Kirim
        </button>
    </div>
  )
}

export default ChatInput
