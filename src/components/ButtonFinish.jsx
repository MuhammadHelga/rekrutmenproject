import React from "react";
import { useNavigate } from "react-router-dom";

function FinishButton() {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate("/", {replace: true});
  };

  return (
    <div className="w-full bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <button
        onClick={handleFinish}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold text-lg transition"
      >
        Selesai Wawancara
      </button>
    </div>
  );
}

export default FinishButton;
