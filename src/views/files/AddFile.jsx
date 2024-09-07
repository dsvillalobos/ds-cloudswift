import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import addFileImage from "../../assets/images/add-file.webp";
import axios from "axios";

function AddFile() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const fileRef = useRef(null);

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
        "http://192.168.1.15/ds-cloudswift-rest/api/files.php",
        { fileName, file, userId },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      setFileName("");
      setFile(null);
      fileRef.current.value = "";
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
            viewName="Add File"
            viewImage={addFileImage}
            viewDescription="Easily upload and organize your files hassle-free. Add files to your cloud with a breeze!"
          ></ViewCover>
          <form className="mx-3" autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="fileName" className="form-label">
                File Name:
              </label>
              <input
                type="text"
                name="fileName"
                id="fileName"
                className="form-control"
                onChange={handleFileNameChange}
                value={fileName}
                required
                maxLength="255"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="form-label">
                File:
              </label>
              <input
                type="file"
                name="file"
                id="file"
                className="form-control"
                onChange={handleFileChange}
                ref={fileRef}
                required
              />
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
