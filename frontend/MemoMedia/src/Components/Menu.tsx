import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router'
import { logout } from '../auth/authSlice';
import { setClose } from '../Store/profileSlice';
import { StateType } from '../Store/store';

function Menu() {
    const isProfileToggleOpen = useSelector((state:StateType)=>state.profile.isOpen);
    const username = useSelector((state:StateType)=>state.auth.userData.username)
    const Navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = () =>{
        localStorage.clear()
        dispatch(setClose())
       dispatch(logout())
      }
  return (
    <div>
    { isProfileToggleOpen && 
      <div  className=' absolute right-2 mt-2 text-lg w-40 p-2 rounded top-20'  style={{background : 'var(--secondary-bg-color)'}}>
    <div className='p-2' onClick={()=>{
        dispatch(setClose())
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