import React from 'react'
import Image from '../assets/vk.jpeg'
import { Button } from '@radix-ui/themes'
import { useDispatch } from 'react-redux'
import { setAddPost } from '../Store/addPostSlice'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function SidePanel() {
  const dispatch = useDispatch();
  const userData = useSelector((state:any)=>state.auth.userData)
  const Navigate = useNavigate()
  return (
    <div >
        <div className='flex flex-col'>
            <div className='mt-4 rounded p-2 pl-6 pr-6' style={{background : 'var(--secondary-bg-color)'}}>
                <div className='flex flex-row '>

                <div><img className ="m-2 rounded-full h-14" src={userData.profilePic} alt="" /></div>
                <div className='mt-auto mb-auto'>{userData.username}</div>
                </div>
                <div>You have <span>{userData.post.length}</span> posts in MemoMedia</div>
                <div className='mt-4'><Button className='w-full rounded-3xl' onClick={()=>Navigate('/user/'+userData.username)} >View Profile</Button></div>
            </div>
            <div className='mt-4 rounded p-2 pl-6 pr-6' style={{background : 'var(--secondary-bg-color)'}}>
                <div className='flex flex-row '>

                <div>Share More memes with the Community</div>
                <div className='mt-auto mb-auto'></div>
                </div>
                
                <div className='mt-4'><Button onClick={()=>dispatch(setAddPost())} className='w-full rounded-3xl'>Create Post</Button></div>
            </div>
            <div></div>
        </div>
    </div>
  )
}

export default SidePanel