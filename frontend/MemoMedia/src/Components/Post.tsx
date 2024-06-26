import Emoji from "./Emoji"
import Comment from './CommentIcon'
import ShareIcon from "./ShareIcon"
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { updateLike } from "../api/api"
import { useNavigate } from "react-router"
import { StateType } from "../Store/store"


function Post(props: any) {
  const userId = useSelector((state: StateType) => state.auth.userData._id);
  const likePost = updateLike(userId, props.items._id)
  const isAuthenticated = useSelector((state: StateType) => state.auth.isAuthenticated)
  const Navigate = useNavigate()
  const [liked, setLiked] = useState<Boolean>(props.items.isLiked)
  function LikeThePost() {
    setLiked((prev) => !prev);
    likePost.mutate();
  }
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
console.log(props.items.isLiked)
  return (
    <div className={`w-full h-full mb-4 p-2`} style={{ background: 'var(--secondary-bg-color)' }}>
      <div className='flex flex-col justify-center h-full '>
        <div className='flex flex-row items-center'>
          <div className="w-12 h-12 flex justify-center ml-2 mt-2 items-center" ><img  className="rounded-full h-12 w-12 cursor-pointer" src={props.items.profilePic} loading="eager" alt="" onClick={()=>{
            Navigate(`/user/${props.items.username}`)
          }} /></div>
          <div className="ml-3 font-roboto font-bold text-xl cursor-pointer hover:underline" onClick={()=>{
            Navigate(`/user/${props.items.username}`)
          }} >{props.items.username}</div>
          <div className="ml-2 text-gray-500"> • </div>
          <div className="ml-2 font-lato">{DateFun}</div>
        </div>
        <div className="ml-2 mt-2 mb-2">{props.items.caption}</div>
        {props.PostPage && <div className="m-auto flex items-center justify-center overflow-hidden" style={{ maxHeight: '300px', maxWidth: '100%' }}><img  src={props.items.picture} decoding="async" alt="" className="max-h-72" loading="eager"/></div>}
        {!props.PostPage && <div className="m-auto flex items-center justify-center overflow-hidden" style={{ maxHeight: '300px', maxWidth: '360px' }}><img src={props.items.picture} decoding="async" alt="" className="max-h-72"  loading="eager" /></div>}
        <div className='grid grid-cols-3'>
          <div className="m-auto flex flex-row" onClick={() => {
            if (isAuthenticated){
              LikeThePost()
            }
            else {
              alert('Login First')
            }
          }}><Emoji liked={props.items.isLiked} /> </div>
          <div className="m-auto flex flex-row" onClick={()=>{
            if(!props.PostPage)
            Navigate(`/post/${props.items._id}`)
            else{
            }
          }}><Comment /><span className="sm:ml-2 mt-1 font-poppins cursor-pointer">Comment</span></div>
          <div className="m-auto flex flex-row" onClick={props.copyLink}><ShareIcon /><span className="sm:ml-2 mt-1 font-poppins">Share</span></div>
        </div>
        <div className="ml-1 mt-2 flex flex-row" onClick={props.items.like}>{!props.items.isLiked && liked ? <div>{props.items.likes.length + 1}</div> : <div>{props.items.likes.length}</div>}Likes</div>
        {!props.PostPage && <div className="ml-1 mt-2 mb-2"  onClick={()=>Navigate(`/post/${props.items._id}`)}>Add a comment...</div>}
      </div>
    </div>
  )
}

export default Post