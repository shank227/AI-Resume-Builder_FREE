// // client/src/components/templates/ClassicTemplate.jsx

// import React from "react";

// const ClassicTemplate = ({ data, accentColor = "#3B82F6" }) => {
//   const p = data.personal_info || {};

//   return (
//     <div
//       className="p-6 text-gray-900"
//       style={{
//         fontFamily: "Inter, system-ui, sans-serif",
//         color: "#111",
//       }}
//     >
//       {/* Header */}
//       <div className="flex items-center gap-5">
//         <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow">
//           {p.image ? (
//             <img
//               src={
//                 typeof p.image === "string"
//                   ? p.image
//                   : URL.createObjectURL(p.image)
//               }
//               alt="avatar"
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="text-2xl font-bold text-gray-500">
//               {(p.fullName || "Y").slice(0, 1)}
//             </div>
//           )}
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold">{p.fullName || "Your Name"}</h1>
//           <p className="text-sm text-gray-600 mt-1">
//             {data.title || "Your Title"} • {p.location || ""}
//           </p>
//         </div>
//       </div>

//       {/* Summary */}
//       <div className="mt-6">
//         <div
//           className="pl-4 border-l-4"
//           style={{ borderColor: accentColor }}
//         >
//           <p className="text-sm text-gray-700 leading-relaxed">
//             {data.summary ||
//               "Write a short 2–3 sentence summary highlighting your strengths, goals, and value."}
//           </p>
//         </div>
//       </div>

//       {/* Contact + Skills */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div>
//           <h3 className="font-semibold text-sm mb-2">Contact</h3>
//           <p className="text-sm text-gray-700">{p.email || "email@example.com"}</p>
//           <p className="text-sm text-gray-700">{p.phone || "—"}</p>

//           <div className="flex flex-col gap-1 mt-2 text-sm">
//             {p.linkedin && (
//               <a
//                 href={p.linkedin}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-indigo-600 underline"
//               >
//                 LinkedIn
//               </a>
//             )}
//             {p.github && (
//               <a
//                 href={p.github}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-indigo-600 underline"
//               >
//                 GitHub
//               </a>
//             )}
//             {p.website && (
//               <a
//                 href={p.website}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="text-indigo-600 underline"
//               >
//                 Portfolio
//               </a>
//             )}
//           </div>
//         </div>

//         <div>
//           <h3 className="font-semibold text-sm mb-2">Skills</h3>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {data.skills?.length ? (
//               data.skills.map((s, i) => (
//                 <span
//                   key={i}
//                   className="px-2 py-1 bg-gray-100 rounded text-sm"
//                 >
//                   {s}
//                 </span>
//               ))
//             ) : (
//               <div className="text-sm text-gray-500 italic">
//                 Add skills in editor
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Experience */}
//       <div className="mt-8">
//         <h3 className="font-semibold text-md mb-3">Experience</h3>
//         <div className="space-y-4">
//           {data.experience?.length ? (
//             data.experience.map((e) => (
//               <div key={e._id}>
//                 <div className="flex justify-between items-baseline">
//                   <div>
//                     <p className="font-medium">{e.title}</p>
//                     <p className="text-sm text-gray-600">{e.company}</p>
//                   </div>
//                   <p className="text-sm text-gray-500">
//                     {e.start} — {e.end || "Present"}
//                   </p>
//                 </div>
//                 <p className="text-sm text-gray-700 mt-1 leading-relaxed">
//                   {e.desc}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500 italic">
//               No experience added yet
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Education */}
//       <div className="mt-8">
//         <h3 className="font-semibold text-md mb-3">Education</h3>
//         <div className="space-y-4 text-sm text-gray-700">
//           {data.education?.length ? (
//             data.education.map((ed) => (
//               <div key={ed._id}>
//                 <p className="font-medium">{ed.school}</p>
//                 <p className="text-gray-600">
//                   {ed.degree} • {ed.start} — {ed.end}
//                 </p>
//                 <p className="mt-1">{ed.desc}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500 italic">
//               No education added
//             </p>
//           )}
//         </div>
//       </div>

//       {/* Projects */}
//       <div className="mt-8">
//         <h3 className="font-semibold text-md mb-3">Projects</h3>
//         <div className="space-y-4 text-sm text-gray-700">
//           {data.projects?.length ? (
//             data.projects.map((p) => (
//               <div key={p._id}>
//                 {p.link ? (
//                   <a
//                     href={p.link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-medium text-indigo-600 underline"
//                   >
//                     {p.title}
//                   </a>
//                 ) : (
//                   <p className="font-medium">{p.title}</p>
//                 )}
//                 <p className="mt-1">{p.desc}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500 italic">No projects added</p>
//           )}
//         </div>
//       </div>

//       {/* Certifications */}
//       <div className="mt-8">
//         <h3 className="font-semibold text-md mb-3">Certifications</h3>
//         <div className="space-y-4 text-sm text-gray-700">
//           {data.certifications?.length ? (
//             data.certifications.map((c) => (
//               <div key={c._id}>
//                 {c.link ? (
//                   <a
//                     href={c.link}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="font-medium text-indigo-600 underline"
//                   >
//                     {c.title}
//                   </a>
//                 ) : (
//                   <p className="font-medium">{c.title}</p>
//                 )}
//                 <p className="text-gray-600">
//                   {c.issuer} • {c.date}
//                 </p>
//               </div>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500 italic">
//               No certifications added
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassicTemplate;


// client/src/components/templates/ClassicTemplate.jsx

import React from "react";

const ClassicTemplate = ({ data, accentColor = "#3B82F6" }) => {
  const p = data.personal_info || {};

  return (
    <div
      className="p-6 text-gray-900"
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#111",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center shadow">
          {p.image ? (
            <img
              src={
                typeof p.image === "string"
                  ? p.image
                  : URL.createObjectURL(p.image)
              }
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-2xl font-bold text-gray-500">
              {(p.fullName || "Y").slice(0, 1)}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{p.fullName || "Your Name"}</h1>
          <p className="text-sm text-gray-600 mt-1">
            {data.title || "Your Title"} • {p.location || ""}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6">
        <div
          className="pl-4 border-l-4"
          style={{ borderColor: accentColor }}
        >
          {data.summary ? (
            <div
              className="text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: data.summary }}
            />
          ) : (
            <p className="text-sm text-gray-700 leading-relaxed">
              Write a short 2–3 sentence summary highlighting your strengths, goals, and value.
            </p>
          )}
        </div>
      </div>

      {/* Contact + Skills */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-sm mb-2">Contact</h3>
          <p className="text-sm text-gray-700">{p.email || "email@example.com"}</p>
          <p className="text-sm text-gray-700">{p.phone || "—"}</p>

          <div className="flex flex-col gap-1 mt-2 text-sm">
            {p.linkedin && (
              <a href={p.linkedin} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                LinkedIn
              </a>
            )}
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                GitHub
              </a>
            )}
            {p.website && (
              <a href={p.website} target="_blank" rel="noreferrer" className="text-indigo-600 underline">
                Portfolio
              </a>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.skills?.length ? (
              data.skills.map((s, i) => (
                <span key={i} className="px-2 py-1 bg-gray-100 rounded text-sm">
                  {s}
                </span>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic">Add skills in editor</div>
            )}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mt-8">
        <h3 className="font-semibold text-md mb-3">Experience</h3>
        <div className="space-y-4">
          {data.experience?.length ? (
            data.experience.map((e) => (
              <div key={e._id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <p className="font-medium">{e.title}</p>
                    <p className="text-sm text-gray-600">{e.company}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {e.start} — {e.end || "Present"}
                  </p>
                </div>

                {e.desc ? (
                  <div
                    className="text-sm text-gray-700 mt-1 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: e.desc }}
                  />
                ) : null}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No experience added yet</p>
          )}
        </div>
      </div>

      {/* Education */}
      <div className="mt-8">
        <h3 className="font-semibold text-md mb-3">Education</h3>
        <div className="space-y-4 text-sm text-gray-700">
          {data.education?.length ? (
            data.education.map((ed) => (
              <div key={ed._id}>
                <p className="font-medium">{ed.school}</p>
                <p className="text-gray-600">{ed.degree} • {ed.start} — {ed.end}</p>

                {ed.desc && (
                  <div
                    className="mt-1"
                    dangerouslySetInnerHTML={{ __html: ed.desc }}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No education added</p>
          )}
        </div>
      </div>

      {/* Projects */}
      <div className="mt-8">
        <h3 className="font-semibold text-md mb-3">Projects</h3>
        <div className="space-y-4 text-sm text-gray-700">
          {data.projects?.length ? (
            data.projects.map((p) => (
              <div key={p._id}>
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noreferrer" className="font-medium text-indigo-600 underline">
                    {p.title}
                  </a>
                ) : (
                  <p className="font-medium">{p.title}</p>
                )}

                {p.desc && (
                  <div
                    className="mt-1"
                    dangerouslySetInnerHTML={{ __html: p.desc }}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No projects added</p>
          )}
        </div>
      </div>

      {/* Certifications */}
      <div className="mt-8">
        <h3 className="font-semibold text-md mb-3">Certifications</h3>
        <div className="space-y-4 text-sm text-gray-700">
          {data.certifications?.length ? (
            data.certifications.map((c) => (
              <div key={c._id}>
                {c.link ? (
                  <a href={c.link} target="_blank" rel="noreferrer" className="font-medium text-indigo-600 underline">
                    {c.title}
                  </a>
                ) : (
                  <p className="font-medium">{c.title}</p>
                )}

                <p className="text-gray-600">{c.issuer} • {c.date}</p>

                {c.desc && (
                  <div
                    className="mt-1"
                    dangerouslySetInnerHTML={{ __html: c.desc }}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No certifications added</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;
