import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import editNoteImage from "../../assets/images/edit-note.webp";
import axios from "axios";

function EditNote() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const { noteId } = useParams();
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

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
        `http://192.168.1.15/ds-cloudswift-rest/api/notes.php/get-note/${noteId}`
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
        "http://192.168.1.15/ds-cloudswift-rest/api/notes.php",
        { noteId, noteTitle, noteBody }
      );
      console.log(response.data);
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
            viewName="Edit Note"
            viewImage={editNoteImage}
            viewDescription="Edit your notes effortlessly to keep your thoughts organized and refined."
          ></ViewCover>
          <form className="mx-3" autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="noteTitle" className="form-label">
                Note Title:
              </label>
              <input
                type="text"
                name="noteTitle"
                id="noteTitle"
                className="form-control"
                onChange={handleNoteTitleChange}
                value={noteTitle}
                required
                maxLength="255"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="noteBody" className="form-label">
                Note Body:
              </label>
              <textarea
                rows="5"
                name="noteBody"
                id="noteBody"
                className="form-control"
                onChange={handleNoteBodyChange}
                value={noteBody}
                required
              ></textarea>
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
