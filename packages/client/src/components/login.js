import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const Login = ({ showModal, handleCloseModal, onError, onLogin }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const { signIn } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = await signIn(data.email, data.password, onError);
    if (user) {
      // If signIn was successful (i.e., returned a user object), call onLogin with the user's email
      onLogin(user.email);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" value={data.email} onChange={handleInputChange} />
          <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleInputChange} />
          <Button type="submit">Login</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
