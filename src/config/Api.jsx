const BASE_URL = "http://localhost:5678/webhook/recruitment";

export const API_ENDPOINTS = {
  START_INTERVIEW: `${BASE_URL}/start-interview`,
  VERIFY_TOKEN: `${BASE_URL}/verify-token`,
  INTERVIEW: `${BASE_URL}/interview`,
  SAVE_ANSWER: `${BASE_URL}/save-answer`,
  FINISH_INTERVIEW: `${BASE_URL}/finish-interview`,
};
