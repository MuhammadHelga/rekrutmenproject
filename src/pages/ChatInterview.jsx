import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatBubble from '../components/ChatBubble'
import ChatInput from '../components/ChatInput'
import ChatHeader from '../components/ChatHeader';
import ButtonFinish from "../components/ButtonFinish";
import { getInterview, saveAnswer, finishInterview } from "../services/ApiRequests";

function ChatInterview() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isFinished, setIsFinished] = useState(false);

    const chatEndRef = useRef(null);
    const location = useLocation();
    const { userName, fullName, role, candidateId, email } = location.state || {};

    const getTime = () =>
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    const fetchQuestions = async () => {
        try {
            const data = await getInterview(role);
            console.log("Data dari n8n:", data);

            const questionsData = Array.isArray(data) ? data : [data];

            if (!questionsData || questionsData.length === 0 || !questionsData[0].Pertanyaan) {
                setMessages([
                {
                    id: "empty",
                    sender: "ai",
                    text: "Maaf, pertanyaan belum tersedia.",
                    time: getTime(),
                },
                ]);
                return;
            }

            setQuestions(questionsData);

            setMessages([
                {
                    id: "welcome",
                    sender: "ai",
                    text: `Halo ${userName || ""} 👋 Selamat datang di sesi wawancara.`,
                    time: getTime(),
                },
                {
                    id: "q-0",
                    sender: "ai",
                    text: `${questionsData[0].Pertanyaan}`,
                    time: getTime(),
                },
            ]);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const currentQuestion = questions[currentIndex].Pertanyaan;
        const currentAnswer = input;

        const userMessage = {
            id: Date.now().toString(),
            sender: "user",
            text: currentAnswer,
            time: getTime(),
        };

        
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            await saveAnswer({
                candidateId,
                username: userName,
                // fullname: fullName,
                bidang: role,
                index: currentIndex + 1,
                pertanyaan: currentQuestion,
                jawaban: currentAnswer
            });
        } catch (err) {
            console.error("Gagal simpan jawaban satuan:", err);
        }

        const newAnswers = [
            ...answers,
            { pertanyaan: currentQuestion, jawaban: currentAnswer }
        ];
        setAnswers(newAnswers);

        const nextIndex = currentIndex + 1;

        if (nextIndex < questions.length) {
            setTimeout(() => {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: `q-${nextIndex}`,
                        sender: "ai",
                        text: `${questions[nextIndex].Pertanyaan}`,
                        time: getTime(),
                    },
                ]);
                setCurrentIndex(nextIndex);
            }, 800);
        } else {
            setTimeout(async () => {
                setIsFinished(true);
                
                setMessages((prev) => [
                    ...prev,
                    {
                        id: "done",
                        sender: "ai",
                        text: "Terima kasih sudah mengikuti wawancara. Wawancara telah selesai. Data Anda telah disimpan. Silahkan menunggu kabar berikutnya 😊🙏",
                        time: getTime(),
                    },
                ]);

                try {
                    await finishInterview({
                        candidateId,
                        fullname: fullName,
                        bidang: role,
                        email: email,
                        jawaban: newAnswers,
                    });
                    console.log("Data berhasil dikirim untuk penilaian AI.");
                } catch (err) {
                    console.error("Gagal mengirim data penilaian:", err);
                }
            }, 800);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className='h-[100dvh] w-full flex flex-col bg-gray-50 overflow-hidden relative'>
            
            <ChatHeader isFinished={isFinished} />

            <div className='flex-1 overflow-y-auto p-4 space-y-3'>
                {messages.map((msg) => (
                <ChatBubble
                    key={msg.id}
                    sender={msg.sender}
                    text={msg.text}
                    time={msg.time}
                />
                ))}
                <div ref={chatEndRef} />
            </div>

            {!isFinished ? (
                <div className='w-full bg-white z-50'>
                    <ChatInput
                        value={input}
                        onChange={setInput}
                        onSend={sendMessage}
                    />
                </div>
            ) : (
                <ButtonFinish />
            )}
        </div>
    )
}

export default ChatInterview
