import React, { useState, onEffect } from "react";
import PetPicker from "../components/PetPicker";
import "./PetPage.css";
import { Modal, Button } from "react-bootstrap";
import GravePicker from "../components/GravePicker";
import NavBar from "../components/Navbar.js";
import { motion } from "framer-motion";
import useAuth from "../hooks/useAuth";
import usePet from "../hooks/usePet";

const imgs = ["/x2/Cat_Down@2x.png", "/x2/Chick_Down@2x.png", "/x2/Fox_Down@2x.png", "/x2/Mouse_Down@2x.png", "/x2/Pig_Down@2x.png", "/x2/Rabbit_Down@2x.png"];

function PetPage() {
  const [show, setShow] = useState(false);
  const [showPetName, setShowPetName] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [isActivated, setIsActivated] = useState(false);
  const [showPetDiv, setShowPetDiv] = useState(false)
  const [showJumpButton, setShowJumpButton] = useState(false)
  const { auth } = useAuth();
  const [selectedPet, setSelectedPet] = useState(imgs[0]);
  const { pet } = usePet();
  const { createPet } = usePet();
  const [formData, setFormData] = useState({
    name: "",
    appearance: "",
    healthLevel: 100,
    userId: auth.user._id,
  });

console.log(formData.name)
  const openModal = (e) => {
    e.preventDefault();
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  const openGraveModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const closeGraveModal = () => {
    setOpen(false);
  };

  const handlePetSelection = async (event) => {
    setShow(false);
    setShowPetDiv(true)
    setShowJumpButton(true)
    setShowPetName(true)
    setFormData({
      name: formData.name,
      appearance: formData.appearance,
      userId: auth.user._id,
    });
    if (formData.name !== "") {
      setShow(false);
      createPet(formData.name, formData.appearance, formData.userId);
    }
  };

  
  const handleButtonClick = () => {
    handlePetSelection();
    setIsActivated(!isActivated);
  };

  
  return (
    <>
      <div className="main-background-div">
        <NavBar />
        <h1 className={showPetName ? "pet-title-hide" : "pet-title"}> Welcome To Your Pet's Page</h1>
        <h1 className={showPetName ? "pet-title" : "pet-title-hide"}>{`${formData.name}'s Forever Home`}</h1>
        {/* This button renders differently on the page when the health is greater than 0. */}
        <Button className={formData.healthLevel <= 0 ? "button-card" : "button-card-indiv"} onClick={openModal}>
          Choose Your Pet
        </Button>

        <Button className={showJumpButton ? "jump-button" : "jump-button-hide"} onClick={handleButtonClick}>
          Wanna See Me Jump?
        </Button>

        {/* <input
          type="range"
          min="-125"
          max="40"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        /> */}

        <Modal show={show} className="pet-modal">
          <Modal.Header
            closeButton
            onClick={closeModal}
            style={{
              backgroundColor: "lightblue",
              marginBottom: "-1px",
              color: "darkblue",
              fontSize: "x-large",
              fontWeight: "bolder",
            }}
          >
            Welcome To The Pet Store
          </Modal.Header>
          <PetPicker selected={selectedPet} setSelectedPet={setSelectedPet} formData={formData} setFormData={setFormData} imgs={imgs} handlePetSelection={handlePetSelection} />
          <Button onClick={handlePetSelection} className="handle-pet-btn">
            Choose
          </Button>
        </Modal>
            {/* The cemetary button only renders when the health is 0 */}
        <Button className={formData.healthLevel <= 0 ? "graveyard-button" : "graveyard-button-hide"} onClick={openGraveModal}>
          Visit Pet Cemetary
        </Button>
        <Modal show={open} className="grave-modal">
          <Modal.Header
            closeButton
            onClick={closeGraveModal}
            style={{
              backgroundColor: "lightblue",
              marginBottom: "-1px",
              color: "darkblue",
              fontSize: "x-large",
              fontWeight: "bolder",
            }}
          >
            Revive Your Pet
          </Modal.Header>
          <GravePicker />
        </Modal>
        <div className={showPetDiv ? "pet-dec-card": "pet-dec-card-hide"}>
          <img
            className="foodBowl"
            alt="food bowl"
            src="/accessories/foodbowl.png"
          />

          <img className="waterBowl" alt="water bowl" src="/accessories/waterbowl.png" />
          <motion.img animate={{ x: value * 8 + "px" }} className={isActivated ? "petty-move" : "petty"} alt="pet" src={selectedPet} />
          <img className="petHouse" alt="pet house" src="/accessories/pethouse.png" />
        </div>
        <div className="graveyard-holder"></div>
      </div>
    </>
  );
}

export default PetPage;
