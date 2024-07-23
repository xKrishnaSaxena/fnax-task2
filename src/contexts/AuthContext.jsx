import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();

const AuthenticationProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const URL = "https://fnax-task2-backend.onrender.com";
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (token) {
      setUser({ token });
      setUserID({ userId });
    }
  }, [token, userId]);

  const login = async (username, password) => {
    setLoading(true);
    const response = await fetch(`${URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();

      setSuccess("User Logged In Successfully!");
      const token = data.token;
      const userId = data.data.user._id;

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", token);

      setUser({ token });
      setUserID({ userId });
      navigate("/", { replace: true });
      setLoading(false);
    } else {
      setError("Incorrect Email or Password!");
      setLoading(false);
    }
  };

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login", { replace: true });
    setSuccess("User Logged Out Successfully!");

    setUser(null);
    setUserID(null);
    setLoading(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        login,
        logout,
        token,
        userId,
        userID,
        error,
        success,
        loading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationProvider, AuthenticationContext };
