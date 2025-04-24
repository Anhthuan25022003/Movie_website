import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const MainLayout = ({onSearch}) => {
    const movieSuggestions = ["Le Samouraï", "Les Misérables", "Le Mans 66", "Lethal Weapon", "Legend"];
  return (
    <>
        <Header onSearch={onSearch} suggestions={movieSuggestions} />
         <Outlet/>
        <Footer/>
    </>
  )
}

export default MainLayout