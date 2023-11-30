import React from 'react'
import Image from '../assets/vk.jpeg'
import { Button } from '@radix-ui/themes'
import { useDispatch } from 'react-redux'
import { setAddPost } from '../Store/addPostSlice'

function SidePanel() {
  const dispatch = useDispatch();

  return (
    <div >
        <div className='flex flex-col'>
            <div className='mt-4 rounded p-2 pl-6 pr-6' style={{background : 'var(--secondary-bg-color)'}}>
                <div className='flex flex-row '>

                <div><img className ="m-2 rounded-full h-14" src={Image} alt="" /></div>
                <div className='mt-auto mb-auto'>Virat Kohli</div>
                </div>
                <div>You have N posts in MemoMedia</div>
                <div className='mt-4'><Button className='w-full rounded-3xl'>View Profile</Button></div>
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