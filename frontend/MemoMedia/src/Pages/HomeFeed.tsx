import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import styles from './css/HomeFeed.module.css';
import axios from 'axios';
import {useInfiniteQuery} from '@tanstack/react-query'

const {gridContainer} = styles;

function HomeFeed() {
  const apiLink = import.meta.env.VITE_API_LINK
  const getPosts : ({}:any)=> any = async({ pageParam  }:any) =>{
    const params = {
      'pos' : pageParam,
      'size' : 10,
    }
    const response = await axios.get(apiLink, { params });
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
    })
    const loadMore = () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };


  return (
    <div>
      <div className={gridContainer}>
        <div></div>
        <div>
          <div>
        <InfiniteScroll 
         pageStart={0}
         loadMore={loadMore}
         hasMore={hasNextPage}
         loader={<div className="loader" key={0}>Loading ...</div>}>
          
        </InfiniteScroll>
          </div>
        </div>
        <div></div>
      </div>
      </div>
  )
}

export default HomeFeed