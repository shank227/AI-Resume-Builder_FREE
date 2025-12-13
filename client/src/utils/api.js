// src/utils/api.js

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://ai-resume-builder-backend-swhl.onrender.com";

//------------------------------------
// AUTH
//------------------------------------
const AUTH_URL = `${BASE_URL}/api/auth`;

export const registerUserAPI = async (data) => {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUserAPI = async (data) => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getProfileAPI = async (token) => {
  const res = await fetch(`${AUTH_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

//------------------------------------
// RESUME API
//------------------------------------
const RESUME_URL = `${BASE_URL}/api/resume`;

export const createResumeAPI = async (token, resumeData) => {
  const res = await fetch(RESUME_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resumeData),
  });
  return res.json();
};

export const updateResumeAPI = async (token, id, resumeData) => {
  const res = await fetch(`${RESUME_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(resumeData),
  });
  return res.json();
};

export const getAllResumesAPI = async (token) => {
  const res = await fetch(RESUME_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const getResumeByIdAPI = async (token, id) => {
  const res = await fetch(`${RESUME_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const deleteResumeAPI = async (token, id) => {
  const res = await fetch(`${RESUME_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

//------------------------------------
// AI
//------------------------------------
export const improveResumeAPI = async (token, section, text) => {
  const res = await fetch(`${BASE_URL}/api/ai/improve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ section, text }),
  });
  return res.json();
};
