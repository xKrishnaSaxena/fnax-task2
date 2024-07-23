import React, { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

export default function Header() {
  const { logout } = useContext(AuthenticationContext);
  const { user } = useUser();
  return (
    <header>
      <div className="logo">FNAXIOM</div>
      <nav>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/tasks">Assessment Tasks</a>
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
  );
}
