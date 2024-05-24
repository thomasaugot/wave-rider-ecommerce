import React from "react";

import "./about.scss";

export default function AboutPage() {
  return (
    <div className="about-us">
      <div className="about-us__header">
        <h1>About Us</h1>
      </div>
      <div className="about-us__content">
        <h2>Welcome to Wave Rider Surf Shop!</h2>
        <p>
          Wave Rider Surf Shop is a personal project created for training and
          educational purposes. This mock e-commerce platform is designed to
          showcase my skills in web development using NextJS, TypeScript, SCSS,
          and Redux. Although this is not a real store, it simulates the
          functionalities of an actual e-commerce website to provide a realistic
          learning experience.
        </p>
        <h2>Our Mission</h2>
        <p>
          The mission of this project is to demonstrate the implementation of a
          modern, responsive, and interactive web application. By building this
          fake store, I aim to enhance my coding and programming skills, and to
          create a portfolio piece that highlights my capabilities as a full
          stack web developer.
        </p>
        <h2>Technologies Used</h2>
        <p>
          Wave Rider Surf Shop is built with the following technologies:
          <ul>
            <li>NextJS</li>
            <li>TypeScript</li>
            <li>SCSS</li>
            <li>Redux</li>
          </ul>
        </p>
        <h2>Contact Information</h2>
        <p>
          If you have any questions or comments about this project, feel free to
          reach out to me at:{" "}
          <a href="mailto:thomas.augot@hotmail.fr">thomas.augot@hotmail.fr</a>.
        </p>
        <h2>Disclaimer</h2>
        <p>
          Please note that this website is for educational purposes only. The
          products, articles, images, and other content are used solely for
          illustrative purposes. No actual transactions or sales take place on
          this site.
        </p>
      </div>
    </div>
  );
}
