// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import RoomsPage from "./RoomsPage";
import GeneralChatPage from "./GeneralChatPage";
import ProfilePage from "./ProfilePage"; // ⬅️ Add this line

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/rooms/general" element={<GeneralChatPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* ⬅️ Add this line */}
      </Routes>
    </Router>
  );
}

export default App;
