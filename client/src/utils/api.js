// src/utils/api.js
const BASE_URL = "http://localhost:5000/api/users";

export const registerUserAPI = async (data) => {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const loginUserAPI = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getProfileAPI = async (token) => {
  const res = await fetch(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.json();
};
