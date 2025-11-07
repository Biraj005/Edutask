import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1>Assignments Made Simple, Smart, and Fast</h1>
        <p>Empower teachers and students with a platform that organizes tasks, tracks submissions, and streamlines learning — all in one intuitive space.</p>
        <div className="cta-buttons">
          <button className="teacher-btn">For Teachers</button>
          <button className="student-btn">For Students</button>
        </div>
      </div>

    </section>
  );
};

export default Hero;
