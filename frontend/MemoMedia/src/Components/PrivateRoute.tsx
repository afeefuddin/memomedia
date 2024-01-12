import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { StateType } from '../Store/store'

function PrivateRoute({children}:any) {
    const isAuthenticated =  useSelector((state:StateType)=>state.auth.isAuthenticated)
    if(isAuthenticated){
        return <Navigate to='/' />
    }
  return children
}

export default PrivateRoute