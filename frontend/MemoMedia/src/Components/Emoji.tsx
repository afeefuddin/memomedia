import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';

function Emoji(props : any) {
  const isAuthenticated = useSelector((state:any)=>state.auth.isAuthenticated)
    const [laugh,setLaugh] = useState(props.liked);
    useEffect(()=>{
      setLaugh(props.liked)
    },[props.liked]);
  return (
    <div> <div className="text-2xl flex flex-row" onClick={()=>{
      if(isAuthenticated)
        setLaugh(!laugh);
    }}>{laugh ?  <div>&#x1F602;</div>: <div>&#x1F636;</div>} <span className="ml-2 mt-1 text-lg font-poppins">React</span></div></div>
  )
}

export default Emoji