import React from "react";
import "../styles/About.css";

const About = () => (
  <div className="about-container">
    <h1 className="about-title">An online Pomodoro Timer to boost your productivity</h1>
    <section className="about-section">
      <h2>What is Pomofocus?</h2>
      <p>
        Pomofocus is a customizable pomodoro timer that works on desktop & mobile browser. The aim of this app is to help you focus on any task you are working on, such as study, writing, or coding. This app is inspired by <span className="highlight"><a href="https://www.pomodorotechnique.com/" target ="_blank">Pomodoro Technique</a></span> which is a time management method developed by Francesco Cirillo.
      </p>
    </section>
    <section className="about-section">
      <h2>What is Pomodoro Technique?</h2>
      <p>
        The Pomodoro Technique is created by Francesco Cirillo for a more productive way to work and study. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student. <span className="highlight">- <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target ="_blank">Wikipedia</a></span>
      </p>
    </section>
    <section className="about-section">
      <h2>Key Features</h2>
      <ul className="features-list">
        <li>Simple, distraction-free interface for maximum focus</li>
        <li>Works seamlessly on both desktop and mobile browsers</li>
        <li>Progress tracking to help you monitor your productivity</li>
        <li>Modern, visually appealing design inspired by popular productivity tools</li>
        <li>Background color changes automatically based on timer mode (focus, short break, long break)</li>
        <li>Built-in lofi music player to help you stay relaxed and focused</li>
      </ul>
    </section>
    <section className="about-section">
      <h2>Why use this Pomodoro Timer?</h2>
      <p>
        This project is designed to help you build better work habits, stay focused, and avoid burnout. By breaking your work into manageable intervals and taking regular breaks, you can maintain high productivity throughout the day. Whether you are studying, coding, or working on creative projects, this timer adapts to your workflow and helps you achieve your goals.
      </p>
    </section>
  </div>
);

export default About;
