import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "../util/axiosConfig";
import { useAuthHeader, useSignIn } from "react-auth-kit";

const Signup = ({ showModal, handleCloseModal }) => {
  const [data, setData] = useState({ username: "", password: "", email: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const authHeader = useAuthHeader();
  const signin = useSignIn();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/signup", data, {
        headers: {
          Authorization: authHeader(),
        },
      });

      const { token } = response.data;

      signin({
        token: token,
        expiresIn: 360000,
        tokenType: "Bearer",
        authState: { email: data.email },
      });

      console.log("Signup successful!");
      console.log("User:", response.data);

      handleCloseModal();
    } catch (error) {
      console.error("Signup error:", error.message);
    }
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
          <Button type="submit">Signup</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Signup;
