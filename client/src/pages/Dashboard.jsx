// client/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { FilePenLineIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  getAllResumesAPI,
  createResumeAPI,
  deleteResumeAPI,
} from "../utils/api";

import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const colors = ["#9333ea", "#0284c7", "#16a34a", "#dc2626", "#d97706"];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");

  // -------------------------------------------------------
  // LOAD RESUMES
  // -------------------------------------------------------
  const loadAllResumes = async () => {
    const res = await getAllResumesAPI(token);
    if (res?.resumes) setAllResumes(res.resumes);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  // -------------------------------------------------------
  // CREATE RESUME
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
        skills: [],
      },
    };

    const res = await createResumeAPI(token, payload);

    if (res?._id) {
      setShowCreateResume(false);
      setTitle("");
      navigate(`/app/builder/${res._id}`);
    }
  };

  // -------------------------------------------------------
  // DELETE RESUME
  // -------------------------------------------------------
  const deleteResume = async (resumeId) => {
    const ok = confirm("Delete this resume permanently?");
    if (!ok) return;

    const res = await deleteResumeAPI(token, resumeId);
    if (res?.success) {
      setAllResumes((prev) => prev.filter((r) => r._id !== resumeId));
    }
  };

  // =======================================================
  // UI
  // =======================================================
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-slate-800">
            Hi, User 👋
          </h1>
          <p className="text-slate-500 mt-1">
            Create, edit and export your resumes
          </p>
        </div>

        {/* Create Resume Card */}
        <div className="flex gap-6 mb-10">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-40 h-44 flex flex-col items-center justify-center gap-3
              rounded-xl border-2 border-dashed border-slate-300
              bg-white hover:border-indigo-500 hover:shadow-md
              transition-all"
          >
            <PlusIcon className="size-10 p-2 bg-indigo-600 text-white rounded-full" />
            <span className="text-sm font-medium text-slate-700">
              Create Resume
            </span>
          </button>
        </div>

        {/* Resume Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {allResumes.map((resume, index) => {
            const base = colors[index % colors.length];

            return (
              <div
                key={resume._id}
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                className="relative cursor-pointer h-44 rounded-xl border
                  flex flex-col items-center justify-center gap-2
                  hover:shadow-lg transition-all"
                style={{
                  background: `linear-gradient(135deg, ${base}18, ${base}30)`,
                  borderColor: base + "40",
                }}
              >
                <FilePenLineIcon className="size-7" style={{ color: base }} />

                <p
                  className="text-sm font-medium text-center px-3"
                  style={{ color: base }}
                >
                  {resume.title || "Untitled Resume"}
                </p>

                <p className="absolute bottom-2 text-[11px] text-slate-500">
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                {/* Delete */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteResume(resume._id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded
                    hover:bg-white/50 text-slate-700"
                >
                  <TrashIcon className="size-5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Create Resume Modal */}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={(e) =>
              e.target === e.currentTarget && setShowCreateResume(false)
            }
            className="fixed inset-0 bg-black/60 backdrop-blur
              flex items-center justify-center z-20"
          >
            <div className="bg-white p-6 rounded-xl w-full max-w-sm">
              <h2 className="text-xl font-semibold mb-4">
                Create Resume
              </h2>

              <input
                className="w-full px-4 py-2 border rounded mb-4"
                placeholder="Resume title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <button className="w-full py-2 bg-indigo-600 text-white rounded">
                Start Building
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
