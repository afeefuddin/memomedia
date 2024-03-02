import { ChangeEvent, useState } from 'react'
import { Button } from '@radix-ui/themes';
import PreviewImage  from '../assets/previewImage.svg';
import axios from 'axios';



function UpdateProfile(props:any) {

    const [file,setFile] = useState<any>(null);
    const [imageSrc,setImageSrc] = useState<string | null>(null)

    const handleFileChange = (e : ChangeEvent<HTMLInputElement>) => {
        const curfile = e.target.files![0];
        setFile(curfile)
        if (curfile) {
          const objectURL = URL.createObjectURL(curfile);
          setImageSrc(objectURL);
        }
      };
      async function upload() {
        const formData = new FormData();
        formData.append('picture',file)
        const jwt_token_id = localStorage.getItem('jwt_token_id');
        const userData = localStorage.getItem('user')
        let username = ''
        if(userData)
         username = JSON.parse(userData).username
        const headers = {
          'Authorization': 'Bearer ' + jwt_token_id,
          'Content-Type' : 'multipart/form-data',
          'username' : username
        };
        const data = await axios.post(import.meta.env.VITE_API_LINK  + 'user/update',formData,{
          headers
        })
        console.log(data)
      }

    if(props.isOpen){
         return (
             <div className='fixed overflow-hidden'><div className={` flex justify-center items-center w-screen h-screen fixed`} onClick={()=>{
              props.setIsOpen(false)
              setImageSrc(null)
            }}
              onScroll={()=>{props.setIsOpen(false)}} 
             style={{background: 'rgba(52,58,70,.8)'}}
             ></div>
  
            <div className=' fixed z-10 h-fit right-0 left-0 bottom-0 top-0 max-w-2xl m-auto  ' style={{background : 'var(--secondary-bg-color)'}}>
              <div className=' flex flex-col'>
                <div className='p-6 pt-2'>
                  <div className='flex justify-center items-center mb-2'>
                 {imageSrc ?<img src={imageSrc} alt="" id='output' className='h-full max-h-72 max-w-xl'/> : <img src={PreviewImage} alt="" id='output' className='h-full max-h-72 max-w-xl'/> } 
      
                  </div>
                  <input type="file" accept='image/*' required onChange={handleFileChange}   />
                </div>
                <div className='p-6'>
                  <Button onClick={()=>{
                    if(imageSrc!=null){
                      props.setIsOpen(false)
                     upload()
                    }
                  }} >Upload </Button>
                </div>
              </div>
            </div>
            </div>
      
      
            )
    }
}

export default UpdateProfile