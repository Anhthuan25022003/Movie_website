import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import AuthContextProvider from '../context/AuthContextProvider'

const MainLayout = ({onSearch}) => {
  const [movieSuggestions, setMovieSuggestions] = useState([]);

  useEffect(() => {
  const fetchSuggestions = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=vi-VN&page=1', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWE2ZDJkMzY3YTJjMzgxYjY5MThlZmYxZDQ2ZjBkMCIsIm5iZiI6MTcyNzAxODY1Ni44NjUsInN1YiI6IjY2ZjAzNmEwN2ZmMmJmNTdjZDI2NTk5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6wcH45hDa7Tigo6DyPZaYoxa_vKCP7YJExuopJN0tKQ'
        }
      });
      const data = await response.json();
      if (data.results) {
        const suggestions = data.results.slice(0, 5).map(movie => movie.title);
        setMovieSuggestions(suggestions);
      }
    } catch (error) {
      console.error('Error fetching movie suggestions:', error);
    }
  };

  fetchSuggestions();
}, []);

    
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