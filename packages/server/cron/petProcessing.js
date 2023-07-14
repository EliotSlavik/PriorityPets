import User from "../models/index";
import Pet from "../models/index";
import Task from "../models/index";

// Function to be executed once every 24 hours
async function processUsers() {
  try {
    // Get all users with a current pet
    const users = await User.find({ "pets.currentPet": { $exists: true } });

    for (const user of users) {
      const currentPetId = user.pets.currentPet;

      // Check if the current pet's health is 0 or greater
      const currentPet = await Pet.findById(currentPetId);

      // Calculate damage based on the lowest value between due date and last time damaged
      const lastTimeDamaged = currentPet.lastTimeDamaged || currentPet.createdAt;
      const damageStartDate = Math.max(lastTimeDamaged, task.dueDate);

      // Calculate damage per hour
      const damagePerHour = 1;
      const hoursSinceDamageStart = Math.floor((Date.now() - damageStartDate) / (1000 * 60 * 60));

      // Apply damage to pet's health level
      currentPet.healthLevel -= damagePerHour * hoursSinceDamageStart;

      // Update the lastTimeDamaged
      currentPet.lastTimeDamaged = Date.now();

      if (currentPet.healthLevel <= 0) {
        // Move the pet to deceasedPets array
        user.pets.deceasedPets.push(currentPetId);
        user.pets.currentPet = undefined;
      }

      await Promise.all([currentPet.save(), user.save()]);
    }

    console.log("Processing completed successfully!");
  } catch (error) {
    console.error("Error occurred during processing:", error);
  }
}

export default processUsers;
