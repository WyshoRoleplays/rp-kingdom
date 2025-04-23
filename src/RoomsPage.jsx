// src/RoomsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './RoomsPage.css'; // You can style it later

function RoomsPage() {
  return (
    <div className="rooms-page">
      <h1>Available Chat Rooms</h1>
      <div className="room-list">
        <Link to="/rooms/general" className="room-link">
          General Chat
        </Link>
      </div>
    </div>
  );
}

export default RoomsPage;
