import React from "react";

export default function HarvardTemplate({ data, accentColor = "#111827" }) {
  const p = data.personal_info || {};

  const link = (url, label) =>
    url ? (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-indigo-600 underline"
      >
        {label}
      </a>
    ) : null;

  return (
    <div
      className="p-8 text-[13px] leading-relaxed"
      style={{ fontFamily: "Georgia, serif", color: "#111" }}
    >
      {/* ================= HEADER ================= */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold tracking-wide">{p.fullName || "Your Name"}</h1>
        <div className="mt-1 text-[13px] text-gray-700">
          {data.title || "Your Title"} • {p.location || ""}
        </div>

        {/* Contact Line */}
        <div className="flex flex-wrap justify-center gap-x-3 mt-2 text-gray-700">
          {p.email && <span>{p.email}</span>}
          {p.phone && <span>• {p.phone}</span>}
        </div>

        {/* Embedded Profile Links */}
        <div className="flex flex-wrap justify-center gap-x-3 mt-1 text-[13px]">
          {link(p.linkedin, "LinkedIn")}
          {p.linkedin && (p.github || p.website) && <span>•</span>}

          {link(p.github, "GitHub")}
          {p.github && p.website && <span>•</span>}

          {link(p.website, "Portfolio")}
        </div>
      </div>

      {/* thin divider */}
      <hr className="border-gray-300 my-4" />

      {/* ================= SUMMARY ================= */}
      {data.summary && (
        <section className="mb-5">
          <h2
            className="font-semibold text-[14px] mb-1"
            style={{ color: accentColor }}
          >
            SUMMARY
          </h2>
          <p>{data.summary}</p>
        </section>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education?.length > 0 && (
        <section className="mb-5">
          <h2
            className="font-semibold text-[14px] mb-2"
            style={{ color: accentColor }}
          >
            EDUCATION
          </h2>

          {data.education.map((ed) => (
            <div key={ed._id} className="mb-2">
              <div className="flex justify-between">
                <span className="font-semibold">{ed.school}</span>
                <span className="text-gray-600 text-[12px]">
                  {ed.start} – {ed.end}
                </span>
              </div>
              <div className="italic text-gray-700">{ed.degree}</div>
              {ed.desc && (
                <p className="mt-1 text-gray-700 text-[13px]">{ed.desc}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ================= EXPERIENCE ================= */}
      {data.experience?.length > 0 && (
        <section className="mb-5">
          <h2
            className="font-semibold text-[14px] mb-2"
            style={{ color: accentColor }}
          >
            EXPERIENCE
          </h2>

          {data.experience.map((ex) => (
            <div key={ex._id} className="mb-3">
              <div className="flex justify-between">
                <span className="font-semibold">
                  {ex.title} — {ex.company}
                </span>
                <span className="text-gray-600 text-[12px]">
                  {ex.start} – {ex.end || "Present"}
                </span>
              </div>
              {ex.desc && <p className="mt-1">{ex.desc}</p>}
            </div>
          ))}
        </section>
      )}

      {/* ================= PROJECTS ================= */}
      {data.projects?.length > 0 && (
        <section className="mb-5">
          <h2
            className="font-semibold text-[14px] mb-2"
            style={{ color: accentColor }}
          >
            PROJECTS
          </h2>

          {data.projects.map((p) => (
            <div key={p._id} className="mb-2">
              {p.link ? (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-indigo-600 underline"
                >
                  {p.title}
                </a>
              ) : (
                <span className="font-semibold">{p.title}</span>
              )}

              {p.desc && (
                <p className="mt-1 text-gray-700 text-[13px]">{p.desc}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* ================= CERTIFICATIONS ================= */}
      {data.certifications?.length > 0 && (
        <section className="mb-5">
          <h2
            className="font-semibold text-[14px] mb-2"
            style={{ color: accentColor }}
          >
            CERTIFICATIONS
          </h2>

          {data.certifications.map((c) => (
            <div key={c._id} className="mb-2">
              {c.link ? (
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-indigo-600 underline"
                >
                  {c.title}
                </a>
              ) : (
                <span className="font-semibold">{c.title}</span>
              )}

              <div className="text-gray-600 text-[12px]">
                {c.issuer} • {c.date}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills?.length > 0 && (
        <section>
          <h2
            className="font-semibold text-[14px] mb-2"
            style={{ color: accentColor }}
          >
            SKILLS
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 rounded text-[12px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
