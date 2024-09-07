import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ViewCover from "../../components/ViewCover";
import axios from "axios";

function EditLink() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const { linkId } = useParams();
  const [linkName, setLinkName] = useState("");
  const [linkAddress, setLinkAddress] = useState("");

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
            viewName="Edit Link"
            viewDescription="Edit URLs with precision and ease, tailoring your collection to perfection."
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
              <button className="btn btn-primary btn-sm">Edit Link</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default EditLink;
