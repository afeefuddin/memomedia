import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";


const api_link = import.meta.env.VITE_API_LINK;
const jwt_token_id = localStorage.getItem('jwt_token_id')

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

const sendOTP= async(username: string, email : string) =>{
  const response = await axios.post(api_link + 'signup/sendOTP',{
    username : username,
    email : email
  })
  return response.data;
}


const createUser= async(username: string, email : string , password : string) =>{
  const response = await axios.post(api_link + 'signup',{
    username : username,
    email : email,
    password : password,
  })
  return response.data;
}


const isLiked = async (userId:string,postId:string) => {
  const headers = {
    userId : userId,
    postId : postId,
  }
  const response = await axios.get(api_link+'posts/hasLiked', {
    headers:headers,
   })
  const data = await response.data;
  return data;
};

const useIsLiked = (userId :string, postId :string)=>{
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
  return useQuery({
    queryKey: ['isLiked'],
   queryFn :()=> userDetails(username),
   refetchOnWindowFocus :false,
  retry:false})
}

//Post Page
const postForPostPage = async(userId : string) =>{
  const response = await axios.get(api_link + `post/${userId}`)
  const data = await response.data
  return data
}
const getPostPage = (userId : string)=>{
  return useQuery({
    queryKey : ['postPage'],
    queryFn : ()=> postForPostPage(userId),
    refetchOnWindowFocus : false,
    retry : false
  })
}
const createComment = async(postId : string|undefined,message: string,userId:string,username:string) =>{

  const body = { 
    message : message,
    post : postId,
    user : userId,
    username : username
  }
  const headers =  {
    'Authorization': 'Bearer '+jwt_token_id
  }
  const response = await axios.post(api_link+'create/comment',body,{
    headers: headers
  })
  const data = await response.data
  return data
}

const useCreateComment = (postId : string|undefined,message: string,userId:string,username:string) =>{
  return useMutation({
    mutationFn : ()=> createComment(postId,message,userId,username)
  })
}


//Load Details

const loadDetails = async()=>{
  const headers =  {
    'Authorization': 'Bearer '+jwt_token_id
  }
  const userData = localStorage.getItem('user')
  let username = ''
  if(userData)
    username  = JSON.parse(userData).username
 try {
   const data = await axios.get(api_link + `loadDetails/${username}`,{headers})
   if(data){
     let user = localStorage.getItem('user')
     if(user!==null){
      let userData = JSON.parse(user)
      userData['profilePic'] = data.data.profilePic
      localStorage.setItem('user',JSON.stringify(userData))
     }

   }

 } catch (error) {
    console.log('Error')
 }

}


export  {useLogin,handleLogin,useIsLiked,updateLike,getUserDetails,createUser,sendOTP,getPostPage,useCreateComment,loadDetails};