import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  const role = localStorage.getItem("userRole");

  if (!role) {
      // Not logged in? Redirect to login
      return <Navigate to="/" replace />
  }
  return (
    children
  )
}

export default ProtectedRoutes