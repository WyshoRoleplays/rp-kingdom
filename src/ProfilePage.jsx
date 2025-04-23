// ProfilePage.jsx
import React from "react";

const ProfilePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Profile</h1>
      <p style={styles.text}>This is where you’ll be able to edit your character bio, avatar, and more.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: "3rem",
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "#f5f5f5",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
  },
};

export default ProfilePage;
