import React, { useState, useEffect } from "react";

export default function SkillEditor({ skills = [], onChange }) {
  const [val, setVal] = useState("");

  useEffect(() => setVal(""), [skills.length]);

  const add = () => {
    if (!val.trim()) return;
    onChange([...skills, val.trim()]);
    setVal("");
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Add a skill"
          className="flex-1 px-2 py-1 border rounded"
        />
        <button onClick={add} className="px-3 py-1 border rounded">
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {skills.map((s, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-gray-100 rounded flex items-center gap-2"
          >
            {s}
            <button
              className="text-xs text-red-500"
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
