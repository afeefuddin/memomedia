import { useEffect, useState } from 'react'
import HomeHeader from '../Components/HomeHeader'
import Post from '../Components/Post'
import { useParams } from 'react-router'
import { Button } from '@radix-ui/themes'
import { getPostPage } from '../api/api'
import Comment from '../Components/Comment'
import { useSelector } from 'react-redux'


function PostPage() {
  const {postId} = useParams()
  const isAuthenticated = useSelector((state:any)=>state.auth.isAuthenticated)
  // let item = {
  //   "_id": "657dafadfde65088c485aad9",
  //   "caption": "HHHHHHHHiiiiii",
  //   "picture": "https://res.cloudinary.com/dezzqucfl/image/upload/v1702802157/zsmdlaogfrtbhqaznb3h.png",
  //   "date": 1702735789659,
  //   "userId": "6556083d62b7ace989773f98",
  //   "username": "afeefuddin",
  //   "likes": [],
  //   "comments": [],
  //   "__v": 0,
  //   "profilePic": "https://res.cloudinary.com/dezzqucfl/image/upload/v1702646889/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta_htpstb.jpg"
  // }
  const {data , isLoading , error} = getPostPage(postId? postId : '')

  const [comment, setComment] = useState('')
  // const comments = [{
  //   user: 'viratkohli',
  //   message: 'afeef is great',
  //   date: 1702806365043,
  //   profilePic: "https://res.cloudinary.com/dezzqucfl/image/upload/v1702646889/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta_htpstb.jpg"
  // },{
  //   user: 'viratkohli',
  //   message: 'afeef is great',
  //   date: 1702806365043,
  //   profilePic: "https://res.cloudinary.com/dezzqucfl/image/upload/v1702646889/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta_htpstb.jpg"
  // }]
  const [comments, setComments] = useState([]);
  const [blinking,setBlinking] = useState(false)

  useEffect(()=>{
    setComments(data?.post?.comments)
  },[data])
  
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div style={{ background: 'var(--primary-bg-color)' }} className='min-h-screen'>

      <HomeHeader />
      <div className='h-full'>
        <div className='flex justify-center items-center mt-16'>
          <div className='max-w-md'>
            <Post items={data.post} PostPage={true} />
            <div className='h-12 overflow-hidden mb-2'>
              <textarea name="" className='w-full h-full resize-none outline-none p-2 rounded' style={{ background: 'var(--secondary-bg-color)' }} placeholder='Add a comment'
                onChange={(e) => {
                if(isAuthenticated)
                setComment(e.target.value)
                  else{
                    alert('Login First')
                  }
                }
              } value={comment} ></textarea>
            </div>
            {comment.length > 0 && <div><Button>Post</Button></div>}
            <div>
              Comments
            </div>
           <Comment comments= {comments} />
          </div>

        </div>
        <div></div>
      </div>
    </div>
  )
}

export default PostPage