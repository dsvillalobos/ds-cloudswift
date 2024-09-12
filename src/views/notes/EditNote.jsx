import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import editNoteImage from "../../assets/images/edit-note.webp";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import axios from "axios";

function EditNote() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const { noteId } = useParams();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(
    function () {
      if (userId == null) {
        navigate("/");
      } else {
        fetchNote();
      }
    },
    [userId, navigate]
  );

  async function fetchNote() {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DS_CLOUDSWIFT_API_URL
        }notes.php/get-note/${noteId}`
      );

      setNoteTitle(response.data.NoteTitle);
      setNoteBody(response.data.NoteBody);
    } catch (err) {
      console.log(err);
    }
  }

  function handleNoteTitleChange(e) {
    setNoteTitle(e.target.value);
  }

  function handleNoteBodyChange(e) {
    setNoteBody(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    editNote();
  }

  async function editNote() {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_DS_CLOUDSWIFT_API_URL}notes.php`,
        { noteId, noteTitle, noteBody }
      );

      setMessage("The note has been edited successfully.");
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } catch (err) {
      setMessage("DS CloudSwift couldn't edit the note.");
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
            viewName="Edit Note"
            viewImage={editNoteImage}
            viewDescription="Edit your notes effortlessly to keep your thoughts organized and refined."
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
              <button className="btn btn-primary btn-sm">Edit Note</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditNote;
