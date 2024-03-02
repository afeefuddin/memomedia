import {useCallback, useEffect, useRef, useState} from 'react'
import styles from './css/HomeFeed.module.css';
import Post from '../Components/Post';
import HomeHeader from '../Components/HomeHeader';
import SidePanel from '../Components/SidePanel';
import { useSelector } from 'react-redux';
import usePostSearch from '../Hooks/usePostSearch';
import { useDispatch } from 'react-redux';
import LoadingImage from '../Components/LoadingImage';
import { loadDetails } from '../api/api';
import { updateProfilePic } from '../auth/authSlice';
import NavigationIcons from '../Components/NavigationIcons';
import { StateType } from '../Store/store';

const {loadingClass} = styles

function HomeFeed() {

    const [page,setPage] = useState(0);
    const [pageLoading,setPageLoading] = useState(true)
    const {loading,posts,hasMore} = usePostSearch(page)
    const dispatch = useDispatch();
    const lastPost = useRef<IntersectionObserver | null>();
    // const firstPost = useRef();
    const isAddPost = useSelector((state:StateType)=>state.addpost.isOpen)


    const fetchItems = useCallback((node : HTMLDivElement)=>{
      if(loading) return;
      if(lastPost.current) lastPost.current.disconnect()
      lastPost.current = new IntersectionObserver(e=>{
        if(e[0].isIntersecting && hasMore){
          setPage(prev=>prev+1)
        }
      }) 
      if(node) lastPost.current?.observe(node)
    },[loading,hasMore]);
    useEffect(()=>{
      async function loadPage() {
        await loadDetails()
        dispatch(updateProfilePic())
        setPageLoading(false)
      }
      loadPage()
    },[])

    // const username = useSelector((state:StateType) => state.auth.userData.username)
    if(pageLoading){
      return (
        <div className='h-screen flex items-center justify-center' style={{background : 'var(--primary-bg-color)'}}>
        <div className='m-auto text-lg'>Loading...</div>
    </div>
      )
    }
  return (
    <div className={`${isAddPost? 'h-screen overflow-hidden':'h-full'}`} style={{background : 'var(--primary-bg-color)'}}>
      <div className='fixed w-full'>
      <HomeHeader  />
      </div>

      <div className={`flex flex-row justify-center min-h-screen ml-2 mr-2 sm:m-0`} >
        <div className='flex flex-row mt-20'>
          <div className='mt-4 flex flex-col justify-center'>
            {/* <div><Post items={}/></div> */}
            {/* <div className='w-fit h-8 m-auto'><div className='text-center font-inter text-blue-700 cursor-pointer'onClick={}>Refresh</div></div> */}
          <div>{posts && posts?.map((item:any,index:number)=>{
            if(index+1===posts.length){
              return  <div ref={fetchItems} key={index}> <Post items = {item} /> </div>
            }
           return <div key={index}> <Post  items = {item} /> </div>
            
           } )}
           {loading && <div >
            <div  className={`mb-4 flex items-center justify-center ${loadingClass}`}>
            
            <LoadingImage  />
            </div>
            <div  className='mb-4 flex items-center justify-center loading'>
            <LoadingImage />
            </div>
            <div  className='mb-4 flex items-center justify-center loading'>
            <LoadingImage />
            </div>
            </div>}
          </div>
            {hasMore && <div>Loading</div>}
          </div>
          <div className='md:ml-6'>
          <SidePanel/>

          </div>
        </div>
      </div>
      <div className='block sm:hidden fixed bottom-0 w-full z-50' style={{background : 'var(--secondary-bg-color)'}}><NavigationIcons /></div>
      </div>
  )
}

export default HomeFeed