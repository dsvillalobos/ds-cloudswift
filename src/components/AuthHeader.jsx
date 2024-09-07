import React from "react";
import { Link } from "react-router-dom";

function AuthHeader() {
  return (
    <nav className="navbar navbar-dark bg-primary sticky-top mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-2" to="/">
          <i className="fa-solid fa-cloud-bolt px-1"></i>{" "}
          <span className="serif">DS CloudSwift</span>
        </Link>
      </div>
    </nav>
  );
}

export default AuthHeader;
