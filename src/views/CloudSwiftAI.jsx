import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ViewCover from "../components/ViewCover";
import cloudSwiftAIImage from "../assets/images/cloudswift-ai.webp";
import axios from "axios";

function CloudSwiftAI() {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("UserID");
  const username = sessionStorage.getItem("Username");
  const [messages, setMessages] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [showChatContainer, setShowChatContainer] = useState(false);
  const VITE_CLOUDSWIFT_AI_API_KEY = import.meta.env.VITE_CLOUDSWIFT_AI_API_KEY;

  useEffect(
    function () {
      if (userId == null) {
        navigate("/");
      }
    },
    [userId, navigate]
  );

  function handleUserPromptChange(e) {
    setUserPrompt(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  async function sendMessage() {
    try {
      setShowChatContainer(true);
      setMessages(function (prevMessages) {
        return [...prevMessages, { role: "user", content: userPrompt }];
      });

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            ...messages,
            {
              role: "user",
              content: userPrompt,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${VITE_CLOUDSWIFT_AI_API_KEY}`,
          },
        }
      );

      const cloudSwiftAIMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };
      setMessages(function (prevMessages) {
        return [...prevMessages, cloudSwiftAIMessage];
      });

      setUserPrompt("");
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
            viewName="CloudSwift AI"
            viewImage={cloudSwiftAIImage}
            viewDescription={
              <>
                Hello <span className="fw-bold">{username}</span>, how can I
                help you today?
              </>
            }
          ></ViewCover>
          {showChatContainer && (
            <div className="mx-3 mb-4 pt-3 cloudswift-ai-chat-container">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={
                    message.role == "user"
                      ? "mb-2 small text-end"
                      : "mb-2 small text-start"
                  }
                >
                  <div
                    className={`d-inline-block p-2 rounded ${
                      message.role == "user"
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}
                    style={{ maxWidth: "75%" }}
                  >
                    <p className="mb-0">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <form
            className="mx-3 pt-2"
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            <div className="mb-3 form-floating">
              <input
                type="text"
                name="userPrompt"
                id="userPrompt"
                className="form-control"
                onChange={handleUserPromptChange}
                value={userPrompt}
                required
                maxLength="255"
                placeholder="Type your Message:"
              />
              <label htmlFor="userPrompt" className="form-label">
                Type your Message:
              </label>
            </div>
            <div className="mb-3 d-grid gap-2">
              <button className="btn btn-primary btn-sm">Send</button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default CloudSwiftAI;
