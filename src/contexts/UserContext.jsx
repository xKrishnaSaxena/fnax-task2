import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthenticationContext } from "./AuthContext";

const UserContext = createContext();
const BASE_URL = "http://localhost:8000";
export const useUser = () => React.useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const authContext = useContext(AuthenticationContext);
  const userId = authContext.userId;
  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (!userId) return;
      try {
        const response = await axios.get(`${BASE_URL}/api/user/${userId}`);

        setUser(response.data.data.user);
        setSuccess("User Loaded Successfully!");
        setLoading(false);
      } catch (error) {
        setError("Error fetching user!");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        loading,

        error,
        success,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
