import React, { useState } from 'react'
import * as Form from '@radix-ui/react-form';
import HomeHeader from '../Components/HomeHeader';
import styles from './css/AddPost.module.css'
import { setAddPost } from '../Store/addPostSlice';

const {addPostBg} = styles;

import { Button } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

function AddPost() {
  const isOpen = useSelector((state:any)=> state.addpost.isOpen)
  const dispatch = useDispatch();
  const toggleAddPost = () =>{
    dispatch(setAddPost())
  }
  const [caption , setCaption ] = useState('');
  return (
   <div >
    { isOpen && <div><div className={`${addPostBg} flex justify-center items-center`} onClick={toggleAddPost}></div>
  
      <div className=' fixed z-10 h-2/5 right-0 left-0 bottom-0 top-0 max-w-2xl m-auto  ' style={{background : 'var(--secondary-bg-color)'}}>
        <div className=' flex flex-col'>
          <div className='flex flex-col p-6'>
            <label htmlFor="Caption"  >Caption</label>
            <input className='border border-gray-400' style={{background: 'var(--secondary-bg-color)'}} type="text" 
            value={caption}  onChange={(e)=>setCaption(e.target.val)}/>
          </div>
          <div className='p-6'>
            <input type="file" required  />
          </div>
          <div className='p-6'>
            <Button >Upload </Button>
          </div>
        </div>
      </div>
      </div>

}
   </div>
  )
}

export default AddPost