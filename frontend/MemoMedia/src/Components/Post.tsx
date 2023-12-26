import Emoji from "./Emoji"
import Comment from './CommentIcon'
import ShareIcon from "./ShareIcon"
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import axios from "axios"
import { updateLike } from "../api/api"
import { useNavigate } from "react-router"


function Post(props: any) {
  const userId = useSelector((state: any) => state.auth.userData._id);
  const likePost = updateLike(userId, props.items._id)
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
  const Navigate = useNavigate()
  function LikeThePost() {
    setLiked((prev) => !prev);
    likePost.mutate();
  }
  const [liked, setLiked] = useState(false)
  const [likedAlready, setLikedAlready] = useState(false);
  const [blinking,setBlinking] = useState(false)
  const isLiked = async (userId: string, postId: string) => {
    const headers = {

      userId: userId,
      postId: postId,
    }
    console.log(headers);
    try {
      const response = await axios.get(import.meta.env.VITE_API_LINK + 'posts/hasLiked', {
        headers: headers,
      })
      const data = await response.data;
      if (data) {
        setLikedAlready(data.isLiked)
      }
    }
    catch (error) {
      console.log(error)
    }

  };

  useEffect(() => {
    
    isLiked(userId, props.items._id)

  }, [])

  const getDate: (date: number) => string = (date: number) => {
    let curDate = Date.now() - date;
    if (curDate / 1000 < 60) {
      return String(Math.floor(curDate / 1000)) + 's'
    }
    else if (curDate / 60000 < 60) {
      return String(Math.floor(curDate / 60000)) + 'm'
    }
    else if (curDate / (60000 * 60) < 24) {
      return String(Math.floor(curDate / (60000 * 60))) + 'hr'
    }
    return String(Math.floor((curDate) / (1000 * 60 * 60 * 24))) + 'days';
  };
  const DateFun = useMemo(()=>{   
    return getDate(props.items.date)
  },[])
  return (
    <div className={`w-full h-full mb-4 p-2`} style={{ background: 'var(--secondary-bg-color)' }}>
      <div className='flex flex-col justify-center h-full '>
        <div className='flex flex-row items-center'>
          <div className="w-12 h-12 flex justify-center ml-2 mt-2 items-center" ><img className="rounded-full h-12 w-12 cursor-pointer" src={props.items.profilePic} alt="" onClick={()=>{
            Navigate(`/user/${props.items.username}`)
          }} /></div>
          <div className="ml-3 font-roboto font-bold text-xl cursor-pointer hover:underline" onClick={()=>{
            Navigate(`/user/${props.items.username}`)
          }} >{props.items.username}</div>
          <div className="ml-2 text-gray-500"> • </div>
          <div className="ml-2 font-lato">{DateFun}</div>
        </div>
        <div className="ml-2 mt-2 mb-2">{props.items.caption}</div>
        {props.PostPage && <div className="m-auto flex items-center justify-center overflow-hidden" style={{ maxHeight: '300px', maxWidth: '100%' }}><img src={props.items.picture} alt="" className="" /></div>}
        {!props.PostPage && <div className="m-auto flex items-center justify-center overflow-hidden" style={{ maxHeight: '300px', maxWidth: '360px' }}><img src={props.items.picture} alt="" className="" /></div>}
        <div className='grid grid-cols-3'>
          <div className="m-auto flex flex-row" onClick={() => {
            if (isAuthenticated){
              LikeThePost()
              console.log('Liked')
            }
            else {
              alert('Login First')
            }
          }}><Emoji liked={likedAlready} /> </div>
          <div className="m-auto flex flex-row" onClick={()=>{
            if(!props.PostPage)
            Navigate(`/post/${props.items._id}`)
            else{
              setBlinking(true)
            }
          }}><Comment /><span className="ml-2 mt-1 font-poppins cursor-pointer">Comment</span></div>
          <div className="m-auto flex flex-row" onClick={props.copyLink}><ShareIcon /><span className="ml-2 mt-1 font-poppins">Share</span></div>
        </div>
        <div className="ml-1 mt-2 flex flex-row" onClick={props.items.like}>{!likedAlready && liked ? <div>{props.items.likes.length + 1}</div> : <div>{props.items.likes.length}</div>}Likes</div>
        {!props.PostPage && <div className="ml-1 mt-2 mb-2"  onClick={()=>Navigate(`/post/${props.items._id}`)}>Add a comment...</div>}
      </div>
    </div>
  )
}

export default Post