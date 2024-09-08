import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";
import ViewCover from "../../components/ViewCover";
import signInImage from "../../assets/images/sign-in.webp";
import ErrorAlert from "../../components/ErrorAlert";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    signIn();
  }

  async function signIn() {
    try {
      const response = await axios.post(
        "http://192.168.1.15/ds-cloudswift-rest/api/auth.php/sign-in",
        { email, password }
      );

      setEmail("");
      setPassword("");

      if (response.data != null) {
        sessionStorage.setItem("UserID", response.data.UserID);
        sessionStorage.setItem(
          "Username",
          response.data.Name + " " + response.data.LastName
        );
        navigate("/home");
      } else {
        setMessage("Wrong email or password. Try again.");
        setShowErrorAlert(true);
      }
    } catch (err) {
      setMessage("DS CloudSwift Sign In failed. Please try again.");
      setShowErrorAlert(true);
    }
  }

  return (
    <>
      <AuthHeader></AuthHeader>
      <main className="container">
        <div className="col-md-8 mx-auto">
          <ViewCover
            viewName="Sign In"
            viewImage={signInImage}
            viewDescription="Get started swiftly! Sign in to access your files, links, and notes securely."
          ></ViewCover>
          <div className="alert-container mx-3">
            {showErrorAlert && <ErrorAlert message={message}></ErrorAlert>}
          </div>
          <form className="mx-3" autoComplete="off" onSubmit={handleFormSubmit}>
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
                placeholder="Password:"
              />
              <label htmlFor="password" className="form-label">
                Password:
              </label>
            </div>
            <div className="mb-3 d-grid gap-2">
              <button className="btn btn-primary btn-sm">Sign In</button>
            </div>
            <div className="mb-3 text-center small">
              Don't have an account yet?{" "}
              <Link to="/sign-up" className="text-dark">
                Sign Up
              </Link>
              .
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default SignIn;
