import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cctvFile, setCctvFile] = useState(null);
  const [isUploadScreen, setIsUploadScreen] = useState(false);

  // Send query to Flask backend and process the response
  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    // Add the user's message to the chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", type: "text" },
    ]);

    try {
      const response = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // Check if a video response is provided
      if (data.video) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Here is your video response:",
            sender: "bot",
            type: "video",
            content: data.video,
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "No video response from server.",
            sender: "bot",
            type: "text",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching server response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Error fetching response. Please try again later.",
          sender: "bot",
          type: "text",
        },
      ]);
    }

    // Clear the input field
    setInputText("");
  };

  // Handle file upload (video) to Flask backend
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setCctvFile(file);

      // Prepare the file to be sent to the Flask backend
      const formData = new FormData();
      formData.append("video", file);

      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Server response:", data);
        alert(`File uploaded: ${file.name}`);
        // After successful upload, return to the chat screen
        setIsUploadScreen(false);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file. Please try again.");
      }
    }
  };

  // Render messages based on type: text, image, or video
  const renderMessage = (message) => {
    switch (message.type) {
      case "text":
        return <div>{message.text}</div>;
      case "image":
        return (
          <img
            src={message.content}
            alt="CCTV"
            className="max-w-full rounded-lg"
          />
        );
      case "video":
        return (
          <video controls className="max-w-full rounded-lg">
            <source src={message.content} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {isUploadScreen ? (
          // Upload Screen
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-blue-400 mb-4">
              Upload CCTV Footage
            </h1>
            <label
              htmlFor="cctv-upload"
              className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
            >
              <FaUpload className="mr-2" /> Upload Video
            </label>
            <input
              id="cctv-upload"
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              onClick={() => setIsUploadScreen(false)}
            >
              Back to Chat
            </button>
          </div>
        ) : (
          // Chat Interface
          <>
            {/* Chat Header */}
            <header className="p-4 bg-gray-800 shadow-md flex items-center justify-between">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 hover:bg-gray-700 rounded-lg focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1
                className="text-2xl font-bold ml-4 text-blue-400 cursor-pointer"
                onClick={() => setIsUploadScreen(true)}
              >
                AI to CCTV Query
              </h1>
            </header>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg shadow-lg transition-all ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    {renderMessage(message)}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <div className="flex gap-4 items-center">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask about CCTV footage..."
                  className="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Send
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
