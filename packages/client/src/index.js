import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, useAuthUser } from "react-auth-kit"; // Updated import // *****ES

const AuthenticatedApp = () => {
const authUser = useAuthUser(); // Updated hook // *****ES

return (
<BrowserRouter>
<App authUser={authUser} /> {/* Pass the authUser to the App component */}
</BrowserRouter>
);
};

ReactDOM.render(
<AuthProvider authType={"cookie"} authName={"_auth"} cookieDomain={window.location.hostname} cookieSecure={false}>
<AuthenticatedApp /> {/* Render the AuthenticatedApp */}
</AuthProvider>,
document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
