import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyCandidateToken } from "../services/ApiRequests";

function VerifyTokenPage() {
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    
    const localData = JSON.parse(localStorage.getItem("candidateData") || "{}");
    const { userName, fullName, role, candidateId, email, } = location.state || localData;
    
    const handleVerify = async (e) => {
        e.preventDefault();
        if (!token) return alert("Silakan masukkan token!");

        setIsLoading(true);

        try {
            const data = await verifyCandidateToken(token);

            if (data.isValid) {
                localStorage.setItem("candidateData", JSON.stringify(data.candidateData));
                navigate("/wawancara", { 
                    state: data.candidateData 
                });
            } else {
                alert("Token tidak valid atau sudah kadaluwarsa!");
            }
        } catch (error) {
            console.error("Error verify token:", error);
            alert("Terjadi kesalahan koneksi ke server.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-[#0D2B45]">Verifikasi Akses</h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Masukkan token yang dikirimkan ke Email/WhatsApp Anda
                    </p>
                </div>

                <form onSubmit={handleVerify} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Token Wawancara
                        </label>
                        <input
                            type="text"
                            value={token}
                            onChange={(e) => setToken(e.target.value.toUpperCase())}
                            placeholder="Contoh: AB1234"
                            className="w-full p-3 border-2 border-gray-100 rounded-xl focus:border-[#FEBD5A] outline-none text-center font-mono text-xl tracking-widest"
                            maxLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full p-3 rounded-xl text-white font-bold transition-all ${
                            isLoading ? "bg-gray-400" : "bg-[#FEBD5A] hover:bg-[#e69c2d]"
                        }`}
                    >
                        {isLoading ? "Memeriksa..." : "Mulai Wawancara"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VerifyTokenPage;
