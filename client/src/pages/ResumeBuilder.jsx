// client/src/pages/ResumeBuilder.jsx
import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import ClassicTemplate from "../components/templates/ClassicTemplate.jsx";
import HarvardTemplate from "../components/templates/HarvardTemplate.jsx";
import { useReactToPrint } from "react-to-print";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  createResumeAPI,
  updateResumeAPI,
  getResumeByIdAPI,
} from "../utils/api";

import { useAuth } from "../context/authContext";

const uid = () => Math.random().toString(36).slice(2, 9);

/* --------------------------------------------
   AI CALL (SIMPLE GEMINI)
-------------------------------------------- */
// async function simpleAI(prompt) {
//   try {
//     const res = await fetch("http://localhost:5000/api/ai/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt }),
//     });

//     const json = await res.json();
//     if (json.success) return json.suggestion;
//     return null;
//   } catch (err) {
//     return null;
//   }
// }

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function simpleAI(prompt) {
  try {
    const res = await fetch(`${BASE_URL}/api/ai/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ prompt }),
    });

    const json = await res.json();
    return json.success ? json.suggestion : null;
  } catch (err) {
    console.error("AI error:", err);
    return null;
  }
}




/* ---------- Resume Preview Wrapper ---------- */
const ResumePreview = ({ data, accentColor }) => {
  return (
    <div
      className="w-full bg-white"
      style={{ width: "100%", minHeight: "100%" }}
    >
      {data.template === "classic" ? (
        <ClassicTemplate data={data} accentColor={accentColor} />
      ) : (
        <HarvardTemplate data={data} accentColor={accentColor} />
      )}
    </div>
  );
};

/* ---------- Template Selector ---------- */
const TemplateSelector = ({ value, onChange }) => {
  const options = [
    { id: "classic", name: "Classic (Photo)" },
    { id: "harvard", name: "Harvard (No Photo)" },
  ];

  return (
    <div className="flex gap-2">
      {options.map((o) => (
        <button
          key={o.id}
          onClick={() => onChange(o.id)}
          className={`px-3 py-1 rounded ${
            value === o.id
              ? "bg-indigo-600 text-white"
              : "border border-gray-300"
          }`}
        >
          {o.name}
        </button>
      ))}
    </div>
  );
};

/* ===========================================================
    MAIN PAGE
=========================================================== */
export default function ResumeBuilder() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const { token } = useAuth() || {};

  /* ---------- Quill Config ---------- */
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
    ],
  };
  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];

  /* ---------- Export Functions ---------- */
  const exportAsImage = async () => {
    if (!previewRef.current) return;
    const canvas = await html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "resume.png";
    link.click();
  };

  const exportAsPDF = useReactToPrint({
    contentRef: previewRef,
    documentTitle: "resume",
  });

  /* ---------- Resume State ---------- */
  const [resume, setResume] = useState(() => ({
    _id: uid(),
    title: "My Resume",
    template: "classic",
    personal_info: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      image: null,
      linkedin: "",
      github: "",
      website: "",
    },
    summary: "",
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    skills: [],
  }));

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  /* ---------- Helpers ---------- */
  const setPI = (patch) =>
    setResume((r) => ({
      ...r,
      personal_info: { ...r.personal_info, ...patch },
    }));

  const update = (k, v) => setResume((r) => ({ ...r, [k]: v }));

  const add = (key, obj) =>
    setResume((r) => ({ ...r, [key]: [...r[key], { _id: uid(), ...obj }] }));

  const updateItem = (key, id, patch) =>
    setResume((r) => ({
      ...r,
      [key]: r[key].map((i) => (i._id === id ? { ...i, ...patch } : i)),
    }));

  const remove = (key, id) =>
    setResume((r) => ({
      ...r,
      [key]: r[key].filter((i) => i._id !== id),
    }));

  /* ---------- Load Resume ---------- */
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const load = async () => {
      setLoading(true);
      const res = await getResumeByIdAPI(token, resumeId);
      if (res && res._id && res.data) {
        setResume({
          _id: res._id,
          title: res.title || "My Resume",
          template: res.data.template || "classic",
          personal_info: {
            ...resume.personal_info,
            ...(res.data.personal_info || {}),
          },
          summary: res.data.summary || "",
          experience: res.data.experience || [],
          education: res.data.education || [],
          projects: res.data.projects || [],
          certifications: res.data.certifications || [],
          skills: res.data.skills || [],
        });
      }
      setLoading(false);
    };

    if (resumeId && resumeId !== "new") load();
  }, [resumeId, token]);

  /* ---------- Save Resume ---------- */
  const handleSave = async () => {
    if (!token) return setMessage("You must be logged in.");

    setSaving(true);
    const payload = { title: resume.title, data: resume };
    let result;

    if (!resumeId || resumeId === "new") {
      result = await createResumeAPI(token, payload);
      if (result._id) navigate(`/app/builder/${result._id}`, { replace: true });
    } else {
      result = await updateResumeAPI(token, resumeId, payload);
    }

    setMessage(result._id ? "Saved!" : "Save failed.");
    setTimeout(() => setMessage(null), 2000);
    setSaving(false);
  };

  /* ===========================================================
      UI
  ============================================================ */
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Your Playground</h1>
          </div>

          <div className="flex gap-3">
            <TemplateSelector
              value={resume.template}
              onChange={(t) => update("template", t)}
            />
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={exportAsPDF}
            >
              Export to PDF
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-4 text-yellow-900 bg-yellow-100 px-3 py-1 rounded">
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT SIDE INPUTS */}
          <div className="lg:col-span-5 space-y-6">
            {/* PERSONAL INFO */}
            <div className="bg-white p-5 border rounded-lg shadow-sm">
              <h3 className="font-semibold mb-3">Personal Info</h3>

              <input
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="Full Name"
                value={resume.personal_info.fullName}
                onChange={(e) => setPI({ fullName: e.target.value })}
              />
              <input
                className="w-full px-3 py-2 border rounded mb-2"
                placeholder="Email"
                value={resume.personal_info.email}
                onChange={(e) => setPI({ email: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  className="px-3 py-2 border rounded"
                  placeholder="Phone"
                  value={resume.personal_info.phone}
                  onChange={(e) => setPI({ phone: e.target.value })}
                />
                <input
                  className="px-3 py-2 border rounded"
                  placeholder="Location"
                  value={resume.personal_info.location}
                  onChange={(e) => setPI({ location: e.target.value })}
                />
              </div>

              <input
                className="mt-2 w-full px-3 py-2 border rounded"
                placeholder="LinkedIn URL"
                value={resume.personal_info.linkedin}
                onChange={(e) => setPI({ linkedin: e.target.value })}
              />

              <input
                className="mt-2 w-full px-3 py-2 border rounded"
                placeholder="GitHub URL"
                value={resume.personal_info.github}
                onChange={(e) => setPI({ github: e.target.value })}
              />

              <input
                className="mt-2 w-full px-3 py-2 border rounded"
                placeholder="Portfolio URL"
                value={resume.personal_info.website}
                onChange={(e) => setPI({ website: e.target.value })}
              />
            </div>

            {/* SUMMARY */}
            <div className="bg-white p-5 border rounded-lg shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">Professional Summary</h3>
                <button
                  type="button"
                  onClick={async () => {
                    const improved = await simpleAI(
                      `Improve this resume summary into 2-3 strong, impactful sentences: ${resume.summary}`
                    );
                    if (improved) update("summary", improved);
                  }}
                  className="
    px-3 py-1.5
    text-xs font-semibold
    rounded-full
    bg-gradient-to-r from-indigo-500 to-purple-500
    text-white
    shadow-sm
    hover:shadow-md hover:scale-[1.03]
    transition-all
  "
                >
                  ✨ Enhance with AI
                </button>
              </div>

              <ReactQuill
                theme="snow"
                value={resume.summary}
                onChange={(v) => update("summary", v)}
                modules={quillModules}
                formats={quillFormats}
                className="bg-white mt-2"
              />
            </div>

            {/* EXPERIENCE */}
            <div className="bg-white p-5 border rounded-lg shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">Experience</h3>
                <button
                  className="text-indigo-600 text-sm"
                  onClick={() =>
                    add("experience", {
                      title: "",
                      company: "",
                      start: "",
                      end: "",
                      desc: "",
                    })
                  }
                >
                  + Add
                </button>
              </div>

              {resume.experience.map((exp) => (
                <div key={exp._id} className="border p-3 rounded mt-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <input
                        className="w-full px-2 py-1 border rounded mb-2"
                        placeholder="Role"
                        value={exp.title}
                        onChange={(e) =>
                          updateItem("experience", exp._id, {
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        className="w-full px-2 py-1 border rounded mb-2"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) =>
                          updateItem("experience", exp._id, {
                            company: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        const improved = await simpleAI(
                          `Rewrite this resume experience to be achievement-focused and professional: ${exp.desc}`
                        );
                        if (improved)
                          updateItem("experience", exp._id, { desc: improved });
                      }}
                      className="
    px-3 py-1.5
    text-xs font-semibold
    rounded-full
    bg-gradient-to-r from-indigo-500 to-purple-500
    text-white
    shadow-sm
    hover:shadow-md hover:scale-[1.03]
    transition-all
  "
                    >
                      ✨ Enhance with AI
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="px-2 py-1 border rounded"
                      placeholder="Start"
                      value={exp.start}
                      onChange={(e) =>
                        updateItem("experience", exp._id, {
                          start: e.target.value,
                        })
                      }
                    />
                    <input
                      className="px-2 py-1 border rounded"
                      placeholder="End"
                      value={exp.end}
                      onChange={(e) =>
                        updateItem("experience", exp._id, {
                          end: e.target.value,
                        })
                      }
                    />
                  </div>

                  <ReactQuill
                    theme="snow"
                    value={exp.desc}
                    onChange={(v) =>
                      updateItem("experience", exp._id, { desc: v })
                    }
                    modules={quillModules}
                    formats={quillFormats}
                    className="bg-white mt-2"
                  />

                  <button
                    className="text-red-600 text-sm mt-2"
                    onClick={() => remove("experience", exp._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* EDUCATION */}
            <div className="bg-white p-5 border rounded-lg shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">Education</h3>
                <button
                  className="text-indigo-600 text-sm"
                  onClick={() =>
                    add("education", {
                      school: "",
                      degree: "",
                      start: "",
                      end: "",
                      desc: "",
                    })
                  }
                >
                  + Add
                </button>
              </div>

              {resume.education.map((ed) => (
                <div key={ed._id} className="border p-3 rounded mt-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <input
                        className="w-full px-2 py-1 border rounded mb-2"
                        placeholder="School"
                        value={ed.school}
                        onChange={(e) =>
                          updateItem("education", ed._id, {
                            school: e.target.value,
                          })
                        }
                      />
                      <input
                        className="w-full px-2 py-1 border rounded mb-2"
                        placeholder="Degree"
                        value={ed.degree}
                        onChange={(e) =>
                          updateItem("education", ed._id, {
                            degree: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        const improved = await simpleAI(
                          `Polish this education description for resume clarity: ${ed.desc}`
                        );
                        if (improved)
                          updateItem("education", ed._id, { desc: improved });
                      }}
                      className="
    px-3 py-1.5
    text-xs font-semibold
    rounded-full
    bg-gradient-to-r from-indigo-500 to-purple-500
    text-white
    shadow-sm
    hover:shadow-md hover:scale-[1.03]
    transition-all
  "
                    >
                      ✨ Enhance with AI
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="px-2 py-1 border rounded"
                      placeholder="Start"
                      value={ed.start}
                      onChange={(e) =>
                        updateItem("education", ed._id, {
                          start: e.target.value,
                        })
                      }
                    />
                    <input
                      className="px-2 py-1 border rounded"
                      placeholder="End"
                      value={ed.end}
                      onChange={(e) =>
                        updateItem("education", ed._id, { end: e.target.value })
                      }
                    />
                  </div>

                  <ReactQuill
                    theme="snow"
                    value={ed.desc}
                    onChange={(v) =>
                      updateItem("education", ed._id, { desc: v })
                    }
                    modules={quillModules}
                    formats={quillFormats}
                    className="bg-white mt-2"
                  />

                  <button
                    className="text-red-600 text-sm mt-2"
                    onClick={() => remove("education", ed._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* PROJECTS */}
            <div className="bg-white p-5 border rounded-lg shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">Projects</h3>
                <button
                  className="text-indigo-600 text-sm"
                  onClick={() =>
                    add("projects", { title: "", link: "", desc: "" })
                  }
                >
                  + Add
                </button>
              </div>

              {resume.projects.map((p) => (
                <div key={p._id} className="border p-3 rounded mt-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <input
                        className="mb-2 w-full px-2 py-1 border rounded"
                        placeholder="Project Title"
                        value={p.title}
                        onChange={(e) =>
                          updateItem("projects", p._id, {
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        className="mb-2 w-full px-2 py-1 border rounded"
                        placeholder="Project Link"
                        value={p.link}
                        onChange={(e) =>
                          updateItem("projects", p._id, {
                            link: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      type="button"
                      onClick={async () => {
                        const improved = await simpleAI(
                          `Improve this project description to sound technical and resume-ready: ${p.desc}`
                        );
                        if (improved)
                          updateItem("projects", p._id, { desc: improved });
                      }}
                      className="
    px-3 py-1.5
    text-xs font-semibold
    rounded-full
    bg-gradient-to-r from-indigo-500 to-purple-500
    text-white
    shadow-sm
    hover:shadow-md hover:scale-[1.03]
    transition-all
  "
                    >
                      ✨ Enhance with AI
                    </button>
                  </div>

                  <ReactQuill
                    theme="snow"
                    value={p.desc}
                    onChange={(v) => updateItem("projects", p._id, { desc: v })}
                    modules={quillModules}
                    formats={quillFormats}
                    className="bg-white mt-2"
                  />

                  <button
                    className="text-red-600 text-sm mt-2"
                    onClick={() => remove("projects", p._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* CERTIFICATIONS */}
            <div className="bg-white p-5 border rounded-lg shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">Certifications</h3>
                <button
                  className="text-indigo-600 text-sm"
                  onClick={() =>
                    add("certifications", {
                      title: "",
                      issuer: "",
                      date: "",
                      link: "",
                      desc: "",
                    })
                  }
                >
                  + Add
                </button>
              </div>

              {resume.certifications.map((c) => (
                <div key={c._id} className="border p-3 rounded mt-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <input
                        className="mb-2 w-full px-2 py-1 border rounded"
                        placeholder="Certification Title"
                        value={c.title}
                        onChange={(e) =>
                          updateItem("certifications", c._id, {
                            title: e.target.value,
                          })
                        }
                      />
                      <input
                        className="mb-2 w-full px-2 py-1 border rounded"
                        placeholder="Issuer"
                        value={c.issuer}
                        onChange={(e) =>
                          updateItem("certifications", c._id, {
                            issuer: e.target.value,
                          })
                        }
                      />
                    </div>

                    <button
                      onClick={async () => {
                        const improved = await simpleAI(
                          `Rewrite this certification description for professionalism and clarity: ${c.desc}`
                        );
                        if (improved) {
                          updateItem("certifications", c._id, {
                            desc: improved,
                          });
                        }
                      }}
                      className="
    px-3 py-1.5
    text-xs font-medium
    rounded-full
    bg-gradient-to-r from-indigo-500 to-purple-500
    text-white
    shadow-sm
    hover:shadow-md hover:scale-[1.03]
    transition-all
  "
                    >
                      ✨ Enhance with AI
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="px-2 py-1 border rounded"
                      placeholder="Year"
                      value={c.date}
                      onChange={(e) =>
                        updateItem("certifications", c._id, {
                          date: e.target.value,
                        })
                      }
                    />
                    <input
                      className="px-2 py-1 border rounded"
                      placeholder="Certificate Link"
                      value={c.link}
                      onChange={(e) =>
                        updateItem("certifications", c._id, {
                          link: e.target.value,
                        })
                      }
                    />
                  </div>

                  <ReactQuill
                    theme="snow"
                    value={c.desc}
                    onChange={(v) =>
                      updateItem("certifications", c._id, {
                        desc: v,
                      })
                    }
                    modules={quillModules}
                    formats={quillFormats}
                    className="bg-white mt-2"
                  />

                  <button
                    className="text-red-600 text-sm mt-2"
                    onClick={() => remove("certifications", c._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* SKILLS */}
            <div className="bg-white p-5 border rounded-lg shadow-sm">
              <h3 className="font-semibold mb-2">Skills</h3>
              <SkillEditor
                skills={resume.skills}
                onChange={(s) => update("skills", s)}
              />
            </div>
          </div>

          {/* RIGHT PREVIEW */}
          <div className="lg:col-span-7">
            <div
              ref={previewRef}
              id="resume-preview-wrapper"
              className="bg-white rounded-xl p-5"
            >
              <ResumePreview data={resume} accentColor="#3B82F6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
    SKILLS EDITOR
=========================================================== */
function SkillEditor({ skills, onChange }) {
  const [val, setVal] = useState("");

  const addSkill = () => {
    if (!val.trim()) return;
    onChange([...skills, val]);
    setVal("");
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Add skill..."
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <button className="px-3 py-2 border rounded" onClick={addSkill}>
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {skills.map((s, i) => (
          <span
            key={i}
            className="px-2 py-1 rounded bg-gray-100 flex items-center gap-2"
          >
            {s}
            <button
              className="text-red-600"
              onClick={() => onChange(skills.filter((_, idx) => idx !== i))}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
