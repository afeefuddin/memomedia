import LoadingImage from "./LoadingImage"
import Image from '../assets/vk.jpeg'
import Emoji from "./Emoji"
import Comment from './CommentIcon'
import ShareIcon from "./ShareIcon"

function Post(props:any) {
  return (
    <div className="w-fit" style={{background : 'var(--secondary-bg-color)'}}>
        <div className='flex flex-col justify-center '>
            <div className='flex flex-row items-center'>
                <div className="w-12 h-12 flex justify-center ml-2 mt-2 items-center"><img className="rounded-full h-12 w-12" src={Image} alt="" /></div>
                <div className="ml-3 font-roboto font-bold text-xl">Virat Kohli</div>
                <div className="ml-2 text-gray-500"> • </div>
                <div className="ml-2 font-lato">1h</div>
            </div>
            <div className="ml-2 mt-2 mb-2">{props.items.caption}</div>
            <div className=""><LoadingImage height="200px"/></div>
            <div className='grid grid-cols-3'>
                <div className="m-auto flex flex-row" onClick={props.items.like}><Emoji/> </div>
                <div className="m-auto flex flex-row" onClick={props.openComment}><Comment /><span className="ml-2 mt-1 font-poppins">Comment</span></div>
                <div className="m-auto flex flex-row" onClick={props.copyLink}><ShareIcon /><span className="ml-2 mt-1 font-poppins">Share</span></div>
            </div>
            <div className="ml-4 mt-2 mb-2" onClick={props.openComment}>Add a comment...</div>
        </div>
    </div>
  )
}

export default Post