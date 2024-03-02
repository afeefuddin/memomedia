import  { ChangeEvent, useState } from 'react'
import styles from './css/AddPost.module.css'
import { setAddPost } from '../Store/addPostSlice';
import PreviewImage  from '../assets/previewImage.svg';

const {addPostBg} = styles;

import { Button } from '@radix-ui/themes';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { StateType } from '../Store/store';

function AddPost() {
  const isOpen = useSelector((state:StateType)=> state.addpost.isOpen)
  const isAuthenticated = useSelector((state:StateType)=>state.auth.isAuthenticated)
  const id = useSelector((state:StateType)=>state.auth.userData._id)
  const [caption , setCaption ] = useState('');
  const [file,setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [uploading,setUploading] = useState(false)
  const dispatch = useDispatch();
  const toggleAddPost = () =>{
    setImageSrc(null)
    dispatch(setAddPost())
  }
  const handleFileChange = (e :ChangeEvent<HTMLInputElement> ) => {
    const curfile = e.target.files![0];
    if(!curfile){
      return
    }
    setFile(curfile)
    if (curfile) {
      const objectURL = URL.createObjectURL(curfile);
      setImageSrc(objectURL);
    }
  };

  const username = useSelector((state:any)=>state.auth.userData.username)
  
  async function upload() {
    setUploading(true)
    const formData = new FormData();
    formData.append('picture',file!);
    formData.append('caption',caption);
    formData.append('userId',id);
    formData.append('username',username)
    const jwt_token_id = localStorage.getItem('jwt_token_id');
    const headers = {
      'Authorization': 'Bearer ' + jwt_token_id,
      'Content-Type' : 'multipart/form-data'
    };
  
    const data = await axios.post(import.meta.env.VITE_API_LINK + 'create/post', formData, {
      headers: headers
    });
    setUploading(false)
    toggleAddPost()
    console.log(data);
  }

  return (
   <div >
    {isAuthenticated && isOpen && <div className='fixed overflow-hidden'><div className={`${addPostBg} flex justify-center items-center`} onClick={toggleAddPost} onScroll={toggleAddPost}></div>
  
      <div className=' fixed z-10 h-fit right-0 left-0 bottom-0 top-0 max-w-2xl m-auto  ' style={{background : 'var(--secondary-bg-color)'}}>
        <div className=' flex flex-col'>
          <div className='flex flex-col p-6'>
            <label htmlFor="Caption"  >Caption</label>
            <input className='border border-gray-400' style={{background: 'var(--secondary-bg-color)'}} type="text" 
            value={caption}  onChange={(e)=>setCaption(e.target.value)}/>
          </div>
          <div className='p-6 pt-2'>
            <div className='flex justify-center items-center mb-2'>
           {imageSrc ?<img src={imageSrc} alt="" id='output' className='h-full max-h-72 max-w-xl'/> : <img src={PreviewImage} alt="" id='output' className='h-full max-h-72 max-w-xl'/> } 

            </div>
            <input type="file" accept='image/*' required onChange={handleFileChange}   />
          </div>
          <div className='p-6'>
            <Button onClick={()=>{
              if(imageSrc!=null){
               
                upload()
              }
            }} className={`${uploading ? 'bg-blue-400' : ''}`} >{uploading ? 'Uploading...': 'Upload' } </Button>
          </div>
        </div>
      </div>
      </div>

}
   </div>
  )
}

export default AddPost