import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { StateType } from '../Store/store'

function AuthRoute({children}: any) {
    const isAuthenticated = useSelector((state:StateType)=>state.auth.isAuthenticated)
    if(isAuthenticated){
        return children
    }
  return  <Navigate to='/' />
}

export default AuthRoute