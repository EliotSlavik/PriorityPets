// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import useAuth from "../hooks/useAuth";

// const PetGame = () => {
//   const { auth } = useAuth();
//   console.log(auth);

//   const feedPet = async () => {
//     if (auth.user.points >= 10) {
//       auth.user.currentpet.healthLevel += 10;
//       auth.user.points -= 10;

//       try {
//         await axios.post(`/api/pets/${auth.pets.currentpet}`, {
//           username: auth.user.username,
//           xp: auth.user.xp,
//           level: auth.user.level,
//           points: auth.user.points,
//           pet: {
//             ...auth.user.pet,
//             healthLevel: auth.user.currentpet.healthLevel,
//           },
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       alert("Not enough points to feed the pet!");
//     }
//   };

//   const waterPet = async () => {
//     if (auth.user.points >= 5) {
//       auth.user.currentpet.health += 5;
//       auth.user.points -= 5;

//       try {
//         await axios.post(`/api/users/${auth.user.username}`, {
//           username: auth.user.username,
//           xp: auth.user.xp,
//           level: auth.user.level,
//           points: auth.user.points,
//           pet: {
//             ...auth.user.pet,
//             healthLevel: auth.user.currentpet.healthLevel,
//           },
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       alert("Not enough points to water the pet!");
//     }
//   };

//   const playWithPet = async () => {
//     if (auth.user.points >= 15) {
//       auth.user.currentpet.health += 20;
//       auth.user.points -= 15;

//       try {
//         await axios.post(`/api/pets/${auth.pets.currentpet}`, {
//           username: auth.user.username,
//           xp: auth.user.xp,
//           level: auth.user.level,
//           points: auth.user.points,
//           pet: {
//             ...auth.user.pet,
//             healthLevel: auth.user.currentpet.healthLevel,
//           },
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       alert("Not enough points to play with the pet!");
//     }
//   };

//   if (!auth.user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>Virtual Pet Game</h1>
//       {/* <div>
//         {auth.user.pet && <img src={auth.user.pet.appearance} alt="Pet" />}
//       </div> */}
//       <div>
//         <h2>Health: {auth.user.currentpet.healthLevel}</h2>
//         <h2>Points: {auth.user.points}</h2>
//       </div>
//       <div>
//         <button onClick={feedPet}>Feed</button>
//         <button onClick={waterPet}>Water</button>
//         <button onClick={playWithPet}>Play</button>
//       </div>
//     </div>
//   );
// };

// export default PetGame;
