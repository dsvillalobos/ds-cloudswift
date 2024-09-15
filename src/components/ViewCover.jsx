import React from "react";

function ViewCover({ viewName, viewImage, viewDescription }) {
  return (
    <div className="text-center view-cover mb-3">
      <img loading="lazy" src={viewImage} alt={viewName} />
      <h3 className="serif fw-bold fs-2 mb-2">{viewName}</h3>
      <p className="small mx-3 mb-0">{viewDescription}</p>
    </div>
  );
}

export default ViewCover;
