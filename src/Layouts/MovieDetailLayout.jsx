import React from 'react'
import { Outlet } from 'react-router-dom'
import AuthContextProvider from '../context/AuthContextProvider'

const MovieDetailLayout = () => {
  return (
    <>
    <AuthContextProvider>
    <Outlet/>
    </AuthContextProvider>
    </>
  )
}

export default MovieDetailLayout