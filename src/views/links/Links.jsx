import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import linksImage from "../../assets/images/links.webp";
import axios from "axios";

function Links() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const [links, setLinks] = useState([]);

  useEffect(
    function () {
      if (userId == null) {
        navigate("/");
      } else {
        fetchLinks();
      }
    },
    [userId, navigate]
  );

  async function fetchLinks() {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DS_CLOUDSWIFT_API_URL
        }links.php/get-links/${userId}`
      );

      setLinks(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteLink(linkId) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DS_CLOUDSWIFT_API_URL}links.php/${linkId}`
      );

      fetchLinks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header></Header>
      <main className="container">
        <div className="col-md-8 mx-auto">
          <ViewCover
            viewName="Links"
            viewImage={linksImage}
            viewDescription="Browse your saved links with ease. Access your collection of URLs quickly and conveniently."
          ></ViewCover>
          <div className="d-grid gap-2 mx-3 mb-3">
            <Link
              className="btn btn-primary btn-sm text-decoration-none"
              to="/add-link"
            >
              <i className="fa-solid fa-plus px-1"></i> Add Link
            </Link>
          </div>
          <div className="accordion mx-3" id="accordionExample">
            {links.map((link) => (
              <div className="accordion-item" key={link.LinkID}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#accordion${link.LinkID}`}
                    aria-expanded="true"
                    aria-controls={`accordion${link.LinkID}`}
                  >
                    <h6 className="text-dark my-1">{link.LinkName}</h6>
                  </button>
                </h2>
                <div
                  id={`accordion${link.LinkID}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body py-0">
                    <div className="row text-center mb-3">
                      <div className="col-12">
                        <h6>Owner:</h6>
                        <span className="small">
                          {link.Name} {link.LastName}
                        </span>
                      </div>
                    </div>
                    <div className="row text-center mb-3">
                      <div className="col-6">
                        <h6>Date:</h6>
                        <span className="small">{link.Date}</span>
                      </div>
                      <div className="col-6">
                        <h6>Time:</h6>
                        <span className="small">{link.Time}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6 d-grid gap-2">
                        <Link
                          className="btn btn-secondary btn-sm"
                          to={`/edit-link/${link.LinkID}`}
                        >
                          <i className="fa-solid fa-pen-to-square px-1"></i>{" "}
                          Edit Link
                        </Link>
                      </div>
                      <div className="col-6 d-grid gap-2">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteLink(link.LinkID)}
                        >
                          <i className="fa-solid fa-trash-can px-1"></i> Delete
                        </button>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12 d-grid gap-2">
                        <a
                          className="btn btn-info btn-sm text-decoration-none"
                          target="_blank"
                          href={link.LinkAddress}
                        >
                          <i className="fa-solid fa-up-right-from-square px-1"></i>{" "}
                          Open Link
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Links;
