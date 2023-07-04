import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import HomePage from "./pages/HomePage";
import PetPage from "./pages/PetPage";
import PetGame from "./components/PetGame";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ProtectedRoute from "./components/ProtectedRoute";
import { authContext } from "./contexts/authContext";

function App() {
  const { auth, setAuth } = useContext(authContext);
  console.log("App: " + auth);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
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

// LIMIT ACCESS FOR NON-LOGGED IN USERS.
// Turned off for devs.

// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import TaskPage from "./pages/TaskPage";
// import HomePage from "./pages/HomePage";
// import PetPage from "./pages/PetPage";
// import { RequireAuth } from "react-auth-kit";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.min.css";

// function App() {
//   return (
//     <>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/TaskPage" element={<RequireAuth loginPath="/" component={TaskPage} />} />
//         <Route path="/PetPage" element={<RequireAuth loginPath="/" component={PetPage} />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
