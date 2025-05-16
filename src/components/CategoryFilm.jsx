import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { IoIosReturnLeft } from "react-icons/io";
const CategoryFilm = () => {
  const { theLoai } = useParams();
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSetMovieTitle = () => {
    document.title = "Trang chủ";
  };


  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/${theLoai}?language=vi`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        setMovie(data?.data.results || []);
        document.title = `Phim ${theLoai.replace("-", " ")}`;
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [theLoai]);

  const navigate = useNavigate();

  return (
    <div className="pt-3 bg-black min-h-screen text-white ">
      <h1 className="text-4xl font-bold mb-14  text-glow text-center mt-6 animate-color-change">
        {theLoai.replace("_", " ").toLocaleUpperCase()} MOVIE
      </h1>
      <Link
        to="/"
        className=" ml-3  py-2 px-5 rounded-lg transition"
        onClick={handleSetMovieTitle}
      >
        <IoIosReturnLeft className="ml-6 text-4xl text-red-700 font-bold"/>
      </Link>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movie.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={`${import.meta.env.VITE_IMG_URL}${item.poster_path}`}
                alt={item.title}
                className="w-full h-60 object-cover bg-center relative cursor-pointer sm:h-72"
                onClick={() => navigate(`/movie/${item.id}`)}
              />
              {/* <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 hover:opacity-0 transition duration-300">
                <img src="./assets/play-buton.png" />
              </div> */}
              <div className="p-4">
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-sm text-slate-400">
                  Ngày phát hành: {item.release_date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilm;
