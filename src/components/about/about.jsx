import React from "react";
import { PublicLayout } from "../../layout/PublicLayout";

function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>
        We are a team of passionate developers who love creating amazing web
        applications.
      </p>
      <h2>Our Mission</h2>
      <p>
        Our mission is to provide our clients with the best possible solutions
        to their web development needs.
      </p>
      <h2>Our Team</h2>
      <ul>
        <li>John Doe - CEO</li>
        <li>Jane Smith - CTO</li>
        <li>Bob Johnson - Lead Developer</li>
        <li>Sara Lee - Designer</li>
      </ul>
    </div>
  );
}

function AboutUs() {
  return (
    <PublicLayout>
      <About />
    </PublicLayout>
  );
}

export default AboutUs;
