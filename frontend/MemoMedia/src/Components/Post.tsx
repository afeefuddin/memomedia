import LoadingImage from "./LoadingImage"
import Image from '../assets/vk.jpeg'
import Emoji from "./Emoji"
import Comment from './CommentIcon'
import ShareIcon from "./ShareIcon"

import { useEffect, useState } from "react"
import { useIsLiked } from "../api/api"
import { useSelector } from "react-redux"
import axios from "axios"
import { updateLike } from "../api/api"






function Post(props:any) {
  const userId =  useSelector((state:any)=>state.auth.userData._id);
  const likePost =  updateLike(userId,props.items._id)
  function LikeThePost(){
    setLiked((prev)=>!prev);
    likePost.mutate();
  }
  const [liked,setLiked] = useState(false)
  const [likedAlready, setLikedAlready] = useState(false);
  const isLiked = async (userId:string,postId:string) => {
    const headers = {
      
      userId : userId,
      postId : postId,
    }
      console.log(headers);
      try{
        const response = await axios.get(import.meta.env.VITE_API_LINK+'posts/hasLiked', {
          headers:headers,
        })
        const data = await response.data;
        if(data){
          setLikedAlready(data.isLiked)
        }
      }
      catch(error){
        console.log(error)
      }
  
  };

  useEffect(()=>{
    isLiked(userId,props.items._id)

  },[])

  // const fetchIsLiked : (userId:string,postId:string)=> any = async (userId:string,postId:string) =>{
  //   console.log('Like')
  //   if(res.data?.isLiked){
  //     setLikedAlready(true);
  //     setLiked(true);
  //   }
  // }

  // useEffect(()=>{
  //   console.log(userId)
  //   fetchIsLiked(userId,props.items._id)
  // },[])
  return (
    <div className="w-fit mb-4" style={{background : 'var(--secondary-bg-color)'}}>
        <div className='flex flex-col justify-center '>
            <div className='flex flex-row items-center'>
                <div className="w-12 h-12 flex justify-center ml-2 mt-2 items-center"><img className="rounded-full h-12 w-12" src={Image} alt="" /></div>
                <div className="ml-3 font-roboto font-bold text-xl">Virat Kohli</div>
                <div className="ml-2 text-gray-500"> • </div>
                <div className="ml-2 font-lato">1h</div>
            </div>
            <div className="ml-2 mt-2 mb-2">{props.items.caption}</div>
            <div className=""><img src={props.items.picture} alt="" className="h-48" /></div>
            <div className='grid grid-cols-3'>
                <div className="m-auto flex flex-row" onClick={LikeThePost}><Emoji liked={likedAlready}/> </div>
                <div className="m-auto flex flex-row" onClick={props.openComment}><Comment /><span className="ml-2 mt-1 font-poppins">Comment</span></div>
                <div className="m-auto flex flex-row" onClick={props.copyLink}><ShareIcon /><span className="ml-2 mt-1 font-poppins">Share</span></div>
            </div>
            <div className="ml-4 mt-2 flex flex-row" onClick={props.items.like}>{!likedAlready && liked ? <div>{props.items.likes.length+1}</div> : <div>{props.items.likes.length}</div>}Likes</div>
            <div className="ml-4 mt-2 mb-2" onClick={props.openComment}>Add a comment...</div>
        </div>
    </div>
  )
}

export default Post