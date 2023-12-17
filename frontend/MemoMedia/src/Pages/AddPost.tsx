import  { useState } from 'react'
import styles from './css/AddPost.module.css'
import { setAddPost } from '../Store/addPostSlice';

const {addPostBg} = styles;

import { Button } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';

function AddPost() {
  const isOpen = useSelector((state:any)=> state.addpost.isOpen)
  const isAuthenticated = useSelector((state:any)=>state.auth.isAuthenticated)
  const dispatch = useDispatch();
  const toggleAddPost = () =>{
    console.log('Here')
    dispatch(setAddPost())
  }
  const [caption , setCaption ] = useState('');
  const [file, setFile] = useState();

  const onChange = (e: any) => {
      console.log(e.target.files[0])
      setFile(e.target.files[0])
  }
  const username = useSelector((state:any)=>state.auth.userData.username)
  async function upload() {
    console.log(caption)
    const formData = new FormData();
    formData.append('picture',file);
    formData.append('caption',caption);
    formData.append('userId',"6556083d62b7ace989773f98");
    formData.append('username',username)
    const jwt_token_id = localStorage.getItem('jwt_token_id');
    const headers = {
      'Authorization': 'Bearer ' + jwt_token_id,
      'Content-Type' : 'multipart/form-data'
    };
  
    const data = await axios.post(import.meta.env.VITE_API_LINK + 'create/post', formData, {
      headers: headers
    });
  
    console.log(data);
  }

  return (
   <div >
    {isAuthenticated && isOpen && <div className='fixed overflow-hidden'><div className={`${addPostBg} flex justify-center items-center`} onClick={toggleAddPost} onScroll={toggleAddPost}></div>
  
      <div className=' fixed z-10 h-2/5 right-0 left-0 bottom-0 top-0 max-w-2xl m-auto  ' style={{background : 'var(--secondary-bg-color)'}}>
        <div className=' flex flex-col'>
          <div className='flex flex-col p-6'>
            <label htmlFor="Caption"  >Caption</label>
            <input className='border border-gray-400' style={{background: 'var(--secondary-bg-color)'}} type="text" 
            value={caption}  onChange={(e)=>setCaption(e.target.value)}/>
          </div>
          <div className='p-6'>
            <input type="file" required onChange={(e)=>onChange(e)}  />
          </div>
          <div className='p-6'>
            <Button onClick={()=>{
              toggleAddPost()
              upload()
            }} >Upload </Button>
          </div>
        </div>
      </div>
      </div>

}
   </div>
  )
}

export default AddPost