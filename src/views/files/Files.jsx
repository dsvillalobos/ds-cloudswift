import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import filesImage from "../../assets/images/files.webp";
import axios from "axios";

function Files() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const [files, setFiles] = useState([]);

  useEffect(
    function () {
      if (userId == null) {
        navigate("/");
      } else {
        fetchFiles();
      }
    },
    [userId, navigate]
  );

  async function fetchFiles() {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DS_CLOUDSWIFT_API_URL
        }files.php/get-files/${userId}`
      );

      setFiles(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleFileDownload(file) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DS_CLOUDSWIFT_API_URL}files.php/download-file/${
          file.FileID
        }`,
        {
          responseType: "blob",
        }
      );

      /*
      const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      const fileDownloadLink = document.createElement("a");
      fileDownloadLink.href = fileUrl;
      fileDownloadLink.setAttribute(
        "download",
        file.FileName + "." + file.FileType
      );
      document.body.appendChild(fileDownloadLink);
      fileDownloadLink.click();
      */
      const fileUrl = window.URL.createObjectURL(new Blob([response.data]));
      const fileDownloadLink = document.createElement("a");
      fileDownloadLink.href = fileUrl;
      fileDownloadLink.setAttribute("target", "_blank");
      document.body.appendChild(fileDownloadLink);
      fileDownloadLink.click();
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteFile(fileId) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DS_CLOUDSWIFT_API_URL}files.php/${fileId}`
      );

      fetchFiles();
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
            viewName="Files"
            viewImage={filesImage}
            viewDescription="Easily access and organize all your uploaded files in one convenient location."
          ></ViewCover>
          <div className="d-grid gap-2 mx-3 mb-3">
            <Link
              className="btn btn-primary btn-sm text-decoration-none"
              to="/add-file"
            >
              <i className="fa-solid fa-plus px-1"></i> Add File
            </Link>
          </div>
          <div className="accordion mx-3" id="accordionExample">
            {files.map((file) => (
              <div className="accordion-item" key={file.FileID}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#accordion${file.FileID}`}
                    aria-expanded="true"
                    aria-controls={`accordion${file.FileID}`}
                  >
                    <h6 className="text-dark my-1">{file.FileName}</h6>
                  </button>
                </h2>
                <div
                  id={`accordion${file.FileID}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body py-0">
                    <div className="row text-center mb-3">
                      <div className="col-6">
                        <h6>File Type:</h6>
                        <span className="small text-uppercase">
                          {file.FileType}
                        </span>
                      </div>
                      <div className="col-6">
                        <h6>Owner:</h6>
                        <span className="small">
                          {file.Name} {file.LastName}
                        </span>
                      </div>
                    </div>
                    <div className="row text-center mb-3">
                      <div className="col-6">
                        <h6>Date:</h6>
                        <span className="small">{file.Date}</span>
                      </div>
                      <div className="col-6">
                        <h6>Time:</h6>
                        <span className="small">{file.Time}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6 d-grid gap-2">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleFileDownload(file)}
                        >
                          <i className="fa-solid fa-download px-1"></i> Download
                        </button>
                      </div>
                      <div className="col-6 d-grid gap-2">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteFile(file.FileID)}
                        >
                          <i className="fa-solid fa-trash-can px-1"></i> Delete
                        </button>
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

export default Files;
