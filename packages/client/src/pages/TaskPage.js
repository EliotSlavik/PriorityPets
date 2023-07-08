import React, { useContext } from "react";
import TaskManagement from "../components/TaskManagement";
import NavBar from "../components/Navbar.js";
import './TaskPage.css'
import { authContext } from "../contexts/authContext";

function TaskPage() {
  const { auth, setAuth } = useContext(authContext);
  return (
    <div className="mainTaskDiv" >
      <NavBar />
      <h1 style={{ color: "white", fontWeight: "bold", fontSize: "60px" }}>User's Priorities</h1>
      <TaskManagement userEmail={auth.user.email} />
    </div>
  );
}

export default TaskPage;
