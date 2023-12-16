import React , {useCallback, useEffect, useRef, useState} from 'react'
import styles from './css/HomeFeed.module.css';
import axios from 'axios';
import Post from '../Components/Post';
import HomeHeader from '../Components/HomeHeader';
import SidePanel from '../Components/SidePanel';
import { useSelector } from 'react-redux';
import usePostSearch from '../Hooks/usePostSearch';
import { useDispatch } from 'react-redux';
import { logout } from '../auth/authSlice';
import { useNavigate } from 'react-router';
import LoadingImage from '../Components/LoadingImage';


function HomeFeed() {
  const isProfileToggleOpen = useSelector((state:any)=>state.profile.isOpen);

    const [page,setPage] = useState(0);
    const {loading,error,posts,hasMore} = usePostSearch(page)
    const Navigate = useNavigate()
    const dispatch = useDispatch();
    const lastPost = useRef();
    const firstPost = useRef();
    const isAddPost = useSelector((state:any)=>state.addpost.isOpen)
 
    const fetchItems = useCallback((node)=>{
      if(loading) return;
      if(lastPost.current) lastPost.current.disconnect()
      lastPost.current = new IntersectionObserver(e=>{
        if(e[0].isIntersecting && hasMore){
          console.log('Visible')
          setPage(prev=>prev+1)
        }
      }) 
      if(node) lastPost.current?.observe(node)
    },[loading,hasMore]);
    const handleLogout = () =>{
      localStorage.clear()
     dispatch(logout())
    }
    const username = useSelector((state:any) => state.auth.userData.username)
  return (
    <div className={`${isAddPost? 'h-screen overflow-hidden':'h-full'}`} style={{background : 'var(--primary-bg-color)'}}>
      <HomeHeader />
      <div>
        { isProfileToggleOpen && 
          <div className=' absolute right-2 mt-2 text-lg w-40 p-2 rounded'  style={{background : 'var(--secondary-bg-color)'}}>
        <div className='p-2' onClick={()=>Navigate('user/'+username)}>View Profile</div>
        <div className='p-2' onClick={handleLogout}>Logout</div>
      </div>
      }

      </div>
      <div></div>
      <div className={`flex flex-row justify-center min-h-screen`} >
        <div className='flex flex-row'>
          <div className='mt-4 flex flex-col justify-center'>
            {/* <div><Post items={}/></div> */}
            {/* <div className='w-fit h-8 m-auto'><div className='text-center font-inter text-blue-700 cursor-pointer'onClick={}>Refresh</div></div> */}
          <div>{posts && posts?.map((item:any,index:any)=>{
            if(index+1===posts.length){
              return  <div ref={fetchItems}> <Post key={item} items = {item} /> </div>
            }
           return <div> <Post key={item} items = {item} /> </div>
            
           } )}
           {loading && <div>
            <div  className='mb-4 w-80'>
            
            <LoadingImage  />
            </div>
            <div className='mb-2 w-80'>
            <LoadingImage />
            </div>
            </div>}
          </div>
            {hasMore && <div>Loading</div>}
          </div>
          <div className='ml-6'>
          <SidePanel/>

          </div>
        </div>
      </div>
      </div>
  )
}

export default HomeFeed