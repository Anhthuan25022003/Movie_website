import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import AuthContextProvider from '../context/AuthContextProvider';
import axios from 'axios';

const MainLayout = ({ onSearch }) => {
  const [movieSuggestions, setMovieSuggestions] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const urls = [
        'https://api.themoviedb.org/3/trending/movie/day?language=en',
        'https://api.themoviedb.org/3/movie/popular?language=en&page=1',
        'https://api.themoviedb.org/3/movie/top_rated?language=en&page=1',
        'https://api.themoviedb.org/3/movie/now_playing?language=en&page=1',
      ];

      const options = {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

      try {
        const responses = await Promise.all(urls.map(url => axios.get(url, options)));
        
        // Gộp tất cả results lại
        const allMovies = responses.flatMap(res => res.data.results);

        // Lấy unique titles
        const titlesSet = new Set(allMovies.map(movie => movie.title));
        const uniqueTitles = Array.from(titlesSet);

        // Nếu muốn giới hạn số lượng gợi ý
        const topSuggestions = uniqueTitles.slice(0, 30);

        setMovieSuggestions(topSuggestions);

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
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </>
  );
};

export default MainLayout;
