// import React, { useRef, useState } from "react";
// import ClassicTemplate from "../components/templates/ClassicTemplate.jsx";
// import HarvardTemplate from "../components/templates/HarvardTemplate.jsx";
// import { useReactToPrint } from "react-to-print";

// const uid = () => Math.random().toString(36).slice(2, 9);

// /* ---------- Resume Preview Wrapper ---------- */
// const ResumePreview = React.forwardRef(({ data, accentColor }, ref) => {
//   return (
//     <div ref={ref} className="w-full bg-white">
//       {data.template === "classic" ? (
//         <ClassicTemplate data={data} accentColor={accentColor} />
//       ) : (
//         <HarvardTemplate data={data} accentColor={accentColor} />
//       )}
//     </div>
//   );
// });

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
//   const previewRef = useRef();

//   /* ---------- PDF Export (react-to-print) ---------- */
//   const handlePrint = useReactToPrint({
//     content: () => previewRef.current,
//     documentTitle: "Resume",
//   });

//   /* ---------- Resume Core State ---------- */
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
//   const setImage = (file) => setPI({ image: file || null });

//   /* ===========================================================
//       UI
//   ============================================================ */
//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4">

//         {/* ================= Header ================= */}
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-xl font-semibold">Resume Builder</h1>

//           <div className="flex gap-3">
//             <TemplateSelector
//               value={resume.template}
//               onChange={(t) => update("template", t)}
//             />

//             <button
//               className="px-4 py-2 bg-indigo-600 text-white rounded"
//               onClick={handlePrint}
//             >
//               Export PDF
//             </button>
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-12 gap-6">
//           {/* ================= Left - Editor ================= */}
//           <div className="lg:col-span-5 space-y-6">

//             {/* ================= PERSONAL INFO ================= */}
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
//                 type="email"
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

//               {/* Image */}
//               <p className="mt-3 mb-1 text-sm text-gray-600">Profile Photo</p>
//               <input
//                 type="file"
//                 ref={fileRef}
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />

//               {/* Links */}
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
//                 placeholder="Portfolio Website"
//                 value={resume.personal_info.website}
//                 onChange={(e) => setPI({ website: e.target.value })}
//               />
//             </div>

//             {/* ================= SUMMARY ================= */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm">
//               <h3 className="font-semibold mb-3">Professional Summary</h3>
//               <textarea
//                 rows={4}
//                 className="w-full px-3 py-2 border rounded"
//                 placeholder="Short professional summary..."
//                 value={resume.summary}
//                 onChange={(e) => update("summary", e.target.value)}
//               />
//             </div>

//             {/* ================= EXPERIENCE ================= */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm">
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
//                   <div key={exp._id} className="border p-3 rounded">

//                     <input
//                       className="w-full px-2 py-1 border rounded mb-2"
//                       placeholder="Role / Position"
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

//                     <textarea
//                       rows={2}
//                       className="mt-2 w-full px-2 py-1 border rounded"
//                       placeholder="Description"
//                       value={exp.desc}
//                       onChange={(e) =>
//                         updateItem("experience", exp._id, {
//                           desc: e.target.value,
//                         })
//                       }
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

//             {/* ================= EDUCATION ================= */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm">
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
//                   <div key={ed._id} className="border p-3 rounded">
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

//                     <textarea
//                       rows={2}
//                       className="mt-2 w-full px-2 py-1 border rounded"
//                       placeholder="Notes"
//                       value={ed.desc}
//                       onChange={(e) =>
//                         updateItem("education", ed._id, {
//                           desc: e.target.value,
//                         })
//                       }
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

//             {/* ================= PROJECTS ================= */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm">
//               <div className="flex justify-between">
//                 <h3 className="font-semibold">Projects</h3>

//                 <button
//                   className="text-indigo-600 text-sm"
//                   onClick={() =>
//                     add("projects", {
//                       title: "",
//                       link: "",
//                       desc: "",
//                     })
//                   }
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-3 mt-3">
//                 {resume.projects.map((p) => (
//                   <div key={p._id} className="border p-3 rounded">

//                     <input
//                       className="w-full px-2 py-1 border rounded mb-2"
//                       placeholder="Project Title"
//                       value={p.title}
//                       onChange={(e) =>
//                         updateItem("projects", p._id, {
//                           title: e.target.value,
//                         })
//                       }
//                     />

//                     <input
//                       className="w-full px-2 py-1 border rounded mb-2"
//                       placeholder="Project Link (URL)"
//                       value={p.link}
//                       onChange={(e) =>
//                         updateItem("projects", p._id, {
//                           link: e.target.value,
//                         })
//                       }
//                     />

//                     <textarea
//                       rows={2}
//                       className="mt-2 w-full px-2 py-1 border rounded"
//                       placeholder="Description"
//                       value={p.desc}
//                       onChange={(e) =>
//                         updateItem("projects", p._id, {
//                           desc: e.target.value,
//                         })
//                       }
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

//             {/* ================= CERTIFICATIONS ================= */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm">
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
//                     })
//                   }
//                 >
//                   + Add
//                 </button>
//               </div>

//               <div className="space-y-3 mt-3">
//                 {resume.certifications.map((c) => (
//                   <div key={c._id} className="border p-3 rounded">
//                     <input
//                       className="w-full px-2 py-1 border rounded mb-2"
//                       placeholder="Certification Title"
//                       value={c.title}
//                       onChange={(e) =>
//                         updateItem("certifications", c._id, {
//                           title: e.target.value,
//                         })
//                       }
//                     />

//                     <input
//                       className="w-full px-2 py-1 border rounded mb-2"
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

//             {/* ================= SKILLS ================= */}
//             <div className="bg-white p-5 rounded-lg border shadow-sm">
//               <h3 className="font-semibold mb-2">Skills</h3>
//               <SkillEditor
//                 skills={resume.skills}
//                 onChange={(s) => update("skills", s)}
//               />
//             </div>
//           </div>

//           {/* ================= RIGHT - PREVIEW ================= */}
//           <div className="lg:col-span-7">
//             <div
//               className="bg-white border rounded-xl shadow p-5"
//               ref={previewRef}
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
//     SKILLS COMPONENT
// =========================================================== */
// function SkillEditor({ skills, onChange }) {
//   const [val, setVal] = useState("");

//   const addSkill = () => {
//     if (!val.trim()) return;
//     onChange([...skills, val.trim()]);
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
//               onClick={() =>
//                 onChange(skills.filter((_, idx) => i !== idx))
//               }
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

import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import ClassicTemplate from "../components/templates/ClassicTemplate.jsx";
import HarvardTemplate from "../components/templates/HarvardTemplate.jsx";

const uid = () => Math.random().toString(36).slice(2, 9);

/* ---------- Resume Preview Wrapper ---------- */
const ResumePreview = React.forwardRef(({ data, accentColor }, ref) => {
  return (
    <div
      ref={ref}
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
});

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
  const previewRef = useRef(null);

  /* ---------- Export as Image ---------- */
  const exportAsImage = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      scale: 2, // high resolution
      useCORS: true,
      logging: false,
    });

    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "resume.png";
    link.click();
  };

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

  /* ---------- Helpers ---------- */
  const setPI = (patch) =>
    setResume((r) => ({
      ...r,
      personal_info: { ...r.personal_info, ...patch },
    }));

  const update = (k, v) => setResume((r) => ({ ...r, [k]: v }));

  const add = (key, obj) =>
    setResume((r) => ({
      ...r,
      [key]: [...r[key], { _id: uid(), ...obj }],
    }));

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

  const fileRef = useRef(null);
  const setImage = (f) => setPI({ image: f || null });

  /* ===========================================================
      UI
  ============================================================ */

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* ================= Header ================= */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">Resume Builder</h1>

          <div className="flex gap-3">
            <TemplateSelector
              value={resume.template}
              onChange={(t) => update("template", t)}
            />

            {/* EXPORT AS IMAGE */}
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded"
              onClick={exportAsImage}
            >
              Export Image
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">

          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-5 space-y-6">

            {/* PERSONAL INFO */}
            <div className="bg-white p-5 rounded-lg border shadow-sm">
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

              {/* IMAGE */}
              <p className="mt-3 text-sm text-gray-600">Profile Photo</p>
              <input
                type="file"
                ref={fileRef}
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />

              {/* LINKS */}
              <input
                className="mt-3 w-full px-3 py-2 border rounded"
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
            <div className="bg-white p-5 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-3">Professional Summary</h3>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border rounded"
                placeholder="Write a short summary..."
                value={resume.summary}
                onChange={(e) => update("summary", e.target.value)}
              />
            </div>

            {/* EXPERIENCE */}
            <div className="bg-white p-5 rounded-lg border shadow-sm">
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

              <div className="space-y-3 mt-3">
                {resume.experience.map((exp) => (
                  <div key={exp._id} className="border p-3 rounded">

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
                          updateItem("experience", exp._id, { end: e.target.value })
                        }
                      />
                    </div>

                    <textarea
                      className="mt-2 w-full px-2 py-1 border rounded"
                      rows={2}
                      placeholder="Description"
                      value={exp.desc}
                      onChange={(e) =>
                        updateItem("experience", exp._id, { desc: e.target.value })
                      }
                    />

                    <button
                      className="mt-2 text-red-600 text-sm"
                      onClick={() => remove("experience", exp._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* EDUCATION */}
            <div className="bg-white p-5 rounded-lg border shadow-sm">
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

              <div className="space-y-3 mt-3">
                {resume.education.map((ed) => (
                  <div key={ed._id} className="border p-3 rounded">
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

                    <textarea
                      rows={2}
                      className="mt-2 w-full px-2 py-1 border rounded"
                      placeholder="Notes"
                      value={ed.desc}
                      onChange={(e) =>
                        updateItem("education", ed._id, { desc: e.target.value })
                      }
                    />

                    <button
                      className="mt-2 text-red-600 text-sm"
                      onClick={() => remove("education", ed._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* PROJECTS */}
            <div className="bg-white p-5 rounded-lg border shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">Projects</h3>

                <button
                  className="text-indigo-600 text-sm"
                  onClick={() =>
                    add("projects", {
                      title: "",
                      link: "",
                      desc: "",
                    })
                  }
                >
                  + Add
                </button>
              </div>

              <div className="space-y-3 mt-3">
                {resume.projects.map((p) => (
                  <div key={p._id} className="border p-3 rounded">

                    <input
                      className="mb-2 w-full px-2 py-1 border rounded"
                      placeholder="Project Title"
                      value={p.title}
                      onChange={(e) =>
                        updateItem("projects", p._id, { title: e.target.value })
                      }
                    />

                    <input
                      className="mb-2 w-full px-2 py-1 border rounded"
                      placeholder="Project Link"
                      value={p.link}
                      onChange={(e) =>
                        updateItem("projects", p._id, { link: e.target.value })
                      }
                    />

                    <textarea
                      rows={2}
                      className="mt-2 w-full px-2 py-1 border rounded"
                      placeholder="Description"
                      value={p.desc}
                      onChange={(e) =>
                        updateItem("projects", p._id, { desc: e.target.value })
                      }
                    />

                    <button
                      className="mt-2 text-red-600 text-sm"
                      onClick={() => remove("projects", p._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CERTIFICATIONS */}
            <div className="bg-white p-5 rounded-lg border shadow-sm">
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
                    })
                  }
                >
                  + Add
                </button>
              </div>

              <div className="space-y-3 mt-3">
                {resume.certifications.map((c) => (
                  <div key={c._id} className="border p-3 rounded">

                    <input
                      className="mb-2 w-full px-2 py-1 border rounded"
                      placeholder="Certification Title"
                      value={c.title}
                      onChange={(e) =>
                        updateItem("certifications", c._id, { title: e.target.value })
                      }
                    />

                    <input
                      className="mb-2 w-full px-2 py-1 border rounded"
                      placeholder="Issuer"
                      value={c.issuer}
                      onChange={(e) =>
                        updateItem("certifications", c._id, { issuer: e.target.value })
                      }
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <input
                        className="px-2 py-1 border rounded"
                        placeholder="Year"
                        value={c.date}
                        onChange={(e) =>
                          updateItem("certifications", c._id, { date: e.target.value })
                        }
                      />

                      <input
                        className="px-2 py-1 border rounded"
                        placeholder="Certificate Link"
                        value={c.link}
                        onChange={(e) =>
                          updateItem("certifications", c._id, { link: e.target.value })
                        }
                      />
                    </div>

                    <button
                      className="mt-2 text-red-600 text-sm"
                      onClick={() => remove("certifications", c._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SKILLS */}
            <div className="bg-white p-5 rounded-lg border shadow-sm">
              <h3 className="font-semibold mb-2">Skills</h3>
              <SkillEditor
                skills={resume.skills}
                onChange={(s) => update("skills", s)}
              />
            </div>

          </div>

          {/* ================= RIGHT COLUMN — PREVIEW ================= */}
          <div className="lg:col-span-7">
            <div className="bg-white border rounded-xl shadow p-5">
              <ResumePreview
                ref={previewRef}
                data={resume}
                accentColor="#3B82F6"
              />
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

