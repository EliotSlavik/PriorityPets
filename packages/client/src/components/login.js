import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import axios from "../util/axiosConfig";
import { useAuthHeader, useSignIn } from "react-auth-kit"; // Updated import // *****ES

const Login = ({ showModal, handleCloseModal }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const authHeader = useAuthHeader(); // Updated hook // *****ES
  const signin = useSignIn(); // Updated hook // *****ES

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/signin", data, {
        headers: {
          Authorization: authHeader(), // Set the authorization header
        },
      });

      const { token } = response.data;

      signin({
        token: token,
        expiresIn: 360000,
        tokenType: "Bearer",
        authState: { email: data.email },
      });

      console.log("Login successful!");
      console.log("User:", response.data);

      handleCloseModal();
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={handleInputChange}
          />
          <Button type="submit">Login</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
