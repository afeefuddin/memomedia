import React, { useEffect, useState } from 'react'
import LoginComponent from '../Components/LoginComponent'
import styles from './css/Home.module.css'
import { useSelector } from 'react-redux'
import HomeFeed from './HomeFeed'
import LoadingImage from '../Components/LoadingImage'

const { container,gridContainer} = styles

function Home() {
    const isLoggedIn = useSelector((state:any)=>state.auth.isAuthenticated)

  return (
      <>
      { isLoggedIn?  (<HomeFeed />):(
          <div className={container}>
        <div className={gridContainer}>
            <div> 
                <div className='text-xl mb-4 text-center font-lato'>Random Meme</div>
                <div><LoadingImage /></div>
            </div>
            <div><LoginComponent /></div>
        </div>
    </div>
      )
}
    </>
  )
}


export default Home