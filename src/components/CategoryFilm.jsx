import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";

const CategoryFilm = () => {
  const { theLoai } = useParams();
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="pt-3 bg-slate-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-14 text-red-500 text-glow text-center mt-6">
        {theLoai.replace("_", " ").toLowerCase()} movie
      </h1>
      <Link
        to="/"
        className=" ml-3 bg-red-500 hover:bg-slate-500 text-white font-semibold   py-2 px-5 rounded-lg transition"
      >
        Quay lại
      </Link>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movie.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-full h-64 object-cover relative cursor-pointer sm:h-72"
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
