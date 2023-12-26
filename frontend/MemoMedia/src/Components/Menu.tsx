import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { logout } from '../auth/authSlice';
import { setOpen } from '../Store/profileSlice';
import { useOutsideClick } from '../Hooks/useOutSideClick';

function Menu() {
    const isProfileToggleOpen = useSelector((state:any)=>state.profile.isOpen);
    const username = useSelector((state:any)=>state.auth.userData.username)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () =>{
        localStorage.clear()
       dispatch(logout())
      }
      const node = useOutsideClick(()=>{
        dispatch(setOpen())
      })
  return (
    <div>
    { isProfileToggleOpen && 
      <div ref={node} className=' absolute right-2 mt-2 text-lg w-40 p-2 rounded top-20'  style={{background : 'var(--secondary-bg-color)'}}>
    <div className='p-2' onClick={()=>{
        dispatch(setOpen())
        Navigate('user/'+username)
    }
        }>View Profile</div>
    <div className='p-2' onClick={handleLogout}>Logout</div>
  </div>
  }

  </div>
  )
}

export default Menu