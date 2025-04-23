// ✅ PM Docking System for Minimized Windows

import React, { useState, useEffect, useRef } from "react";
import { Howl } from 'howler';
import "./ChatRoom.css";

const currentUser = {
  name: "Wysho",
  avatar: "https://i.imgur.com/your-avatar.png",
  bio: "An enigmatic swordsman known for his control over shadowflame.",
};

const otherUser = {
  name: "Kael",
  avatar: "https://i.imgur.com/sample-avatar.png",
  bio: "A grizzled bounty hunter with a soft spot for strays.",
};

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [bioPopup, setBioPopup] = useState(null);
  const [openPMs, setOpenPMs] = useState([]);
  const [privateMessages, setPrivateMessages] = useState(() => {
    const saved = localStorage.getItem("privateMessages");
    return saved ? JSON.parse(saved) : {};
  });
  const [pmInputs, setPmInputs] = useState({});
  const [pmPositions, setPmPositions] = useState({});
  const [minimizedPMs, setMinimizedPMs] = useState([]);
  const [hoveredProfile, setHoveredProfile] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const messagesEndRef = useRef(null);
  const messagesRef = useRef(null);
  const pmRefs = useRef({});

  const availableReactions = ["👍", "❤️", "😈", "😢", "🔥"];

  const playSound = (type) => {
    if (!soundEnabled) return;

    const sounds = {
      message: new Howl({ src: ["/sounds/message.mp3", "/sounds/message.wav"], volume: 1.0 }),
      mention: new Howl({ src: ["/sounds/mention.mp3", "/sounds/mention.wav"], volume: 1.0 }),
      private: new Howl({ src: ["/sounds/private.mp3", "/sounds/private.wav"], volume: 1.0 }),
    };

    sounds[type]?.play();
    console.log("Sound played:", type, sounds[type]);
  };

  const testSound = () => {
    new Howl({
      src: ["/sounds/message.mp3", "/sounds/message.wav"],
      volume: 1.0
    }).play();
  };

  useEffect(() => {
    const el = messagesRef.current;
    const onScroll = () => {
      if (el.scrollHeight - el.scrollTop === el.clientHeight) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    localStorage.setItem("privateMessages", JSON.stringify(privateMessages));
  }, [privateMessages]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;
      setPmPositions((prev) => ({
        ...prev,
        [dragging]: {
          x: e.clientX - 150,
          y: e.clientY - 20,
        },
      }));
    };
    const handleMouseUp = () => setDragging(null);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  const handleSend = () => {
    if (input.trim() === "") return;
    const sender = messages.length % 2 === 0 ? currentUser : otherUser;
    const newMessage = {
      text: input.trim(),
      avatar: sender.avatar,
      name: sender.name,
      self: sender.name === currentUser.name,
      bio: sender.bio,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: [],
    };
    setMessages([...messages, newMessage]);
    setInput("");
    const isMention = input.includes("@" + currentUser.name);
    playSound(isMention ? "mention" : "message");
  };

  return (
    <div className="chatroom-container">
      <h2 className="room-title">General Chat</h2>

      <button onClick={testSound} style={{ margin: "1rem", padding: "0.5rem" }}>
        🔊 Test Notification Sound
      </button>

      <div className="chat-window">
        <div className="chat-messages" ref={messagesRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.self ? "self" : "other"}`}>
              <div className="avatar-block">
                <img src={msg.avatar} alt="avatar" className="avatar" />
                <div className="avatar-labels">
                  <div className="avatar-name">{msg.name}</div>
                  <div className="timestamp">{msg.timestamp}</div>
                </div>
              </div>
              <div className="bubble">
                <div className="message-content">{msg.text}</div>
                <div className="reactions">
                  {msg.reactions.map((r, i) => (
                    <span key={i}>{r}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message..."
          />
          <button onClick={handleSend}>Send</button>
        </div>

        <div className="sound-toggle">
          <label>
            <input
              type="checkbox"
              checked={soundEnabled}
              onChange={() => setSoundEnabled(!soundEnabled)}
            />
            Sound Notifications
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
