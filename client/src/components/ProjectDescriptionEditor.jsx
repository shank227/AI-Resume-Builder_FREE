import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function ProjectDescriptionEditor({ value, onChange }) {
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link'
  ];

  return (
    <div className="mt-2">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="Write your project description here..."
        className="bg-white rounded-md"
      />
    </div>
  );
}
