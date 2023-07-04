import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "../util/axiosConfig";
import useAuth from "../hooks/useAuth";

const Signup = ({ showModal, handleCloseModal, onError }) => {
  const [data, setData] = useState({ username: "", password: "", email: "", confirmPassword: "" });
  const { signUp } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    signUp(data.email, data.password, data.confirmPassword, onError);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSignup}>
          <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleInputChange} />
          <input type="text" name="username" placeholder="Username" value={data.username} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleInputChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" value={data.confirmPassword} onChange={handleInputChange} />
          <Button type="submit">Signup</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
