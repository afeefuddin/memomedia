import { useEffect, useState } from 'react'
import HomeHeader from '../Components/HomeHeader'
import Post from '../Components/Post'
import { useParams } from 'react-router'
import { Button } from '@radix-ui/themes'
import { getPostPage, useCreateComment } from '../api/api'
import Comment from '../Components/Comment'
import { useSelector } from 'react-redux'
import { StateType } from '../Store/store'


function PostPage() {
  const {postId} = useParams()
  const isAuthenticated = useSelector((state:StateType)=>state.auth.isAuthenticated)
  const userData = useSelector((state:StateType)=>state.auth.userData)
  const {data , isLoading } = getPostPage(postId? postId : '')
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([]);
  // const [blinking,setBlinking] = useState(false)
  const [posting,setPosting] = useState(false)
  const [show ,setShow] = useState(false);
  const createComment = useCreateComment(postId,comment,userData.userId,userData.username)

  function postComment(){
    createComment.mutate()
    setPosting(true)
  }
  useEffect(()=>{
    setComments(data?.post?.comments)
    setShow(true)
  },[data])
  useEffect(()=>{
    if(createComment.isSuccess)
    setPosting(false)
  },[createComment])



  const onLoadEffect = () => {
    setShow(false)
    setTimeout(() => {
        setShow(true);
    }, 2000);
};

useEffect(onLoadEffect, []);



  if (isLoading || !show) {
    return <div className='flex items-center justify-center' style={{ background: 'var(--primary-bg-color)' , height:'100vh'}}>Loading...</div>;
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
            {comment.length > 0 && !posting &&<div><Button 
            onClick={()=>{
              console.log('Clicked')
              postComment()}}>Post</Button></div>}
            {posting && <div>
                <Button className='bg-blue-400'>Posting...</Button>
              </div>}
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