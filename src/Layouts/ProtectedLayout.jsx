import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedLayout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/login')
    }
  }, [navigate])

  return <Outlet />
}

export default ProtectedLayout
