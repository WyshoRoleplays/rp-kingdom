import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // ✅ Step 1: Import Link

export default function HomePage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 100 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2 + 0.2,
      alpha: Math.random(),
      delta: Math.random() * 0.02
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let star of stars) {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      }
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="home-container">
      {/* Canvas Sparkles */}
      <canvas ref={canvasRef} className="stars-canvas"></canvas>

      {/* Navbar */}
      <nav className="navbar">
        <h1 className="site-title">RP Kingdom</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/what-is-rp">What is RP?</Link></li>
          <li><Link to="/rooms">Rooms</Link></li>
          <li><Link to="/character-sheets">Character Sheets</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/seeking">Seeking</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h2 className="hero-title">Craft Your Story</h2>
        <p className="hero-subtitle">Welcome. A world of immersive, exciting roleplaying awaits you...</p>
        <button className="cta-btn">Join Now</button>
      </section>

      {/* Feature Boxes Section */}
      <div className="feature-boxes">
        <div className="feature-box">
          <h3>Custom Profiles</h3>
          <p>Express yourself with unique fonts and images.</p>
        </div>
        <div className="feature-box">
          <h3>Themed Rooms</h3>
          <p>Explore worlds ranging from fantasy to sci-fi.</p>
        </div>
        <div className="feature-box">
          <h3>Make New Friends</h3>
          <p>Connect with fellow roleplayers and form lasting bonds.</p>
        </div>
      </div>
    </div>
  );
}
