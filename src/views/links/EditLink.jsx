import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import editLinkImage from "../../assets/images/edit-link.webp";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import axios from "axios";

function EditLink() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const { linkId } = useParams();
  const [linkName, setLinkName] = useState("");
  const [linkAddress, setLinkAddress] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(
    function () {
      if (userId == null) {
        navigate("/");
      } else {
        fetchLink();
      }
    },
    [userId, navigate]
  );

  async function fetchLink() {
    try {
      const response = await axios.get(
        `http://192.168.1.15/ds-cloudswift-rest/api/links.php/get-link/${linkId}`
      );

      setLinkName(response.data.LinkName);
      setLinkAddress(response.data.LinkAddress);
    } catch (err) {
      console.log(err);
    }
  }

  function handleLinkNameChange(e) {
    setLinkName(e.target.value);
  }

  function handleLinkAddressChange(e) {
    setLinkAddress(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    editLink();
  }

  async function editLink() {
    try {
      const response = await axios.put(
        "http://192.168.1.15/ds-cloudswift-rest/api/links.php",
        { linkId, linkName, linkAddress }
      );

      setMessage("The link has been edited successfully.");
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } catch (err) {
      setMessage("DS CloudSwift couldn't edit the link.");
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
            viewName="Edit Link"
            viewImage={editLinkImage}
            viewDescription="Edit URLs with precision and ease, tailoring your collection to perfection."
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
                name="linkName"
                id="linkName"
                className="form-control"
                onChange={handleLinkNameChange}
                value={linkName}
                required
                maxLength="255"
                placeholder="Link Name:"
              />
              <label htmlFor="linkName" className="form-label">
                Link Name:
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="url"
                name="linkAddress"
                id="linkAddress"
                className="form-control"
                onChange={handleLinkAddressChange}
                value={linkAddress}
                required
                placeholder="Link Address"
              />
              <label htmlFor="linkAddress" className="form-label">
                Link Address:
              </label>
            </div>
            <div className="mb-3 d-grid gap-2">
              <button className="btn btn-primary btn-sm">Edit Link</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditLink;
