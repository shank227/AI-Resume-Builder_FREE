// src/utils/api.js

//------------------------------------
// AUTH
//------------------------------------
const AUTH_URL = "http://localhost:5000/api/auth";

export const registerUserAPI = async (data) => {
  try {
    const res = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { message: "Server error" };
  }
};

export const loginUserAPI = async (data) => {
  try {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch {
    return { message: "Server error" };
  }
};

export const getProfileAPI = async (token) => {
  try {
    const res = await fetch(`${AUTH_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch {
    return { message: "Server error" };
  }
};

//------------------------------------
// RESUME API
//------------------------------------
const RESUME_URL = "http://localhost:5000/api/resume";

// CREATE resume
export const createResumeAPI = async (token, resumeData) => {
  try {
    const res = await fetch(RESUME_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(resumeData),
    });
    return await res.json();
  } catch {
    return { message: "Error creating resume" };
  }
};

// UPDATE resume
export const updateResumeAPI = async (token, id, resumeData) => {
  try {
    const res = await fetch(`${RESUME_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(resumeData),
    });
    return await res.json();
  } catch {
    return { message: "Error updating resume" };
  }
};

// GET ALL resumes
export const getAllResumesAPI = async (token) => {
  try {
    const res = await fetch(RESUME_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch {
    return { message: "Error fetching resumes" };
  }
};

// GET single resume
export const getResumeByIdAPI = async (token, id) => {
  try {
    const res = await fetch(`${RESUME_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch {
    return { message: "Error loading resume" };
  }
};

// DELETE resume
export const deleteResumeAPI = async (token, id) => {
  try {
    const res = await fetch(`${RESUME_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch {
    return { message: "Error deleting resume" };
  }
};

// UPDATE TITLE only
export const updateResumeTitleAPI = async (token, id, title) => {
  try {
    const res = await fetch(`${RESUME_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
    return await res.json();
  } catch {
    return { message: "Error updating title" };
  }
};

export const improveResumeAPI = async (token, section, text) => {
  const res = await fetch("http://localhost:5000/api/ai/improve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ section, text }),
  });

  return res.json();
};
