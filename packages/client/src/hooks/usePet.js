import { useContext, useEffect } from "react";
import { petContext } from "../contexts/petContext";
import useAuth from "../hooks/useAuth";
import api from "../util/axiosConfig";

const usePet = () => {
  const { auth } = useAuth();
  const { setCurrentPet } = useAuth();
  const { pet, setPet } = useContext(petContext);

  const getPet = async (onError) => {
    if (auth.user.pets.currentPet !== undefined || auth.user.pets.currentPet !== []) {
      //setPet(auth.pets.currentpet);
      // api
      //   .get(`/pet/${auth.pets.currentpet}`)
      //   .then((response) => {
      //     const { currentPet } = response.data;
      //     //setPet();
      //   })
      //   .catch((error) => {
      //     // console.log(error);
      //     onError(error);
      //   });
    }
  };

  const createPet = async (name, appearance, userId) => {
    try {
      const response = await api.post("pets/", { name, appearance, userId });
      setPet(response.data);
      setCurrentPet(response.data);
    } catch (error) {
      console.log("Error occurred while updating the pet:", error);
    }
  };

  const feedPet = async (pet, onError) => {
    //Move petGame logic here.
  };

  useEffect(() => {
    getPet();
  }, [auth]);

  return {
    pet,
    getPet,
    createPet,
    feedPet,
  };
};

export default usePet;
