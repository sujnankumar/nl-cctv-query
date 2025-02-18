import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import Sidebar from "./Sidebar"; // Import the Sidebar component

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [cctvFile, setCctvFile] = useState(null);

  const handleSendMessage = () => {
    if (inputText.trim() === "") return;

    // Add user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputText, sender: "user", type: "text" },
    ]);

    // Simulate bot response (can vary with different types like text, image, etc.)
    setTimeout(() => {
      // You can alternate between text and media responses here
      const isImageResponse = 1; 

      if (isImageResponse) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Here is an image of CCTV footage.",
            sender: "bot",
            type: "image",
            content: "data:image/png;base64,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", // Replace with actual image URL
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "Here is a detailed response to your query regarding CCTV setup.",
            sender: "bot",
            type: "text",
          },
        ]);
      }
    }, 1000);

    // Clear input
    setInputText("");
  };

  const handleFileUpload = (event) => {
    setCctvFile(event.target.files[0]);
    alert(`File uploaded: ${event.target.files[0].name}`);
  };

  const renderMessage = (message) => {
    switch (message.type) {
      case "text":
        return <div>{message.text}</div>;
      case "image":
        return <img src={message.content} alt="CCTV" className="max-w-full rounded-lg" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col ml-0 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
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
          <h1 className="text-2xl font-bold ml-4 text-blue-400">AI to CCTV Query</h1>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg shadow-lg transition-all ${
                  message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
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

          {/* CCTV File Upload */}
          <div className="mt-4">
            <label
              htmlFor="cctv-upload"
              className="flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
            >
              <FaUpload className="mr-2" /> Upload CCTV Footage
            </label>
            <input
              id="cctv-upload"
              type="file"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
