import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../contexts/AuthContext";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthenticationContext);

  const URL = "http://localhost:8000";

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      // Make the POST request to your backend API
      const response = await fetch(`${URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        login(email, password);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Signup</h2>
        <div style={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>
            Signup
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={styles.button}
          >
            Go to Login
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f9",
    color: "black",
  },
  heading: {
    color: "black",
  },
  form: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    color: "black",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  formGroup: {
    color: "black",
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    color: "black",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    color: "black",
  },
  button: {
    padding: "10px 15px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
    cursor: "pointer",
  },
};
