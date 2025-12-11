import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleAuthHandler from "./pages/GoogleAuthHandler";  // <-- ADD THIS
import "react-quill/dist/quill.snow.css";

const App = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* GOOGLE AUTH CALLBACK */}
      <Route path="/auth/success" element={<GoogleAuthHandler />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
      </Route>

      {/* PUBLIC RESUME VIEWER */}
      <Route path="/view/:resumeId" element={<Preview />} />
    </Routes>
  );
};

export default App;
