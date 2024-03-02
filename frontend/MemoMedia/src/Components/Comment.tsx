import axios from 'axios';
import { useEffect, useState } from 'react'

export interface CommentProps {
  comments : string[]
}

interface CommentSchema {
  profilePic : string;
  username : string;
  message : string;
}

function Comment(props : CommentProps) {
  const commentsFromProps = props.comments;
  const [comments,setComments] = useState([])
  async function fetchComments(){
    const body = {
      comments : commentsFromProps
    }
    try {
      const response = await axios.post(import.meta.env.VITE_API_LINK + 'posts/comment', body)
      const data = await response.data;
      if(data){
        setComments(data)
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    fetchComments()
  },[commentsFromProps])

  return (
    <div className='p-2' style={{ background: 'var(--secondary-bg-color)' }}>
              <div className=''>
                {comments && comments.map((item :  CommentSchema) => (
                  <div className='flex flex-col mt-2 mb-2'>
                    <div className='flex flex-row'>
                      <div className='h-8 rounded'>
                        <img className='h-full rounded' src={item.profilePic} alt="" />
                      </div>
                      <div className='ml-2 font-bold'>
                        {item.username}
                      </div>
                      
                    </div>
                    <div className='ml-10'>
                      {item.message}
                    </div>
                  </div>
                ))}
                {props.comments && props.comments.length==0 && <div>No Comments on this Post</div>}
              </div>
            </div>
  )
}

export default Comment