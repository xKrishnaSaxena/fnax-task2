import React from "react";
import LandingPage from "./LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { AuthenticationProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import TasksForm from "./components/TaskForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthenticationProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tasks" element={<TasksForm />} />
            </Routes>
          </UserProvider>
        </AuthenticationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
