import React, { useContext,useState } from "react";
import "./PetPicker.css";
import axios from "../util/axiosConfig";
import { petContext } from "../contexts/petContext";

const imgs = ["/x2/Cat_Down@2x.png", "/x2/Chick_Down@2x.png", "/x2/Fox_Down@2x.png", "/x2/Mouse_Down@2x.png", "/x2/Pig_Down@2x.png", "/x2/Rabbit_Down@2x.png"];

const PetPicker = ({ petName,setPetApperance,setPetName, selected, setSelectedPet }) => {
  const { pet, setPet } = useContext(petContext);
  const [formData, setFormData] = useState({
    name: "",
    appearance: "",
    healthLevel: 100,
  }); 

  const handlePetSelection = (pet) => {
    setSelectedPet(pet);
    console.log(pet);
    setPetApperance(pet)
    setFormData({ ...formData, appearance: pet });
  };
  
  const handleNameChange = (e) => {
    setPetName(e.target.value);
  };


  return (
    <div className="pet-container">
      <div className="pet-card">
        {imgs.map((pet) => (
          <img
            id="image"
            className={pet === selected ? "selected" : ""}
            key={pet}
            src={pet}
            alt="pet"
            onClick={() => handlePetSelection(pet)}
          />
        ))}
      </div>
      <div>
        <label htmlFor="petName">Pet Name:</label>
        <input
          type="text"
          id="petName"
          value={petName}
          onChange={handleNameChange}
        />
      </div>
    </div>
  );
};

export default PetPicker;
