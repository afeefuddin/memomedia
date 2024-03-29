import { MutableRefObject, useEffect, useRef } from "react"

let useOutsideClick :(handler : any)=> MutableRefObject<HTMLDivElement | null | undefined> = (handler : any)=>{
    let ref = useRef<HTMLDivElement | null | undefined>(null)
    useEffect(()=>{
        let curHandler = (event : any)=>{
            if(!ref.current?.contains(event.target)){
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