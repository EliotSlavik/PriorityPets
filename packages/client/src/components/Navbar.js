import React from "react";
import { Link } from "react-router-dom";
import  "./Navbar.css";

export default function NavBar () {
  return (
    <div className="nav">
      <Link to="/" className="title">Priority Pets</Link>
      <nav>
        <ul>
          <li>
            <Link className="link" to="/">Home</Link>
          </li>
          <li>
            <Link className="link" to="/taskpage">Priorities</Link>
          </li>
          <li>
            <Link className="link" to="/PetPage">Pet</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};


