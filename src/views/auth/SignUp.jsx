import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";
import ViewCover from "../../components/ViewCover";
import signUpImage from "../../assets/images/sign-up.webp";
import SuccessAlert from "../../components/SuccessAlert";
import ErrorAlert from "../../components/ErrorAlert";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    signUp();
  }

  async function signUp() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_DS_CLOUDSWIFT_API_URL}auth.php/sign-up`,
        { name, lastName, email, password }
      );

      setName("");
      setLastName("");
      setEmail("");
      setPassword("");

      if (response.data[0] == "E") {
        setMessage(
          <>
            That email address is already taken. Try to{" "}
            <a className="alert-link" href="/">
              Sign In
            </a>
            .
          </>
        );
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
      } else {
        setMessage(
          <>
            Please proceed to{" "}
            <a className="alert-link" href="/">
              Sign In
            </a>
            .
          </>
        );
        setShowSuccessAlert(true);
        setShowErrorAlert(false);
      }
    } catch (err) {
      setMessage("DS CloudSwift Sign Up failed. Please try again.");
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
    }
  }

  return (
    <>
      <AuthHeader></AuthHeader>
      <main className="container">
        <div className="col-md-8 mx-auto">
          <ViewCover
            viewName="Sign Up"
            viewImage={signUpImage}
            viewDescription="Join DS CloudSwift and unlock seamless file, link, and note management."
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
                name="name"
                id="name"
                className="form-control"
                onChange={handleNameChange}
                value={name}
                required
                maxLength="255"
                pattern="^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$"
                title="Please enter a valid name (letters only, no numbers or special characters)"
                placeholder="Name:"
              />
              <label htmlFor="name" className="form-label">
                Name:
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="form-control"
                onChange={handleLastNameChange}
                value={lastName}
                required
                maxLength="255"
                pattern="^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$"
                title="Please enter a valid last name (letters only, no numbers or special characters)"
                placeholder="Last Name:"
              />
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={handleEmailChange}
                value={email}
                required
                maxLength="255"
                placeholder="Email:"
              />
              <label htmlFor="email" className="form-label">
                Email:
              </label>
            </div>
            <div className="mb-3 form-floating">
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={handlePasswordChange}
                value={password}
                required
                maxLength="255"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long"
                placeholder="Password:"
              />
              <label htmlFor="password" className="form-label">
                Password:
              </label>
            </div>
            <div className="mb-3 d-grid gap-2">
              <button className="btn btn-primary btn-sm">Sign Up</button>
            </div>
            <div className="mb-3 text-center small">
              Already have an account?{" "}
              <Link to="/" className="text-dark">
                Sign In
              </Link>
              .
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default SignUp;
