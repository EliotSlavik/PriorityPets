import { useContext } from "react";
import { petContext } from "../contexts/petContext";
import useAuth from "../hooks/useAuth";

const usePet = () => {
  const { auth } = useAuth();
  const { pet, setPet } = useContext(petContext);

  const getPet = async (onError) => {
    if (Object.keys(auth.pets.currentpet).length !== 0) {
      api
        .get(`/pet/${auth.pets.currentpet}`)
        .then((response) => {
          const { currentPet } = response.data;

          setPet({ isAuthenticated: true, user: user });
        })
        .catch((error) => {
          // console.log(error);
          onError(error);
        });
    }
  };

  const feedPet = async (pet, onError) => {
    //Move petGame logic here.
  };

  return {
    pet,
    getPet,
    feedPet,
  };
};

export default useAuth;
