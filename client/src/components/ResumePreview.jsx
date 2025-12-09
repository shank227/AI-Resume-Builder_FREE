import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import HarvardTemplate from "./templates/HarvardTemplate";

const ResumePreview = ({ data, template }) => {
  return (
    <div id="resume-print-area" className="bg-white w-full">
      {template === "harvard" ? (
        <HarvardTemplate data={data} />
      ) : (
        <ClassicTemplate data={data} />
      )}
    </div>
  );
};

export default ResumePreview;
