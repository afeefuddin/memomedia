import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

function AuthRoute({children}: any) {
    const isAuthenticated = useSelector((state:any)=>state.auth.isAuthenticated)
    if(isAuthenticated){
        return children
    }
  return  <Navigate to='/' />
}

export default AuthRoute