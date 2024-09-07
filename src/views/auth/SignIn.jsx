import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";
import ViewCover from "../../components/ViewCover";
import signInImage from "../../assets/images/sign-in.webp";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      if (response.data != false) {
        sessionStorage.setItem("UserID", response.data.UserID);
        sessionStorage.setItem(
          "Username",
          response.data.Name + " " + response.data.LastName
        );
        navigate("/home");
      }
      console.log(response.data);
    } catch (err) {
      console.log(err);
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
          <form className="mx-3" autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onChange={handleEmailChange}
                value={email}
                required
                maxLength="255"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={handlePasswordChange}
                value={password}
                required
                maxLength="255"
              />
            </div>
            <div className="mb-3 d-grid gap-2">
              <button className="btn btn-primary">Sign In</button>
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
