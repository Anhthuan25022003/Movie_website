import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Banner from "./components/Banner";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";
import { MovieProvider } from "./context/MovieDetailContext";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import MovieDetails from "./components/MovieDetails";
import MainLayout from "./Layouts/MainLayout";
import MovieDetailLayout from "./Layouts/MovieDetailLayout";
import axios from "axios";
import Loading from "./components/Loading";
import CategoryFilm from "./components/CategoryFilm";
import Login from "./components/Login";
import ProtectedLayout from "./Layouts/ProtectedLayout";
import AuthContextProvider from "./context/AuthContextProvider";
import Register from "./components/Register";

function App() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (value) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=vi&page=10`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };
    if (value === "") return setSearchData([]);
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setSearchData(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      const urls = [
        "https://api.themoviedb.org/3/trending/movie/day?language=vi",
        "https://api.themoviedb.org/3/movie/top_rated?language=vi",
        "https://api.themoviedb.org/3/movie/now_playing?language=vi",
      ];
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };
      setIsLoading(true);
      try {
        const responses = await Promise.all(
          urls.map((url) => axios.get(url, options))
        );
        setTrendingMovies(responses[0].data.results);
        setTopRatedMovies(responses[1].data.results);
        setNowPlayingMovies(responses[2].data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <AuthContextProvider>

    <MovieProvider>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

          {/* Layout được bảo vệ: yêu cầu accessToken */}
          <Route element={<ProtectedLayout />} errorElement={<Login />}>
            <Route element={<MainLayout onSearch={handleSearch} />}>
              <Route
                path="/"
                element={
                  <div className="h-full bg-black text-white min-h-screen pb-10 relative">
                    <Banner />
                    {isLoading && <Loading />}
                    {searchData.length === 0 && (
                      <MovieList
                        title="Phim Thịnh Hành"
                        data={trendingMovies}
                      />
                    )}
                    {searchData.length === 0 && (
                      <MovieList
                        title="Phim Đề Cử"
                        data={nowPlayingMovies}
                      />
                    )}
                    {searchData.length === 0 && (
                      <MovieList
                        title="Phim Đánh Giá Cao"
                        data={topRatedMovies.slice(0, 15)}
                      />
                    )}
                    {searchData.length > 0 && <MovieSearch data={searchData} />}
                  </div>
                }
              />
              
              {/* Layout riêng cho MovieDetails */}
              
            </Route>
            <Route element={<MovieDetailLayout />}>
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/danhmuc/:theLoai" element={<CategoryFilm />} />
              </Route>
            {/* Các route không cần đăng nhập */}
            <Route path="/genre" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

          </Route>
        </Routes>
    </MovieProvider>
    </AuthContextProvider>

  );
}

export default App;
