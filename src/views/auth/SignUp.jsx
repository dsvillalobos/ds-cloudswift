import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader";
import ViewCover from "../../components/ViewCover";
import signUpImage from "../../assets/images/sign-up.webp";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        "http://192.168.1.15/ds-cloudswift-rest/api/auth.php/sign-up",
        { name, lastName, email, password }
      );
      setName("");
      setLastName("");
      setEmail("");
      setPassword("");
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
            viewName="Sign Up"
            viewImage={signUpImage}
            viewDescription="Join DS CloudSwift and unlock seamless file, link, and note management."
          ></ViewCover>
          <form className="mx-3" autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
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
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name:
              </label>
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
              />
            </div>
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
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters long"
              />
            </div>
            <div className="mb-3 d-grid gap-2">
              <button className="btn btn-primary">Sign Up</button>
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
