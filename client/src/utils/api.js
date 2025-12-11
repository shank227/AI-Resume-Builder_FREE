// src/utils/api.js

// AUTH BASE URL
const BASE_URL = "http://localhost:5000/api/auth";

export const registerUserAPI = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (err) {
    return { message: "Server error" };
  }
};

export const loginUserAPI = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    return await res.json();
  } catch (err) {
    return { message: "Server error" };
  }
};

export const getProfileAPI = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return await res.json();
  } catch (err) {
    return { message: "Server error" };
  }
};
