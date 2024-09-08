import React from "react";

function ErrorAlert({ message }) {
  return (
    <div className="alert alert-danger small" role="alert">
      <strong>Oops!</strong> {message}
    </div>
  );
}

export default ErrorAlert;
