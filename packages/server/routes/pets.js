const express = require("express");
const { Pet } = require("../models");

const router = express.Router();

router.get("/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const pet = await Pet.findById(id).exec();

    if (pet) {
      response.json(pet);
    } else {
      response.status(404).json({ error: "Pet not found." });
    }
  } catch (error) {
    response.status(500).json({ error: "An error occurred when finding the pet." });
  }
});

router.post("/:id", async (request, response) => {
  const id = request.params.id;
  const { user, name, appearance, healthLevel } = request.body;

  try {
    const updatedPet = await Pet.findByIdAndUpdate(
      id,
      { user, name, appearance, healthLevel },
      {
        new: true,
      }
    ).exec();

    if (updatedPet) {
      response.json(updatedPet);
    } else {
      response.status(404).json({ error: "Pet not found." });
    }
  } catch (error) {
    response.status(500).json({ error: "An error occurred when updating the pet." });
  }
});

router.post("/heal/:id", async (request, response) => {
  const id = request.params.id;

  try {
    const pet = await Pet.findById(id).exec();

    if (pet) {
      // Perform healing logic here
      pet.healthLevel = 100; // Set health level to 100
      await pet.save();
      response.json(pet);
    } else {
      response.status(404).json({ error: "Pet not found." });
    }
  } catch (error) {
    response.status(500).json({ error: "An error occurred when healing the pet." });
  }
});

module.exports = router;
