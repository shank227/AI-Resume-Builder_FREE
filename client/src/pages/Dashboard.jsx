// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import {
  FilePenLineIcon,
  PlusIcon,
  UploadCloudIcon,
  TrashIcon,
  PencilIcon,
  XIcon,
  UploadCloud,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getAllResumesAPI,
  createResumeAPI,        // CREATE resume
  updateResumeAPI,     // UPDATE resume
  deleteResumeAPI      // DELETE resume
} from "../utils/api";

import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);

  const [title, setTitle] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const [editResumeId, setEditResumeId] = useState("");

  // -------------------------------------------------------
  // LOAD ALL RESUMES
  // -------------------------------------------------------
  const loadAllResumes = async () => {
    const res = await getAllResumesAPI(token);
    if (res?.resumes) setAllResumes(res.resumes);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  // -------------------------------------------------------
  // CREATE RESUME (Option A)
  // -------------------------------------------------------
  const createResume = async (e) => {
  e.preventDefault();
  if (!title.trim()) return;

  const payload = {
    title,
    data: {
      title,
      template: "classic",
      personal_info: {},
      summary: "",
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      skills: []
    }
  };

  // IMPORTANT FIX: send full payload
  const res = await createResumeAPI(token, payload);

  if (res?._id) {
    setShowCreateResume(false);
    navigate(`/app/builder/${res._id}`);
  }
};


  // -------------------------------------------------------
  // DELETE RESUME
  // -------------------------------------------------------
  const deleteResume = async (resumeId) => {
    const ok = confirm("Are you sure you want to delete this resume?");
    if (!ok) return;

    const res = await deleteResumeAPI(token, resumeId);

    if (res?.success) {
      setAllResumes(prev => prev.filter(r => r._id !== resumeId));
    }
  };

  // -------------------------------------------------------
  // UPDATE TITLE
  // -------------------------------------------------------
  const editTitle = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const oldResume = allResumes.find(r => r._id === editResumeId);
    if (!oldResume) return;

    const payload = {
      title,
      data: oldResume.data
    };

    const res = await updateResumeAPI(token, editResumeId, payload);

    if (res?.success) {
      setAllResumes(prev =>
        prev.map(r =>
          r._id === editResumeId ? { ...r, title } : r
        )
      );

      setEditResumeId("");
      setTitle("");
    }
  };

  // ===================================================================
  //                                UI
  // ===================================================================
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 
          bg-clip-text text-transparent sm:hidden">
          Welcome, {user?.fullName || "User"}
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          {/* Create Resume */}
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center 
            rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 
            group hover:border-purple-500 hover:shadow-lg transition-all duration-300"
          >
            <PlusIcon className="size-11 p-2.5 bg-indigo-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-indigo-600">Create CV/Resume</p>
          </button>

          {/* Upload Resume */}
          <button
            onClick={() => setShowUploadResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center 
            rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 
            group hover:border-pink-500 hover:shadow-lg transition-all duration-300"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-pink-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-pink-600">Upload CV/Resume</p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const base = colors[index % colors.length];

            return (
              <button
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center 
                rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${base}22, ${base}44)`,
                  borderColor: base + "40",
                }}
              >
                <FilePenLineIcon className="size-7" style={{ color: base }} />

                <p className="text-sm px-2 text-center" style={{ color: base }}>
                  {resume.title || "Untitled CV"}
                </p>

                <p className="absolute bottom-1 text-[11px] text-slate-400">
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Hover Buttons */}
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex hidden gap-1"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResumeId(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={(e) => e.target === e.currentTarget && setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-10"
          >
            <div className="bg-white p-6 rounded-lg w-full max-w-sm relative">
              <h2 className="text-xl font-bold mb-4">Create CV</h2>

              <input
                className="w-full px-4 py-2 mb-4 border rounded"
                placeholder="Enter CV Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded">
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setShowCreateResume(false)}
              />
            </div>
          </form>
        )}

        {/* Upload Resume Modal (placeholder — not implemented yet) */}
        {showUploadResume && (
          <form
            onClick={(e) => e.target === e.currentTarget && setShowUploadResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-10"
          >
            <div className="bg-white p-6 rounded-lg w-full max-w-sm relative">
              <h2 className="text-xl font-bold mb-4">Upload CV</h2>

              <input
                className="w-full px-4 py-2 mb-4 border rounded"
                placeholder="Enter CV Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <label className="block text-sm text-slate-700 mt-3">
                Select File
                <div className="flex flex-col items-center justify-center border border-dashed p-6 mt-2 rounded cursor-pointer">
                  {resumeFile ? resumeFile.name : "Upload PDF"}
                </div>
              </label>

              <input
                type="file"
                hidden
                accept=".pdf"
                onChange={(e) => setResumeFile(e.target.files[0])}
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded mt-4">
                Upload
              </button>

              <XIcon
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setShowUploadResume(false)}
              />
            </div>
          </form>
        )}

        {/* Edit Title Modal */}
        {editResumeId && (
          <form
            onSubmit={editTitle}
            onClick={(e) => e.target === e.currentTarget && setEditResumeId("")}
            className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-10"
          >
            <div className="bg-white p-6 rounded-lg w-full max-w-sm relative">
              <h2 className="text-xl font-bold mb-4">Edit Title</h2>

              <input
                className="w-full px-4 py-2 mb-4 border rounded"
                placeholder="Resume Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded">
                Update
              </button>

              <XIcon
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => setEditResumeId("")}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
