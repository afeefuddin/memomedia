import React from 'react'
import { useSelector } from 'react-redux'
import lightLogo from '../assets/1-removebg-preview.png'
import darkLogo from '../assets/2-removebg-preview.png'
import NavigationIcons from './NavigationIcons'
import image from '../assets/vk.jpeg'
import { useDispatch } from 'react-redux'
import { setTheme } from '../theme/themeSlice'

function HomeHeader() {
    const currentTheme = useSelector((state:any)=>state.theme.currentTheme)
    const dispatch = useDispatch();
    const handleTheme : () => any = () =>{
      if(currentTheme==='light'){
        dispatch(setTheme('dark'));

      }
      else{
        dispatch(setTheme('light'));

      }
    } 
  return (
    <div style={{background : 'var(--secondary-bg-color)'}}>
        <div className='grid xl:grid-cols-3 grid-cols-4  p-3'>
        <div className='mt-auto mb-auto ml-2'>{currentTheme === 'light' ? <img src={lightLogo} alt="" className='w-48' /> : <img src={darkLogo} alt="" className='w-40' />}</div>
        <div className='col-span-2 xl:col-span-1'> <NavigationIcons /> </div>
        <div className='flex flex-row justify-end mr-2 gap-12 sm:gap-6'>
          <div className='mt-auto mb-auto' onClick={handleTheme}>{
            currentTheme==='light' ? 
            <svg width="32" height="32" viewBox="0 0 315 316" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 157.374C0 153.817 1.18549 150.705 3.70465 148.186C6.22382 145.815 9.33573 144.63 12.5958 144.63H42.8258C46.2341 144.63 49.0496 145.815 51.4206 148.334C53.6434 150.854 54.8289 153.817 54.8289 157.374C54.8289 160.93 53.7916 163.894 51.5688 166.413C49.346 168.932 46.3823 170.118 42.974 170.118H12.744C9.33573 170.118 6.37201 168.932 3.85284 166.413C1.33368 163.894 0 160.93 0 157.374ZM42.3812 260.067C42.3812 256.658 43.5667 253.695 45.7895 251.027L67.5729 229.837C69.7957 227.466 72.7594 226.428 76.3159 226.428C79.8724 226.428 82.8361 227.614 85.2071 229.837C87.578 232.06 88.7635 234.875 88.7635 238.283C88.7635 241.84 87.578 245.1 85.2071 247.767L64.1646 268.81C58.089 273.552 52.0133 273.552 45.9377 268.81C43.5667 266.439 42.3812 263.475 42.3812 260.067ZM42.3812 54.9771C42.3812 51.5688 43.5667 48.6051 45.7895 45.9377C48.7533 43.4185 51.8652 42.2331 55.2735 42.2331C58.5335 42.2331 61.4973 43.4186 64.0164 45.7895L85.2071 67.5729C87.578 69.7957 88.7635 72.7594 88.7635 76.3159C88.7635 79.8723 87.578 82.8361 85.2071 85.2071C82.8361 87.578 79.8724 88.7635 76.3159 88.7635C72.7594 88.7635 69.7957 87.578 67.5729 85.2071L45.9377 64.0164C43.5667 61.6454 42.3812 58.5335 42.3812 54.9771ZM80.1687 157.374C80.1687 143.592 83.577 130.7 90.5417 118.845C97.5065 106.99 106.842 97.5065 118.845 90.5417C130.848 83.577 143.592 80.1687 157.374 80.1687C167.747 80.1687 177.675 82.2433 187.307 86.3925C196.791 90.5418 205.09 96.0246 211.906 102.989C218.871 109.954 224.354 118.104 228.355 127.588C232.356 137.072 234.431 147.149 234.431 157.522C234.431 171.451 231.022 184.344 224.057 196.198C217.093 208.053 207.757 217.389 195.902 224.354C184.047 231.319 171.155 234.727 157.226 234.727C143.296 234.727 130.404 231.319 118.549 224.354C106.694 217.389 97.3583 208.053 90.3936 196.198C83.7252 184.195 80.1687 171.303 80.1687 157.374ZM105.36 157.374C105.36 171.896 110.399 184.195 120.624 194.42C130.7 204.645 143 209.832 157.522 209.832C172.044 209.832 184.344 204.645 194.568 194.42C204.793 184.195 209.98 171.896 209.98 157.374C209.98 143.148 204.793 130.997 194.568 120.772C184.344 110.695 172.044 105.657 157.522 105.657C143.148 105.657 130.848 110.695 120.772 120.772C110.399 130.997 105.36 143.148 105.36 157.374ZM144.778 272.663C144.778 269.106 145.963 266.142 148.483 263.771C151.002 261.4 153.965 260.215 157.374 260.215C160.93 260.215 164.042 261.4 166.413 263.771C168.784 266.142 169.97 269.106 169.97 272.663V302.152C169.97 305.708 168.784 308.82 166.265 311.339C163.746 313.858 160.782 315.044 157.374 315.044C153.965 315.044 150.854 313.858 148.483 311.339C145.963 308.82 144.778 305.708 144.778 302.152V272.663ZM144.778 42.974V12.744C144.778 9.33573 145.963 6.37201 148.483 3.85284C151.002 1.33368 153.965 0 157.522 0C161.078 0 163.894 1.18549 166.413 3.70465C168.932 6.22382 170.118 9.18754 170.118 12.5958V42.974C170.118 46.3823 168.932 49.1978 166.413 51.5688C163.894 53.9398 160.93 54.9771 157.522 54.9771C154.114 54.9771 151.002 53.7916 148.631 51.5688C146.26 49.346 144.778 46.3823 144.778 42.974ZM226.577 238.283C226.577 234.875 227.762 232.06 229.985 229.985C232.208 227.614 235.023 226.577 238.283 226.577C241.84 226.577 244.804 227.762 247.175 229.985L268.81 251.176C271.181 253.695 272.366 256.807 272.366 260.215C272.366 263.623 271.181 266.587 268.81 268.958C262.882 273.552 256.955 273.552 251.027 268.958L229.985 247.915C227.762 245.248 226.577 242.136 226.577 238.283ZM226.577 76.4641C226.577 72.7594 227.762 69.7957 229.985 67.7211L251.027 45.9377C253.547 43.5667 256.51 42.3812 259.77 42.3812C263.327 42.3812 266.291 43.5667 268.662 46.0859C271.181 48.6051 272.366 51.5688 272.366 54.9771C272.366 58.6817 271.181 61.7936 268.81 64.1646L247.175 85.3552C244.507 87.7262 241.543 88.9117 238.283 88.9117C234.875 88.9117 232.208 87.7262 229.985 85.3552C227.762 82.9843 226.577 80.0205 226.577 76.4641ZM260.067 157.374C260.067 153.817 261.252 150.854 263.623 148.186C265.994 145.815 268.81 144.63 272.07 144.63H302.003C305.412 144.63 308.375 145.963 310.895 148.483C313.414 151.002 314.747 153.965 314.747 157.374C314.747 160.782 313.414 163.746 310.895 166.265C308.375 168.784 305.412 169.97 302.003 169.97H272.07C268.662 169.97 265.698 168.784 263.475 166.265C261.252 163.746 260.067 160.93 260.067 157.374Z" fill="black"/>
</svg> : 
<svg width="32" height="32" viewBox="0 0 326 327" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 200.484C31.0185 234.394 71.2541 256.388 116.627 256.388C192.504 256.388 254.015 194.877 254.015 119C254.015 72.1636 230.579 30.8008 194.794 6C266.446 21.5991 319.989 85.3699 319.989 161.698C319.989 249.716 248.636 321.069 160.618 321.069C85.9464 321.069 23.2906 269.802 6 200.484Z" fill="#FCEA2B"/>
<path d="M217.434 18.0396C262.772 41.3956 306.432 83.2848 306.432 153.638C306.432 238.54 237.605 307.367 152.703 307.367C101.907 307.367 44.1526 280.795 19.1941 221.947C19.1941 221.947 43.2673 324.476 160.533 324.521C266.746 324.562 314.639 211.193 314.639 211.193C350.403 35.4643 217.434 18.0396 217.434 18.0396Z" fill="#F1B31C"/>
<path d="M6 200.484C31.0185 234.394 71.2541 256.388 116.627 256.388C192.504 256.388 254.015 194.877 254.015 119C254.015 72.1636 230.579 30.8008 194.794 6C266.446 21.5991 319.989 85.3699 319.989 161.698C319.989 249.716 248.636 321.069 160.618 321.069C85.9464 321.069 23.2906 269.802 6 200.484Z" stroke="black" stroke-width="10.9911" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>



            }</div>
          <div>
            <img className='w-12 rounded-full' src={image} alt="" />
          </div>
        </div>
        </div>
    </div>
  )
}

export default HomeHeader