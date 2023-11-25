import React from 'react'
import { useSelector } from 'react-redux'
import lightLogo from '../assets/1-removebg-preview.png'
import darkLogo from '../assets/2-removebg-preview.png'

function HomeHeader() {
    const currentTheme = useSelector((state:any)=>state.theme.currentTheme)

  return (
    <div style={{background : 'var(--secondary-bg-color)'}}>
        <div className='flex flex-row p-5'>
        <div>{currentTheme === 'light' ? <img src={lightLogo} alt="" className='w-48' /> : <img src={darkLogo} alt="" className='w-40' />}</div>
        <div></div>
        <div></div>
        </div>
    </div>
  )
}

export default HomeHeader