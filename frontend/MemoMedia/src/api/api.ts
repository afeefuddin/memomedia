import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const api_link = import.meta.env.VITE_API_LINK;

const handleLogin = async (username: string, password: string) => {
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
const isLiked = async (userId:string,postId:string) => {
  const headers = {
    userId : userId,
    postId : postId,
  }
  console.log(headers);
  const response = await axios.get(api_link+'posts/hasLiked', {
    headers:headers,
   })
  const data = await response.data;
  return data;
};

const useIsLiked = (userId :string, postId :string)=>{
  console.log(userId + "Here")
return useQuery({
    queryKey: ['isLiked'],
   queryFn :()=> isLiked(userId,postId),
   refetchOnWindowFocus :false,
  retry:false})


}
const Like = async (userId:string,postId:string) => {
  const jwt_token_id = localStorage.getItem('jwt_token_id')
  const headers =  {
    'Authorization': 'Bearer '+jwt_token_id
  }
  console.log(headers)
  const response = await axios.put(api_link+'post/like',{userId,postId},{
    headers:headers,
   })
  const data = await response.data;
  return data;
};
const updateLike = (userId:string, postId : string)=>{
   return  useMutation({

    mutationFn :()=> Like(userId,postId)
  })

}
//Profile Page
const userDetails = async (username: string) =>{
  const response = await axios.get(api_link + `users/profile/${username}`);
  const data = await response.data;
  return data;
}

const getUserDetails = (username : string)=>{
  console.log(username + "Here")
  return useQuery({
    queryKey: ['isLiked'],
   queryFn :()=> userDetails(username),
   refetchOnWindowFocus :false,
  retry:false})
}

export  {useLogin,handleLogin,useIsLiked,updateLike,getUserDetails};