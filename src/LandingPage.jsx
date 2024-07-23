import "./LandingPage.css";
import { useUser } from "./contexts/UserContext";

import { useNavigate } from "react-router-dom";
import Header from "./components/Header";

const LandingPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  return (
    <div>
      <Header />
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
            {user ? (
              <button
                className="cta"
                onClick={() => {
                  navigate("/tasks");
                }}
              >
                GET STARTED
              </button>
            ) : (
              <></>
            )}
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
