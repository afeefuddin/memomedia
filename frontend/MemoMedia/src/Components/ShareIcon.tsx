import React from 'react'
import { useSelector } from 'react-redux'

function ShareIcon() {
    const theme = useSelector((state:any)=>state.theme.currentTheme)
  return (
    <div className='m-auto'><svg width="28" height="22" viewBox="0 0 320 265" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M200.053 82.4001H206.053V76.4001V14.3633L311.253 108.318L206.053 212.859V151.84V145.84H200.053H160.071C119.138 145.84 83.0936 155.691 54.5013 175.479C35.0844 188.917 19.2906 206.811 7.78598 228.957C11.625 189.977 22.5677 157.391 44.5787 132.991C72.9615 101.529 120.937 82.4001 200.053 82.4001Z" stroke={theme==='light'?"black":"white"} stroke-width="12"/>
    </svg>
    </div>
  )
}

export default ShareIcon