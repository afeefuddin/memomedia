import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

function PrivateRoute({children}:any) {
    const isAuthenticated =  useSelector((state:any)=>state.auth.isAuthenticated)
    if(isAuthenticated){
        return <Navigate to='/' />
    }
  return children
}

export default PrivateRoute