import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import addLinkImage from "../../assets/images/add-link.webp";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import axios from "axios";

function AddLink() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const [linkName, setLinkName] = useState("");
  const [linkAddress, setLinkAddress] = useState("");
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

  function handleLinkNameChange(e) {
    setLinkName(e.target.value);
  }

  function handleLinkAddressChange(e) {
    setLinkAddress(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    addLink();
  }

  async function addLink() {
    try {
      const response = await axios.post(
        "http://192.168.1.15/ds-cloudswift-rest/api/links.php",
        { linkName, linkAddress, userId }
      );

      setLinkName("");
      setLinkAddress("");

      setMessage("The link has been added successfully.");
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
    } catch (err) {
      setMessage("DS CloudSwift couldn't add the link.");
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
            viewName="Add Link"
            viewImage={addLinkImage}
            viewDescription="Add links effortlessly to your collection for easy access anytime, anywhere."
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
                placeholder="Link Address:"
              />
              <label htmlFor="linkAddress" className="form-label">
                Link Address:
              </label>
            </div>
            <div className="mb-3 d-grid gap-2">
              <button className="btn btn-primary btn-sm">Add Link</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddLink;
