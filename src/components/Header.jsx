import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-2" to="/home">
          <i className="fa-solid fa-cloud-bolt px-1"></i>{" "}
          <span className="serif">DS CloudSwift</span>
        </Link>
        <button
          className="navbar-toggler border-0 fs-3"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fa-solid fa-bars text-light"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" to="/home">
                <i className="fa-solid fa-house mx-1"></i> Home
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" to="/files">
                <i className="fa-solid fa-file mx-1"></i> Files
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" to="/links">
                <i className="fa-solid fa-link mx-1"></i> Links
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" to="/notes">
                <i className="fa-solid fa-note-sticky mx-1"></i> Notes
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" to="/about">
                <i className="fa-solid fa-circle-info mx-1"></i> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
