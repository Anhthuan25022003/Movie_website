import { useEffect, useState, useContext } from "react";
import { Link, data, useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieDetailContext";
import axios from "axios";
import Loading from "./Loading";

const MovieDetails = () => {
  const { id } = useParams(); 
  const { handleVideoTrailer } = useContext(MovieContext); 
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const data = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=vi`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          }
        );
        console.log("data: ", data?.data);
        // const data = await response.json()
        setMovie(data?.data);
        document.title = data?.data.original_title || data.data.name;
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      }
    })();
  }, [id]);

  if (!movie)
    return <p className="text-white text-center mt-10">Đang tải...</p>;

  const renderStars = () => {
    const stars = Math.floor(movie.vote_average / 2); // Vì vote_average từ 0-10, ta chia 2 để thành thang điểm 5 sao
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < stars ? "text-yellow-400 text-2xl" : "text-gray-500"}
      >
        ★
      </span>
    ));
  };
  return (
    <div className="min-h-screen bg-black text-white p-10">
      {isLoading && <Loading />}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Ảnh poster */}
        <img
          src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
          alt={movie.title}
          className="h-[300px] w-[200px] sm:h-[400px] sm:w-[300px] rounded-lg shadow-lg"
        />


        <div className="flex-1">
          <h1 className="text-3xl font-bold text-yellow-400">{movie.title}</h1>
          <p className="text-gray-300 mt-2">{movie.overview} Film ra mắt bởi {movie.production_companies[0].name}</p>
          <p className="mt-4">
            <strong>Ngày phát hành:</strong>   {new Date(movie.release_date).toLocaleDateString("vi-VN")}

          </p>
          <p className="flex items-center gap-2 text-gray-300 mt-2">
            <strong className="text-white">Thể loại:</strong> {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="flex items-center gap-2">
            <strong>Đánh giá:</strong> {renderStars()}
          </p>

          <button
            onClick={() => handleVideoTrailer(id)}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-5 rounded-lg transition"
          >
            Xem Phim
          </button>
          <Link
            to="/"
            className="mt-6 ml-3 bg-white hover:bg-slate-500 text-black   py-2 px-5 rounded-lg transition"
          >
            Quay lại
          </Link>

        </div>
      </div>
      <p className="flex mt-10 items-center bg-white bg-opacity-35 h-9 justify-center mx-1 md:mx-48 2xl:mx-96 gap-x-2">
            {/* <strong className="text-center mt-4">Nhà sản xuất: </strong> */}
            {movie.production_companies.filter((company) => company.logo_path !== null).map((company) => (
              <img
                key={company.id}
                src={`${import.meta.env.VITE_IMG_URL}${company.logo_path}`}
                alt={company.name}
                className="w-10 h-10 sm:max-h-14 pl-2 bg-center object-contain"
              />
            ))}
    
          {/* <img src={`${import.meta.env.VITE_IMG_URL}${movie.production_companies[0].logo_path||movie.production_companies[1].logo_path}`} alt={movie.production_companies[0].name} className="max-w-36 max-h-14 ml-9" /> */}
          
          </p>

    </div>
  );
};

export default MovieDetails;
