import { useContext } from "react";
import { authContext } from "../contexts/authContext";
import api, { setAuthHeaders } from "../util/axiosConfig";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const { auth, setAuth } = useContext(authContext);
  const navigate = useNavigate();

  const signUp = async (email, username, password, onError) => {
    api
      .post("/auth/signup", { email, username, password })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        onError(error);
      });
  };

  const signIn = async (email, password, onError) => {
    if (email !== "" && password !== "") {
      api
        .post("/auth/signin", { email, password })
        .then((response) => {
          const { token, user } = response.data;

          setAuth({ isAuthenticated: true, user: user });
          setAuthHeaders(token);

          navigate("/TaskPage");
        })
        .catch((error) => {
          onError(error);
        });
    }
  };

  const signOut = () => {};

  return {
    auth,
    signUp,
    signIn,
    signOut,
  };
};

export default useAuth;
