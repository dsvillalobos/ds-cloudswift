import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import addNoteImage from "../../assets/images/add-note.webp";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import axios from "axios";

function AddNote() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
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

  function handleNoteTitleChange(e) {
    setNoteTitle(e.target.value);
  }

  function handleNoteBodyChange(e) {
    setNoteBody(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    addNote();
  }

  async function addNote() {
    try {
      const response = await axios.post(
        "http://192.168.1.15/ds-cloudswift-rest/api/notes.php",
        { noteTitle, noteBody, userId }
      );

      setNoteTitle("");
      setNoteBody("");

      setMessage("The note has been added successfully.");
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } catch (err) {
      setMessage("DS CloudSwift couldn't add the note.");
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
            viewName="Add Note"
            viewImage={addNoteImage}
            viewDescription="Add notes seamlessly to your cloud repository for quick reference and organization."
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
                name="noteTitle"
                id="noteTitle"
                className="form-control"
                onChange={handleNoteTitleChange}
                value={noteTitle}
                required
                maxLength="255"
                placeholder="Note Title:"
              />
              <label htmlFor="noteTitle" className="form-label">
                Note Title:
              </label>
            </div>
            <div className="mb-3 form-floating">
              <textarea
                rows="5"
                name="noteBody"
                id="noteBody"
                className="form-control"
                onChange={handleNoteBodyChange}
                value={noteBody}
                required
                placeholder="Note Body:"
              ></textarea>
              <label htmlFor="noteBody" className="form-label">
                Note Body:
              </label>
            </div>
            <div className="mb-3 d-grid gap-2">
              <button className="btn btn-primary btn-sm">Add Note</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddNote;
