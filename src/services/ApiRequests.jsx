import { API_ENDPOINTS } from "../config/Api";

export const sendFormData = async (data) => {
  const response = await fetch(
    API_ENDPOINTS.START_INTERVIEW,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mengirim data");
  }

  return response.json();
};

export const verifyCandidateToken = async (token) => {
    const response = await fetch(API_ENDPOINTS.VERIFY_TOKEN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });

    if (!response.ok) throw new Error("Gagal memverifikasi token");
    return response.json();
};

export const getInterview = async (bidang) => {
  const response = await fetch(
    `${API_ENDPOINTS.INTERVIEW}?bidang=${bidang}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Gagal mengambil data pertanyaan");
  }

  return response.json();
};

export const saveAnswer = async (payload) => {
  const response = await fetch(API_ENDPOINTS.SAVE_ANSWER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Gagal menyimpan jawaban");
  }

  return response.json();
};

export const finishInterview = async (payload) => {
  const response = await fetch(API_ENDPOINTS.FINISH_INTERVIEW, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Gagal memberi nilai dan rekomendasi");
  }

  return response.json();
};