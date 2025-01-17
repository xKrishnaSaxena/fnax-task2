import React from "react";
import LandingPage from "./LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { AuthenticationProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import TasksForm from "./components/TaskForm";
import { ForgotPassword } from "./components/ForgotPassword";
import { ResetPassword } from "./components/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <UserProvider>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="tasks" element={<TasksForm />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </UserProvider>
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
