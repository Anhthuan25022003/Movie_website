import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import AuthContextProvider from '../context/AuthContextProvider'

const MainLayout = ({onSearch}) => {
    const movieSuggestions = ["Le Samouraï", "Les Misérables", "Le Mans 66", "Lethal Weapon", "Legend"];
  return (
    <>
    <AuthContextProvider>
        <Header onSearch={onSearch} suggestions={movieSuggestions} />
         <Outlet/>
        <Footer/>
      
    </AuthContextProvider>
    </>
  )
}

export default MainLayout