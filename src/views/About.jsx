import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ViewCover from "../components/ViewCover";
import aboutImage from "../assets/images/about.webp";

function About() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");

  useEffect(
    function () {
      if (userId == null) {
        navigate("/");
      }
    },
    [userId, navigate]
  );

  return (
    <>
      <Header></Header>
      <main className="container">
        <div className="col-md-8 mx-auto">
          <ViewCover
            viewName="About"
            viewImage={aboutImage}
            viewDescription="Discover the essence of DS CloudSwift."
          ></ViewCover>
          <ul className="mx-3 list-group list-group-flush rounded">
            <li className="list-group-item">
              <span className="fw-bold">Created by</span> @dsvillalobos
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Version</span> 2.0.12
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Help & Privacy</span>
              <ul>
                <li className="mb-1">
                  <a className="text-dark" href="">
                    Help Center
                  </a>
                </li>
                <li className="mb-1">
                  <a className="text-dark" href="">
                    Data Security
                  </a>
                </li>
              </ul>
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Follow Me</span>
              <a
                className="text-dark mx-2 fs-5"
                href="https://www.instagram.com/dsvillalobosss/"
                target="_blank"
              >
                <i className="fa-brands fa-instagram px-1"></i>
              </a>
              <a
                className="text-dark mx-2 fs-5"
                href="https://x.com/dsvillalobosss"
                target="_blank"
              >
                <i className="fa-brands fa-x-twitter px-1"></i>
              </a>
              <a
                className="text-dark mx-2 fs-5"
                href="https://www.threads.net/@dsvillalobosss"
                target="_blank"
              >
                <i className="fa-brands fa-threads px-1"></i>
              </a>
              <a
                className="text-dark mx-2 fs-5"
                href="https://github.com/dsvillalobos"
                target="_blank"
              >
                <i className="fa-brands fa-github px-1"></i>
              </a>
            </li>
            <li className="list-group-item">
              <span className="fw-bold">Copyright</span> © 2024 dsvillalobos
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}

export default About;
