import React from 'react'
import styles from './css/LoadingImage.module.css'
const {skeleton }= styles;
function LoadingImage(props:any) {
  return (
    <div  className={skeleton}></div>
  )
}

export default LoadingImage