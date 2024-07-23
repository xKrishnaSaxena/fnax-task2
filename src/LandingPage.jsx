import React, { useContext } from "react";
import "./LandingPage.css";
import { useUser } from "./contexts/UserContext";
import { AuthenticationContext } from "./contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { logout } = useContext(AuthenticationContext);
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="logo">FNAXIOM</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#assessment-tasks">Assessment Tasks</a>
        </nav>
        <span className="heading">FULL STACK INTERNSHIP ASSESSMENT</span>
        {user ? (
          <button className="ranBut" href="/logout" onClick={() => logout()}>
            Logout
          </button>
        ) : (
          <>
            <a className="ranBut" href="/login">
              Login
            </a>
            <a className="ranBut" href="/signup">
              Signup
            </a>
          </>
        )}
      </header>
      <section className="hero">
        <div className="card">
          <div className="card-content">
            <h2>Welcome to FNAXIOM Full-Stack Internship</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              mollitia neque, quo asperiores maiores repudiandae aspernatur
              dolores molestiae repellat dolore.
            </p>
            <button className="gradient-button">Hello</button>
            <button
              className="cta"
              onClick={() => {
                navigate("/tasks");
              }}
            >
              GET STARTED
            </button>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="card">
          <div className="card-content">
            <h2>Coding Challenge</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium, qui!
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2>Coding Challenge</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium, qui!
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2>Project Submission</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium, qui!
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2>Project Quiz</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium, qui!
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2>Live Assessment</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium, qui!
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-content">
            <h2>Portfolio Assessment</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Praesentium, qui!.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
