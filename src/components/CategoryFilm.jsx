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
    <div className="p-6 pt-28 bg-slate-900 min-h-screen text-white">
          <Link to="/"
            className="mt-6 ml-3 bg-white hover:bg-slate-500 text-black   py-2 px-5 rounded-lg transition"
          >
            Quay lại
          </Link>
      <h1 className="text-3xl font-bold mb-6 text-red-500 text-glow text-center">
         {theLoai.replace("_", " ").toUpperCase() } Movie
      </h1>

      {isLoading ? (
        <Loading/>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movie.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
                className="w-full h-64 object-cover "
                onClick={()=>(
        navigate(`/movie/${item.id}`)

                )}
              />
              
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
