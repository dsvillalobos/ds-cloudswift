import React from "react";

function SuccessAlert({ message }) {
  return (
    <div className="alert alert-success small" role="alert">
      <strong>Success!</strong> {message}
    </div>
  );
}

export default SuccessAlert;
