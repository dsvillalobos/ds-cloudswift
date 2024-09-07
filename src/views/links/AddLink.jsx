import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import addLinkImage from "../../assets/images/add-link.webp";
import axios from "axios";

function AddLink() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const [linkName, setLinkName] = useState("");
  const [linkAddress, setLinkAddress] = useState("");

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
            viewName="Add Link"
            viewImage={addLinkImage}
            viewDescription="Add links effortlessly to your collection for easy access anytime, anywhere."
          ></ViewCover>
          <form className="mx-3" autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="linkName" className="form-label">
                Link Name:
              </label>
              <input
                type="text"
                name="linkName"
                id="linkName"
                className="form-control"
                onChange={handleLinkNameChange}
                value={linkName}
                required
                maxLength="255"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="linkAddress" className="form-label">
                Link Address:
              </label>
              <input
                type="url"
                name="linkAddress"
                id="linkAddress"
                className="form-control"
                onChange={handleLinkAddressChange}
                value={linkAddress}
                required
              />
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
