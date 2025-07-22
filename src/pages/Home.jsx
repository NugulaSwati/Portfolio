import React from 'react';
import '../App.css'; 

function Home() {
  return (
    <section className="home-section">
      {/* <img
        src="/your-profile.jpg" 
        alt="Nugula Swati"
        className="profile-pic"
      /> */}

     
      <p className="intro-text">
        I'm a Web Developer, React Enthusiast, and Student passionate about building responsive and engaging websites.
        <br />
        I love combining design with code to solve problems and create impactful digital experiences.
      </p>

      <a
        href="https://drive.google.com/file/d/1LIua_0HnLRAyb1ZyBMMB5FaKctCjoGba/view?usp=sharing"
        download
        className="btn-download"
      >
        📄 View Resume
      </a>

      <div className="social-links">
        <a href="https://github.com/NugulaSwati" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://www.linkedin.com/in/swati-nugula-209959258/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        
      </div>
    </section>
  );
}

export default Home;
