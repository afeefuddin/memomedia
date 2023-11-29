import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import styles from './css/HomeFeed.module.css';
import axios from 'axios';
import {useInfiniteQuery} from '@tanstack/react-query'
import Post from '../Components/Post';
import HomeHeader from '../Components/HomeHeader';
import SidePanel from '../Components/SidePanel';
import { useSelector } from 'react-redux';

const {gridContainer} = styles;

function HomeFeed() {
  const isProfileToggleOpen = useSelector((state:any)=>state.profile.isOpen);
  const apiLink = import.meta.env.VITE_API_LINK
  const getPosts : ({}:any)=> any = async({ pageParam  }:any) =>{
    const params = {
      'pos' : pageParam,
      'size' : 10,
    }
    const jwt_token_id = localStorage.getItem('jwt_token_id')
    const headers =  {
      'Authorization': 'Bearer '+jwt_token_id
    }
    const response = await axios.get(apiLink, { headers,params });
    const posts = response.data;
    return posts;
  }
  
  
    const {
      data,
      error,
      fetchNextPage,
      hasNextPage,
      isFetching,
      isFetchingNextPage,
      status,
    } = useInfiniteQuery({
      queryKey : ['posts'],
      queryFn : getPosts,
      initialPageParam : 0,
      getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
      refetchOnWindowFocus:false
    })
    if(data){
      console.log(data)
    }
    const loadMore = () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };


  return (
    <div className='h-screen' style={{background : 'var(--primary-bg-color)'}}>
      <HomeHeader />
      <div>
        { isProfileToggleOpen && 
          <div className=' absolute right-2 mt-2 text-lg w-40 p-2 rounded'  style={{background : 'var(--secondary-bg-color)'}}>
        <div className='p-2'>View Profile</div>
        <div className='p-2'>Logout</div>
      </div>
      }
      </div>
      <div className='flex flex-row justify-center'>
        <div className='flex flex-row'>
          <div className='mt-4 flex justify-center'>
        <InfiniteScroll 
         pageStart={0}
         loadMore={loadMore}
         hasMore={hasNextPage}
         loader={<div className="loader" key={0}>Loading ...</div>}>
          <div>{data && data?.pages[0].map((item:any)=>(
            <Post key={item._id} items = {item} />
            
            // <li className='text-violet-600' key={item._id}>{item.caption}</li>
          ))}
          </div>
        </InfiniteScroll>
       
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