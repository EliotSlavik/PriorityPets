import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import HomePage from "./pages/HomePage";
import PetPage from "./pages/PetPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./hooks/useAuth";

function App() {
  const { auth } = useAuth();
  console.log(auth);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={auth.isAuthenticated ? <Navigate to="/TaskPage" replace /> : <HomePage />} />
        <Route element={<ProtectedRoute />}>
          {/* Potentially bugged but I haven't run into one yet. */}
          <Route path="/PetPage" element={<PetPage />} />
          <Route path="/TaskPage" element={<TaskPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;