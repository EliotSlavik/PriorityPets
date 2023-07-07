import React, { useState } from "react";
import "./PetPicker.css";
import axios from "../util/axiosConfig";
import { Container, Form } from "react-bootstrap";
import useAuth from "../hooks/useAuth";

const imgs = ["/x2/Cat_Down@2x.png", "/x2/Chick_Down@2x.png", "/x2/Fox_Down@2x.png", "/x2/Mouse_Down@2x.png", "/x2/Pig_Down@2x.png", "/x2/Rabbit_Down@2x.png"];

const initialData = {
  name: "",
  appearance: "",
  healthLevel: 100,
};

const PetPicker = ({ selected, setSelected, pet}) => {
  const [formData, setFormData] = useState(initialData);
  const auth = useAuth();
console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/pets/${selected}`, { user: auth.email, ...formData });
      setFormData(initialData);
      console.log("Updated pet:", response.data);
    } catch (error) {
      console.log("Error occurred while submitting the form:", error);
    }
  };

  const handlePetSelection = (pet) => {
    setSelected(pet);
    setFormData({ ...initialData, appearance: pet });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <Container className="pet-container">
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <div className="pet-card">
              {imgs.map((pet) => (
                <img id="image" className={pet === selected ? "selected" : ""} key={pet} src={pet} alt={"pet"} onClick={() => handlePetSelection(pet)} />
              ))}
            </div>
            <Form.Control type="text" placeholder="Pet Name" name="name" value={formData.name} onChange={handleInputChange} />
            <button type="submit">Submit</button>
          </Form.Group>
        </Form>
      </Container>
    </div>
  );
};

export default PetPicker;
