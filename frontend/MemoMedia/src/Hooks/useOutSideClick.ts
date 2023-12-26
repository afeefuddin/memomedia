import { useEffect, useRef } from "react"

let useOutsideClick = (handler)=>{
    let ref = useRef()
    useEffect(()=>{
        let curHandler = (event)=>{
            if(!ref.current.contains(event.target)){
                handler();
            }
        }
        document.addEventListener('mousedown',curHandler)
        return()=>{
            document.removeEventListener('mousedown',curHandler)
        }
    })
    return ref
}

export {useOutsideClick}