import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <section id="features" className="features">
      <h2>Platform Features</h2>
      <div className="feature-grid">
        <div className="feature-box">
          <h3>For Teachers</h3>
          <p>Create and assign tasks easily. Track submissions and download student work anytime.</p>
        </div>
        <div className="feature-box">
          <h3>For Students</h3>
          <p>Upload assignments, receive feedback, and stay on top of deadlines effortlessly.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
