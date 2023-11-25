import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const api_link = import.meta.env.VITE_API_LINK;

const handleLogin = async (username: string, password: string) => {
    console.log(api_link)
    const response = await axios.post(api_link + 'login', {
      username: username,
      password: password
    });
    return response.data; 

};


const useLogin = (username: string, password: string) => {
  return useMutation({
    mutationFn: () => handleLogin(username, password)
  });
};

export  {useLogin,handleLogin};