// // client/src/pages/ResumeBuilder.jsx
// import React, { useRef, useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import html2canvas from "html2canvas";
// import ClassicTemplate from "../components/templates/ClassicTemplate.jsx";
// import HarvardTemplate from "../components/templates/HarvardTemplate.jsx";
// import { useReactToPrint } from "react-to-print";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import {
//   createResumeAPI,
//   updateResumeAPI,
//   getResumeByIdAPI,
// } from "../utils/api"; // resume APIs added in api.js
// import { useAuth } from "../context/authContext"; // your login token context
// import { improveResumeAPI } from "../utils/api";


// const uid = () => Math.random().toString(36).slice(2, 9);

// /* ---------- Resume Preview Wrapper ---------- */
// const ResumePreview = ({ data, accentColor }) => {
//   return (
//     <div
//       className="w-full bg-white"
//       style={{ width: "100%", minHeight: "100%" }}
//     >
//       {data.template === "classic" ? (
//         <ClassicTemplate data={data} accentColor={accentColor} />
//       ) : (
//         <HarvardTemplate data={data} accentColor={accentColor} />
//       )}
//     </div>
//   );
// };

// /* ---------- Template Selector ---------- */
// const TemplateSelector = ({ value, onChange }) => {
//   const options = [
//     { id: "classic", name: "Classic (Photo)" },
//     { id: "harvard", name: "Harvard (No Photo)" },
//   ];

//   return (
//     <div className="flex gap-2">
//       {options.map((o) => (
//         <button
//           key={o.id}
//           onClick={() => onChange(o.id)}
//           className={`px-3 py-1 rounded ${
//             value === o.id
//               ? "bg-indigo-600 text-white"
//               : "border border-gray-300"
//           }`}
//         >
//           {o.name}
//         </button>
//       ))}
//     </div>
//   );
// };

// /* ===========================================================
//     MAIN PAGE
// =========================================================== */
// export default function ResumeBuilder() {
//   const { resumeId } = useParams(); // expecting route /app/builder/:resumeId where new => "new"
//   const navigate = useNavigate();
//   const previewRef = useRef(null);
//   const { token } = useAuth() || {};

//   /* ---------- Quill config ---------- */
//   const quillModules = {
//     toolbar: [
//       ["bold", "italic", "underline"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["link"],
//     ],
//   };
//   const quillFormats = [
//     "bold",
//     "italic",
//     "underline",
//     "list",
//     "bullet",
//     "link",
//   ];

//   /* ---------- Export as Image ---------- */
//   const exportAsImage = async () => {
//     if (!previewRef.current) return;
//     const canvas = await html2canvas(previewRef.current, {
//       scale: 2,
//       useCORS: true,
//       logging: false,
//     });
//     const dataURL = canvas.toDataURL("image/png");
//     const link = document.createElement("a");
//     link.href = dataURL;
//     link.download = "resume.png";
//     link.click();
//   };

//   /* ---------- Export as PDF ---------- */
//   const exportAsPDF = useReactToPrint({
//     contentRef: previewRef,
//     documentTitle: "resume",
//     pageStyle: `
//       @page { size: A4; margin: 0; }
//       body { margin: 0 !important; padding: 0 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
//       .ql-toolbar { display: none !important; }
//       .ql-container.ql-snow { border: none !important; box-shadow: none !important; padding: 0 !important; }
//       .ql-editor { border: none !important; padding: 0 !important; }
//       #resume-preview-wrapper { border: none !important; box-shadow: none !important; }
//       .experience-item, .education-item, .project-item, .cert-item, section, div.resume-section {
//         break-inside: avoid !important;
//         page-break-inside: avoid !important;
//       }
//       * { box-shadow: none !important; }
//     `,
//   });

//   /* ---------- Resume State ---------- */
//   const [resume, setResume] = useState(() => ({
//     _id: uid(),
//     title: "My Resume",
//     template: "classic",
//     personal_info: {
//       fullName: "",
//       email: "",
//       phone: "",
//       location: "",
//       image: null,
//       linkedin: "",
//       github: "",
//       website: "",
//     },
//     summary: "",
//     experience: [],
//     education: [],
//     projects: [],
//     certifications: [],
//     skills: [],
//   }));

//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [message, setMessage] = useState(null);

//   /* ---------- Helpers ---------- */
//   const setPI = (patch) =>
//     setResume((r) => ({
//       ...r,
//       personal_info: { ...r.personal_info, ...patch },
//     }));

//   const update = (k, v) => setResume((r) => ({ ...r, [k]: v }));

//   const add = (key, obj) =>
//     setResume((r) => ({
//       ...r,
//       [key]: [...r[key], { _id: uid(), ...obj }],
//     }));

//   const updateItem = (key, id, patch) =>
//     setResume((r) => ({
//       ...r,
//       [key]: r[key].map((i) => (i._id === id ? { ...i, ...patch } : i)),
//     }));

//   const remove = (key, id) =>
//     setResume((r) => ({
//       ...r,
//       [key]: r[key].filter((i) => i._id !== id),
//     }));

//   const fileRef = useRef(null);
//   const setImage = (f) => setPI({ image: f || null });

//   /* ---------- Load existing resume when editing ---------- */
//   useEffect(() => {
//     // Redirect to login if no token
//     if (!token) {
//       // allow viewing builder if you want unauthorized? here we force login
//       navigate("/login");
//       return;
//     }

//     const load = async (id) => {
//       setLoading(true);
//       setMessage(null);
//       try {
//         const res = await getResumeByIdAPI(token, id);
//         if (res && res._id && res.data) {
//           // backend returns { _id, title, data, ... }
//           setResume({
//             _id: res._id,
//             title: res.title || res.data.title || "My Resume",
//             template: res.data.template || "classic",

//             personal_info: {
//               fullName: "",
//               email: "",
//               phone: "",
//               location: "",
//               image: null,
//               linkedin: "",
//               github: "",
//               website: "",
//               ...(res.data.personal_info || {}),
//             },

//             summary: res.data.summary || "",
//             experience: res.data.experience || [],
//             education: res.data.education || [],
//             projects: res.data.projects || [],
//             certifications: res.data.certifications || [],
//             skills: res.data.skills || [],
//           });
//         } else {
//           setMessage("Resume not found or you don't have access.");
//         }
//       } catch (err) {
//         setMessage("Failed to load resume.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (resumeId && resumeId !== "new") {
//       load(resumeId);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [resumeId, token]);

//   /* ---------- Save / Update Handlers ---------- */
//   const handleSave = async () => {
//     if (!token) {
//       setMessage("You must be logged in to save.");
//       return;
//     }

//     setSaving(true);
//     setMessage(null);

//     const payload = {
//       title: resume.title || "Untitled Resume",
//       data: resume,
//     };

//     try {
//       // CREATE MODE (no resumeId OR resumeId === "new")
//       if (!resumeId || resumeId === "new") {
//         const created = await createResumeAPI(token, payload);

//         if (created && created._id) {
//           setResume((r) => ({ ...r, _id: created._id }));

//           navigate(`/app/builder/${created._id}`, { replace: true });

//           setMessage("Resume saved!");
//         } else {
//           setMessage(created.message || "Save failed.");
//         }
//       }

//       // UPDATE MODE
//       else {
//         const updated = await updateResumeAPI(token, resumeId, payload);

//         if (updated && updated._id) {
//           setMessage("Resume updated!");
//         } else {
//           setMessage(updated.message || "Update failed.");
//         }
//       }
//     } catch (err) {
//       setMessage("Save error.");
//     } finally {
//       setSaving(false);
//       window.setTimeout(() => setMessage(null), 3000);
//     }
//   };

//   const handleQuickSave = async () => {
//     // alias to save (useful for autosave later)
//     await handleSave();
//   };

//   /* ---------- UI ---------- */
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* ================= Header ================= */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h1 className="text-xl font-semibold">Resume Builder</h1>
//             <div className="text-sm text-gray-500 mt-1">
//               Edit & save your resume — saved to your account
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             <TemplateSelector
//               value={resume.template}
//               onChange={(t) => update("template", t)}
//             />

//             <button
//               className="px-4 py-2 bg-indigo-600 text-white rounded"
//               onClick={exportAsImage}
//             >
//               Export Image
//             </button>

//             <button
//               className="px-4 py-2 bg-green-600 text-white rounded"
//               onClick={exportAsPDF}
//             >
//               Export PDF
//             </button>

//             {/* Save / Update */}
//             <button
//               className="px-4 py-2 bg-blue-600 text-white rounded"
//               onClick={handleSave}
//               disabled={saving}
//               title={saving ? "Saving..." : "Save"}
//             >
//               {saving
//                 ? "Saving..."
//                 : resumeId && resumeId !== "new"
//                 ? "Save / Update"
//                 : "Save Resume"}
//             </button>
//           </div>
//         </div>

//         {message && (
//           <div className="mb-4">
//             <div className="inline-block bg-yellow-100 text-yellow-900 px-3 py-1 rounded">
//               {message}
//             </div>
//           </div>
//         )}

//         <div className="grid lg:grid-cols-12 gap-6">
//           {/* ================= LEFT COLUMN ================= */}
//           <div className="lg:col-span-5 space-y-6">
//             {/* PERSONAL INFO */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm">
//               <h3 className="font-semibold mb-3">Personal Info</h3>

//               <input
//                 className="w-full px-3 py-2 border rounded mb-2"
//                 placeholder="Full Name"
//                 value={resume.personal_info.fullName}
//                 onChange={(e) => setPI({ fullName: e.target.value })}
//               />

//               <input
//                 className="w-full px-3 py-2 border rounded mb-2"
//                 placeholder="Email"
//                 value={resume.personal_info.email}
//                 onChange={(e) => setPI({ email: e.target.value })}
//               />

//               <div className="grid grid-cols-2 gap-2">
//                 <input
//                   className="px-3 py-2 border rounded"
//                   placeholder="Phone"
//                   value={resume.personal_info.phone}
//                   onChange={(e) => setPI({ phone: e.target.value })}
//                 />

//                 <input
//                   className="px-3 py-2 border rounded"
//                   placeholder="Location"
//                   value={resume.personal_info.location}
//                   onChange={(e) => setPI({ location: e.target.value })}
//                 />
//               </div>

//               <p className="mt-3 text-sm text-gray-600">Profile Photo</p>
//               <input
//                 type="file"
//                 ref={fileRef}
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />

//               <input
//                 className="mt-3 w-full px-3 py-2 border rounded"
//                 placeholder="LinkedIn URL"
//                 value={resume.personal_info.linkedin}
//                 onChange={(e) => setPI({ linkedin: e.target.value })}
//               />

//               <input
//                 className="mt-2 w-full px-3 py-2 border rounded"
//                 placeholder="GitHub URL"
//                 value={resume.personal_info.github}
//                 onChange={(e) => setPI({ github: e.target.value })}
//               />

//               <input
//                 className="mt-2 w-full px-3 py-2 border rounded"
//                 placeholder="Portfolio URL"
//                 value={resume.personal_info.website}
//                 onChange={(e) => setPI({ website: e.target.value })}
//               />
//             </div>

//             {/* SUMMARY */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm resume-section">
//               <h3 className="font-semibold mb-3">Professional Summary</h3>
//               <button
//                 className="px-3 py-1 bg-purple-600 text-white rounded mb-3 text-sm"
//                 onClick={async () => {
//                   const res = await improveResumeAPI(
//                     token,
//                     "summary",
//                     resume.summary
//                   );
//                   update("summary", res.improved);
//                 }}
//               >
//                 Improve with AI ✨
//               </button>
//               <ReactQuill
//                 theme="snow"
//                 value={resume.summary}
//                 onChange={(v) => update("summary", v)}
//                 modules={quillModules}
//                 formats={quillFormats}
//                 className="bg-white"
//               />
//             </div>

//             {/* EXPERIENCE */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm resume-section">
//               <div className="flex justify-between">
//                 <h3 className="font-semibold">Experience</h3>
//                 <button
//                   className="text-indigo-600 text-sm"
//                   onClick={() =>
//                     add("experience", {
//                       title: "",
//                       company: "",
//                       start: "",
//                       end: "",
//                       desc: "",
//                     })
//                   }
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-3 mt-3">
//                 {resume.experience.map((exp) => (
//                   <div
//                     key={exp._id}
//                     className="border p-3 rounded experience-item"
//                   >
//                     <input
//                       className="w-full px-2 py-1 border rounded mb-2"
//                       placeholder="Role"
//                       value={exp.title}
//                       onChange={(e) =>
//                         updateItem("experience", exp._id, {
//                           title: e.target.value,
//                         })
//                       }
//                     />

//                     <input
//                       className="w-full px-2 py-1 border rounded mb-2"
//                       placeholder="Company"
//                       value={exp.company}
//                       onChange={(e) =>
//                         updateItem("experience", exp._id, {
//                           company: e.target.value,
//                         })
//                       }
//                     />

//                     <div className="grid grid-cols-2 gap-2">
//                       <input
//                         className="px-2 py-1 border rounded"
//                         placeholder="Start"
//                         value={exp.start}
//                         onChange={(e) =>
//                           updateItem("experience", exp._id, {
//                             start: e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         className="px-2 py-1 border rounded"
//                         placeholder="End"
//                         value={exp.end}
//                         onChange={(e) =>
//                           updateItem("experience", exp._id, {
//                             end: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <ReactQuill
//                       theme="snow"
//                       value={exp.desc}
//                       onChange={(v) =>
//                         updateItem("experience", exp._id, { desc: v })
//                       }
//                       modules={quillModules}
//                       formats={quillFormats}
//                       className="bg-white mt-2"
//                     />

//                     <button
//                       className="mt-2 text-red-600 text-sm"
//                       onClick={() => remove("experience", exp._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* EDUCATION */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm resume-section">
//               <div className="flex justify-between">
//                 <h3 className="font-semibold">Education</h3>
//                 <button
//                   className="text-indigo-600 text-sm"
//                   onClick={() =>
//                     add("education", {
//                       school: "",
//                       degree: "",
//                       start: "",
//                       end: "",
//                       desc: "",
//                     })
//                   }
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-3 mt-3">
//                 {resume.education.map((ed) => (
//                   <div
//                     key={ed._id}
//                     className="border p-3 rounded education-item"
//                   >
//                     <input
//                       className="w-full px-2 py-1 border rounded mb-2"
//                       placeholder="School"
//                       value={ed.school}
//                       onChange={(e) =>
//                         updateItem("education", ed._id, {
//                           school: e.target.value,
//                         })
//                       }
//                     />

//                     <input
//                       className="w-full px-2 py-1 border rounded mb-2"
//                       placeholder="Degree"
//                       value={ed.degree}
//                       onChange={(e) =>
//                         updateItem("education", ed._id, {
//                           degree: e.target.value,
//                         })
//                       }
//                     />

//                     <div className="grid grid-cols-2 gap-2">
//                       <input
//                         className="px-2 py-1 border rounded"
//                         placeholder="Start"
//                         value={ed.start}
//                         onChange={(e) =>
//                           updateItem("education", ed._id, {
//                             start: e.target.value,
//                           })
//                         }
//                       />
//                       <input
//                         className="px-2 py-1 border rounded"
//                         placeholder="End"
//                         value={ed.end}
//                         onChange={(e) =>
//                           updateItem("education", ed._id, {
//                             end: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <ReactQuill
//                       theme="snow"
//                       value={ed.desc}
//                       onChange={(v) =>
//                         updateItem("education", ed._id, { desc: v })
//                       }
//                       modules={quillModules}
//                       formats={quillFormats}
//                       className="bg-white mt-2"
//                     />

//                     <button
//                       className="mt-2 text-red-600 text-sm"
//                       onClick={() => remove("education", ed._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* PROJECTS */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm resume-section">
//               <div className="flex justify-between">
//                 <h3 className="font-semibold">Projects</h3>

//                 <button
//                   className="text-indigo-600 text-sm"
//                   onClick={() =>
//                     add("projects", { title: "", link: "", desc: "" })
//                   }
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-3 mt-3">
//                 {resume.projects.map((p) => (
//                   <div key={p._id} className="border p-3 rounded project-item">
//                     <input
//                       className="mb-2 w-full px-2 py-1 border rounded"
//                       placeholder="Project Title"
//                       value={p.title}
//                       onChange={(e) =>
//                         updateItem("projects", p._id, { title: e.target.value })
//                       }
//                     />

//                     <input
//                       className="mb-2 w-full px-2 py-1 border rounded"
//                       placeholder="Project Link"
//                       value={p.link}
//                       onChange={(e) =>
//                         updateItem("projects", p._id, { link: e.target.value })
//                       }
//                     />

//                     <ReactQuill
//                       theme="snow"
//                       value={p.desc}
//                       onChange={(v) =>
//                         updateItem("projects", p._id, { desc: v })
//                       }
//                       modules={quillModules}
//                       formats={quillFormats}
//                       className="bg-white mt-2"
//                     />

//                     <button
//                       className="mt-2 text-red-600 text-sm"
//                       onClick={() => remove("projects", p._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CERTIFICATIONS */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm resume-section">
//               <div className="flex justify-between">
//                 <h3 className="font-semibold">Certifications</h3>

//                 <button
//                   className="text-indigo-600 text-sm"
//                   onClick={() =>
//                     add("certifications", {
//                       title: "",
//                       issuer: "",
//                       date: "",
//                       link: "",
//                       desc: "",
//                     })
//                   }
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-3 mt-3">
//                 {resume.certifications.map((c) => (
//                   <div key={c._id} className="border p-3 rounded cert-item">
//                     <input
//                       className="mb-2 w-full px-2 py-1 border rounded"
//                       placeholder="Certification Title"
//                       value={c.title}
//                       onChange={(e) =>
//                         updateItem("certifications", c._id, {
//                           title: e.target.value,
//                         })
//                       }
//                     />

//                     <input
//                       className="mb-2 w-full px-2 py-1 border rounded"
//                       placeholder="Issuer"
//                       value={c.issuer}
//                       onChange={(e) =>
//                         updateItem("certifications", c._id, {
//                           issuer: e.target.value,
//                         })
//                       }
//                     />

//                     <div className="grid grid-cols-2 gap-2">
//                       <input
//                         className="px-2 py-1 border rounded"
//                         placeholder="Year"
//                         value={c.date}
//                         onChange={(e) =>
//                           updateItem("certifications", c._id, {
//                             date: e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         className="px-2 py-1 border rounded"
//                         placeholder="Certificate Link"
//                         value={c.link}
//                         onChange={(e) =>
//                           updateItem("certifications", c._id, {
//                             link: e.target.value,
//                           })
//                         }
//                       />
//                     </div>

//                     <ReactQuill
//                       theme="snow"
//                       value={c.desc}
//                       onChange={(v) =>
//                         updateItem("certifications", c._id, { desc: v })
//                       }
//                       modules={quillModules}
//                       formats={quillFormats}
//                       className="bg-white mt-2"
//                     />

//                     <button
//                       className="mt-2 text-red-600 text-sm"
//                       onClick={() => remove("certifications", c._id)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* SKILLS */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm resume-section">
//               <h3 className="font-semibold mb-2">Skills</h3>
//               <SkillEditor
//                 skills={resume.skills}
//                 onChange={(s) => update("skills", s)}
//               />
//             </div>
//           </div>

//           {/* ================= RIGHT COLUMN — PREVIEW ================= */}
//           <div className="lg:col-span-7">
//             <div
//               ref={previewRef}
//               id="resume-preview-wrapper"
//               className="bg-white rounded-xl p-5"
//             >
//               <ResumePreview data={resume} accentColor="#3B82F6" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ===========================================================
//     SKILLS EDITOR
// =========================================================== */
// function SkillEditor({ skills, onChange }) {
//   const [val, setVal] = useState("");

//   const addSkill = () => {
//     if (!val.trim()) return;
//     onChange([...skills, val]);
//     setVal("");
//   };

//   return (
//     <div>
//       <div className="flex gap-2">
//         <input
//           className="flex-1 px-3 py-2 border rounded"
//           placeholder="Add skill..."
//           value={val}
//           onChange={(e) => setVal(e.target.value)}
//         />
//         <button className="px-3 py-2 border rounded" onClick={addSkill}>
//           Add
//         </button>
//       </div>

//       <div className="flex flex-wrap gap-2 mt-3">
//         {skills.map((s, i) => (
//           <span
//             key={i}
//             className="px-2 py-1 rounded bg-gray-100 flex items-center gap-2"
//           >
//             {s}
//             <button
//               className="text-red-600"
//               onClick={() => onChange(skills.filter((_, idx) => idx !== i))}
//             >
//               ×
//             </button>
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }

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
async function simpleAI(prompt) {
  try {
    const res = await fetch("http://localhost:5000/api/ai/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const json = await res.json();
    if (json.success) return json.suggestion;
    return null;
  } catch (err) {
    return null;
  }
}

/* ---------- Resume Preview Wrapper ---------- */
const ResumePreview = ({ data, accentColor }) => {
  return (
    <div className="w-full bg-white" style={{ width: "100%", minHeight: "100%" }}>
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
  const quillFormats = ["bold", "italic", "underline", "list", "bullet", "link"];

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
            <h1 className="text-xl font-semibold">Resume Builder</h1>
            <p className="text-sm text-gray-500">Auto-save to your account</p>
          </div>

          <div className="flex gap-3">
            <TemplateSelector
              value={resume.template}
              onChange={(t) => update("template", t)}
            />

            <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={exportAsImage}>
              Image
            </button>

            <button className="px-4 py-2 bg-green-600 text-white rounded" onClick={exportAsPDF}>
              PDF
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save"}
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
                  className="text-indigo-600 text-sm"
                  onClick={async () => {
                    const improved = await simpleAI(
                      `Improve this resume summary into 2–3 strong, impactful sentences: ${resume.summary}`
                    );
                    if (improved) update("summary", improved);
                  }}
                >
                  Improve
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
                          updateItem("experience", exp._id, { title: e.target.value })
                        }
                      />
                      <input
                        className="w-full px-2 py-1 border rounded mb-2"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) =>
                          updateItem("experience", exp._id, { company: e.target.value })
                        }
                      />
                    </div>

                    <button
                      className="text-indigo-600 text-sm ml-3"
                      onClick={async () => {
                        const improved = await simpleAI(
                          `Rewrite this resume experience bullet points to be more professional, 
                          result-oriented, and action-verb based: ${exp.desc}`
                        );
                        if (improved)
                          updateItem("experience", exp._id, { desc: improved });
                      }}
                    >
                      Improve
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="px-2 py-1 border rounded"
                      placeholder="Start"
                      value={exp.start}
                      onChange={(e) =>
                        updateItem("experience", exp._id, { start: e.target.value })
                      }
                    />
                    <input
                      className="px-2 py-1 border rounded"
                      placeholder="End"
                      value={exp.end}
                      onChange={(e) =>
                        updateItem("experience", exp._id, { end: e.target.value })
                      }
                    />
                  </div>

                  <ReactQuill
                    theme="snow"
                    value={exp.desc}
                    onChange={(v) => updateItem("experience", exp._id, { desc: v })}
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
                          updateItem("education", ed._id, { school: e.target.value })
                        }
                      />
                      <input
                        className="w-full px-2 py-1 border rounded mb-2"
                        placeholder="Degree"
                        value={ed.degree}
                        onChange={(e) =>
                          updateItem("education", ed._id, { degree: e.target.value })
                        }
                      />
                    </div>

                    <button
                      className="text-indigo-600 text-sm ml-3"
                      onClick={async () => {
                        const improved = await simpleAI(
                          `Polish this education description for resume clarity and professionalism: ${ed.desc}`
                        );
                        if (improved)
                          updateItem("education", ed._id, { desc: improved });
                      }}
                    >
                      Improve
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      className="px-2 py-1 border rounded"
                      placeholder="Start"
                      value={ed.start}
                      onChange={(e) =>
                        updateItem("education", ed._id, { start: e.target.value })
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
                    onChange={(v) => updateItem("education", ed._id, { desc: v })}
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
                      className="text-indigo-600 text-sm ml-3"
                      onClick={async () => {
                        const improved = await simpleAI(
                          `Improve this project description to sound technical, modern, and resume-ready: ${p.desc}`
                        );
                        if (improved)
                          updateItem("projects", p._id, { desc: improved });
                      }}
                    >
                      Improve
                    </button>
                  </div>

                  <ReactQuill
                    theme="snow"
                    value={p.desc}
                    onChange={(v) =>
                      updateItem("projects", p._id, { desc: v })
                    }
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
                      className="text-indigo-600 text-sm ml-3"
                      onClick={async () => {
                        const improved = await simpleAI(
                          `Rewrite this certification description for professionalism and clarity: ${c.desc}`
                        );
                        if (improved)
                          updateItem("certifications", c._id, {
                            desc: improved,
                          });
                      }}
                    >
                      Improve
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
              onClick={() =>
                onChange(skills.filter((_, idx) => idx !== i))
              }
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
