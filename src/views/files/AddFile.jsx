import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import addFileImage from "../../assets/images/add-file.webp";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import axios from "axios";

function AddFile() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);
  const [message, setMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(
    function () {
      if (userId == null) {
        navigate("/");
      }
    },
    [userId, navigate]
  );

  function handleFileNameChange(e) {
    setFileName(e.target.value);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    addFile();
  }

  async function addFile() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DS_CLOUDSWIFT_API_URL}files.php`,
        { fileName, file, userId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFileName("");
      setFile(null);
      fileRef.current.value = "";

      setMessage("The file has been added successfully.");
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } catch (err) {
      setMessage("DS CloudSwift couldn't add the file.");
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  }

  return (
    <>
      <Header></Header>
      <main className="container">
        <div className="col-md-8 mx-auto">
          <ViewCover
            viewName="Add File"
            viewImage={addFileImage}
            viewDescription="Easily upload and organize your files hassle-free. Add files to your cloud with a breeze!"
          ></ViewCover>
          <div className="alert-container mx-3">
            {showSuccessAlert && (
              <SuccessAlert message={message}></SuccessAlert>
            )}
            {showErrorAlert && <ErrorAlert message={message}></ErrorAlert>}
          </div>
          <form className="mx-3" autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="mb-3 form-floating">
              <input
                type="text"
                name="fileName"
                id="fileName"
                className="form-control"
                onChange={handleFileNameChange}
                value={fileName}
                required
                maxLength="255"
                placeholder="File Name:"
              />
              <label htmlFor="fileName" className="form-label">
                File Name:
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="file"
                name="file"
                id="file"
                className="form-control form-control-sm"
                onChange={handleFileChange}
                ref={fileRef}
                required
                placeholder="File:"
              />
              <label htmlFor="file" className="form-label">
                File:
              </label>
              <span className="text-body-secondary small fst-italic">
                Max: 20 MB
              </span>
            </div>
            <div className="mb-3 d-grid gap-2">
              <button className="btn btn-primary btn-sm">Add File</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddFile;
