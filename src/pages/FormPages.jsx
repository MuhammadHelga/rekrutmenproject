import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendFormData } from "../services/ApiRequests";

function FormPages() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [form, setForm] = useState({
        fullName: "",
        nickName: "",
        email: "",
        number: "",
        gender: "Laki-Laki",
        role: "Administrasi",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const generateCandidateId = () => {
        const random = Math.floor(Math.random() * 9999);
        return `K${random.toString().padStart(4, "0")}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = {
            candidateId: generateCandidateId(),
            ...form,
        };

        try {
            await sendFormData(payload);

            localStorage.setItem("candidateData", JSON.stringify(payload));
            
            navigate("/verify-token", {
                state: {
                userName: form.nickName || form.fullName,
                fullName: form.fullName,
                email: form.email,
                role: form.role,
                candidateId: payload.candidateId,
                },
            });
        } catch (error) {
            alert("Gagal mengirim data");
            setIsLoading(false);
        }
    };

    return (
        <div className='min-h-[100dvh] w-full flex flex-col bg-white overflow-hidden font-sans'>
            <div className='bg-linear-to-b from-[#0D2B45] to-[#1a4b7a] w-full pt-6 pb-5 px-5 flex shrink-0'>
                <div className="w-full">
                    <h1 className='text-white text-2xl md:text-4xl font-bold tracking-[0.2em] mb-2 md:mb-4'
                        >REKRUTMEN
                    </h1>
                    <p className="text-blue-100 text-sm md:text-xl mb-6 whitespace-normal md:whitespace-nowrap">
                        Silakan lengkapi formulir di bawah ini untuk memulai proses wawancara
                    </p>
                    <div className="w-16 h-1.5 bg-[#FEBD5A] rounded-full"></div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto w-full px-5 py-8 flex flex-col scrollbar-hide">
                <div className="w-full mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className='flex flex-col'>
                            <label className='text-gray-600 text-[12px] md:text-lg font-semibold ml-1'>Nama Lengkap</label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 rounded-xl outline-none border-2 border-gray-100 bg-gray-50 focus:border-[#FEBD5A] transition-all text-sm md:text-lg"
                                placeholder="Nama Lengkap"
                            />
                        </div>
        
                        <div className='flex flex-col'>
                            <label className='text-gray-600 text-[12px] md:text-lg font-semibold ml-1'>Nama Panggilan</label>
                            <input
                                type="text"
                                name="nickName"
                                required
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 rounded-xl outline-none border-2 border-gray-100 bg-gray-50 focus:border-[#FEBD5A] transition-all text-sm md:text-lg"
                                placeholder="Nama Panggilan"
                            />
                        </div>
        
                        <div className='flex flex-col'>
                            <label className='text-gray-600 text-[12px] md:text-lg font-semibold ml-1'>Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 rounded-xl outline-none border-2 border-gray-100 bg-gray-50 focus:border-[#FEBD5A] transition-all text-sm md:text-lg"
                                placeholder="example@gmail.com"
                            />
                        </div>
        
                        <div className='flex flex-col'>
                            <label className='text-gray-600 text-[12px] md:text-lg font-semibold ml-1'>No. HP/Whatsapp</label>
                            <input
                                type="number"
                                name="number"
                                required
                                onChange={handleChange}
                                className="w-full mt-1 p-2.5 rounded-xl outline-none border-2 border-gray-100 bg-gray-50 focus:border-[#FEBD5A] transition-all text-sm md:text-lg"
                                placeholder="08xxxxxxxxxx"
                            />
                        </div>
        
                        <div className='grid grid-cols-2 gap-x-4'>
                                <div>
                                    <label className='text-gray-600 text-[12px] md:text-lg font-semibold ml-1'>Jenis Kelamin</label>
                                    <select className="w-full mt-1 p-2.5 rounded-xl outline-none border-2 border-gray-100 bg-gray-50 focus:border-[#FEBD5A] text-sm md:text-lg" name="gender" value={form.gender} onChange={handleChange}>
                                        <option value="Laki-Laki">Laki-Laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
        
                                <div>
                                    <label className='text-gray-600 text-[12px] md:text-lg font-semibold ml-1'>Bidang</label>
                                    <select className="w-full mt-1 p-2.5 rounded-xl outline-none border-2 border-gray-100 bg-gray-50 focus:border-[#FEBD5A] text-sm md:text-lg" name="role" value={form.role} onChange={handleChange}>
                                        <option value="Administrasi">Administrasi</option>
                                        <option value="Sales">Sales</option>
                                        <option value="Gudang">Admin Gudang</option>
                                    </select>
                                </div>
                        </div>

                        <div className="pt-2">
                            <button 
                                type="submit"
                                disabled={isLoading}
                                className={`w-full text-white text-md md:text-lg font-bold p-3 rounded-xl shadow-md transition-all 
                                    ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#FEBD5A] hover:bg-[#e69c2d] active:scale-[0.98]'}`}
                            >
                                {isLoading ? "Memulai..." : "Lanjut Wawancara"}
                            </button>
                         </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FormPages
