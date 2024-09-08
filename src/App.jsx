import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";
import Home from "./views/Home";
import CloudSwiftAI from "./views/CloudSwiftAI";
import About from "./views/About";
import Files from "./views/files/Files";
import AddFile from "./views/files/AddFile";
import Links from "./views/links/Links";
import AddLink from "./views/links/AddLink";
import EditLink from "./views/links/EditLink";
import Notes from "./views/notes/Notes";
import AddNote from "./views/notes/AddNote";
import EditNote from "./views/notes/EditNote";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn></SignIn>}></Route>
        <Route path="/sign-up" element={<SignUp></SignUp>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/cloudswift-ai"
          element={<CloudSwiftAI></CloudSwiftAI>}
        ></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/files" element={<Files></Files>}></Route>
        <Route path="/add-file" element={<AddFile></AddFile>}></Route>
        <Route path="/links" element={<Links></Links>}></Route>
        <Route path="/add-link" element={<AddLink></AddLink>}></Route>
        <Route
          path="/edit-link/:linkId"
          element={<EditLink></EditLink>}
        ></Route>
        <Route path="/notes" element={<Notes></Notes>}></Route>
        <Route path="/add-note" element={<AddNote></AddNote>}></Route>
        <Route
          path="/edit-note/:noteId"
          element={<EditNote></EditNote>}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
