import React, { useEffect, useState } from 'react'
import HomeHeader from '../Components/HomeHeader'
import { Button } from '@radix-ui/themes'
import InfiniteScroll from 'react-infinite-scroller'
import Image from '../assets/vk.jpeg'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import Post from '../Components/Post'
import { getUserDetails } from '../api/api'

function ProfilePage() {
    const isLoggedIn = true;
    const isUser = true
    const [userData, setUserData] = useState({});
    // const {isError,data} = getUserDetails('afeefuddin')
    const fetchApi:()=>any = async(username : string) => {
       
        try{
            let res = await axios.get(`http://localhost:8000/api/users/profile/${username}`);
            res = await res.data;
            console.log(res)
            if(res) {
                setUserData(res?.dataToSend)
            }
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
       
        fetchApi('afeefuddin')
    },[])
  return (
    <div className='h-full' style={{background : 'var(--primary-bg-color)'}}>
        <div><HomeHeader profile='true' /></div>
        <div className='flex flex-row gap-6'>
            <div className='mt-4 mb-4 ml-4 p-4 h-fit w-fit flex flex-col items-center ' style={{background : 'var(--secondary-bg-color)'}}>
                <div><img className='h-36 rounded-full' src={Image} alt="" /></div>
                <div className='text-lg text-center mt-4 mb-4'>{userData?.username}</div>
                {isLoggedIn && isUser && <Button className='ml-auto mr-auto mt-2 mb-4'>Update Profile Pic</Button>}
                {isLoggedIn && !isUser && <Button>Follow</Button>}
                <div className='flex flex-row gap-6 mt-4 mb-4'>
                <div>{userData.PostsData?.length} Posts</div>
                <div>{userData.follower?.length} Followers</div>
                <div>{userData.following?.length} Following</div>
                </div>
                <div>Account Created On 27/10/2023</div>
            </div>
            <div  className='mt-4 mb-4 ml-4 flex flex-col  w-full' >
                <div className='text-3xl font-bold items-start'>Your Posts</div>
                <div className='flex flex-col item-center'>
                <div className='mt-4 flex flex-col  items-center '>
                {userData && 'PostsData' in userData && userData.PostsData.length > 0 ? (
  userData.PostsData.map((item: any) => (
    <div className='ml-2 mr-2 mt-4 mb-4'>

        <Post key={item._id} items={item} />
    </div>
  ))
) : (
  <div>Loading posts...</div>
)}
       
          </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfilePage