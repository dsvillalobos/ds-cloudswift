import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import notesImage from "../../assets/images/notes.webp";
import axios from "axios";

function Notes() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const [notes, setNotes] = useState([]);

  useEffect(
    function () {
      if (userId == null) {
        navigate("/");
      } else {
        fetchNotes();
      }
    },
    [userId, navigate]
  );

  async function fetchNotes() {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DS_CLOUDSWIFT_API_URL
        }notes.php/get-notes/${userId}`
      );

      setNotes(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteNote(noteId) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_DS_CLOUDSWIFT_API_URL}notes.php/${noteId}`
      );

      fetchNotes();
    } catch (err) {
      console.log(err);
    }
  }

  function openModal(note) {
    const modalElement = document.getElementById(`noteModal${note.NoteID}`);
    if (modalElement) {
      const bootstrapModal = new window.bootstrap.Modal(modalElement);
      bootstrapModal.show();
    }
  }

  return (
    <>
      <Header></Header>
      <main className="container">
        <div className="col-md-8 mx-auto">
          <ViewCover
            viewName="Notes"
            viewImage={notesImage}
            viewDescription="Your digital notepad awaits! Access and manage all your saved notes effortlessly in one central hub."
          ></ViewCover>
          <div className="d-grid gap-2 mx-3 mb-3">
            <Link
              className="btn btn-primary btn-sm text-decoration-none"
              to="/add-note"
            >
              <i className="fa-solid fa-plus px-1"></i> Add Note
            </Link>
          </div>
          <div className="accordion mx-3" id="accordionExample">
            {notes.map((note) => (
              <div className="accordion-item" key={note.NoteID}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#accordion${note.NoteID}`}
                    aria-expanded="true"
                    aria-controls={`accordion${note.NoteID}`}
                  >
                    <h6 className="text-dark my-1">{note.NoteTitle}</h6>
                  </button>
                </h2>
                <div
                  id={`accordion${note.NoteID}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body py-0">
                    <div className="row text-center mb-3">
                      <div className="col-12">
                        <h6>Owner:</h6>
                        <span className="small">
                          {note.Name} {note.LastName}
                        </span>
                      </div>
                    </div>
                    <div className="row text-center mb-3">
                      <div className="col-6">
                        <h6>Date:</h6>
                        <span className="small">{note.Date}</span>
                      </div>
                      <div className="col-6">
                        <h6>Time:</h6>
                        <span className="small">{note.Time}</span>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6 d-grid gap-2">
                        <Link
                          className="btn btn-secondary btn-sm"
                          to={`/edit-note/${note.NoteID}`}
                        >
                          <i className="fa-solid fa-pen-to-square px-1"></i>{" "}
                          Edit Note
                        </Link>
                      </div>
                      <div className="col-6 d-grid gap-2">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteNote(note.NoteID)}
                        >
                          <i className="fa-solid fa-trash-can px-1"></i> Delete
                        </button>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12 d-grid gap-2">
                        <button
                          className="btn btn-info btn-sm"
                          onClick={() => openModal(note)}
                        >
                          <i className="fa-solid fa-up-right-from-square px-1"></i>{" "}
                          Open Note
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade"
                  id={`noteModal${note.NoteID}`}
                  tabIndex="-1"
                  aria-labelledby={`noteModalLabel${note.NoteID}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title"
                          id={`noteModalLabel${note.NoteID}`}
                        >
                          {note.NoteTitle}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <textarea
                          className="form-control"
                          value={note.NoteBody}
                          readOnly
                          rows="15"
                        ></textarea>
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

export default Notes;
