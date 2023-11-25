import {useState} from 'react'

function likethepost(props){

}

function Emoji(props : any) {
    const [laugh,setLaugh] = useState(props.liked);
  return (
    <div> <div className="text-2xl flex flex-row" onClick={()=>{
        setLaugh(!laugh);
        likethepost(props);
    }}>{laugh ?  <div>&#x1F602;</div>: <div>&#x1F636;</div>} <span className="ml-2 mt-1 text-lg font-poppins">React</span></div></div>
  )
}

export default Emoji