import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieContext } from "../context/MovieDetailContext";
import axios from "axios";
import Loading from "./Loading";
import IconPlay from "../assets/play-button.png";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthContextProvider";
import { IoIosSend } from "react-icons/io";

const MovieDetails = () => {
  const { user } = useContext(AuthContext);

  const { id } = useParams();
  const { handleVideoTrailer } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const auth = getAuth();
  const db = getFirestore();

  const handleSetMovieTitle = () => {
    document.title = "Trang chủ";
  };

  // Lấy dữ liệu phim
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
        setMovie(data?.data);
        document.title = data?.data.original_title || data.data.name;
        setIsLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim:", error);
      }
    })();
  }, [id]);

  // Lấy các review từ Firestore
  useEffect(() => {
    const getReviews = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "reviews"));
        const reviewsData = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((review) => review.movieId === id); // lọc review theo phim hiện tại
        setReviews(reviewsData);
      } catch (error) {
        console.error("Lỗi khi lấy reviews:", error);
      }
    };

    getReviews();
  }, [id]);

  // Xử lý việc gửi review
  const handleAddReview = async () => {
    if (!review) return;

    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Vui lòng đăng nhập để bình luận!");
        return;
      }

      const reviewData = {
        movieId: id,
        reviewText: review,
        userName: user.displayName || "",
        userId: user.uid,
        timestamp: new Date(),
        userPhotoURL:user.photoURL
      };

      // Thêm review vào Firestore
      await addDoc(collection(db, "reviews"), reviewData);
      setReview(""); // Xóa input sau khi gửi
      setReviews((prevReviews) => [...prevReviews, reviewData]); // Cập nhật danh sách review mới
    } catch (error) {
      console.error("Lỗi khi thêm review:", error);
    }
  };

  const renderStars = () => {
    const stars = Math.floor(movie.vote_average / 2);
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < stars ? "text-yellow-400 text-2xl" : "text-gray-500"}
      >
        ★
      </span>
    ));
  };

  if (!movie)
    return <div className="text-white text-center mt-10"><Loading/></div>;

  return (
    <div className="min-h-screen bg-black text-white p-10 ">
      {isLoading && <Loading />}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-[50%] w-full flex items-center justify-center">
          <div className="w-[200px] h-[300px] relative group">
            <button
              className="w-full h-full absolute top-0 left-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
              onClick={() => handleVideoTrailer(id)}
            >
              <img src={IconPlay} alt="play" className="w-16 h-16" />
            </button>
            <img
              src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`}
              alt="banner"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-yellow-400">{movie.title}</h1>
          <p className="text-gray-300 mt-2 text-sm">
            {movie.overview} Film ra mắt bởi{" "}
            {movie.production_companies[0].name}
          </p>
          <p className="mt-4">
            <strong>Ngày phát hành:</strong>{" "}
            {new Date(movie.release_date).toLocaleDateString("vi-VN")}
          </p>
          <p className="flex items-center gap-2 text-gray-300 mt-2">
            <strong className="text-white">Thể loại:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
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
            className="mt-6 ml-3 bg-white hover:bg-slate-500 text-black py-2 px-5 rounded-lg transition"
            onClick={handleSetMovieTitle}
          >
            Quay lại
          </Link>
        </div>
      </div>
      <p className="flex mt-10 items-center bg-white bg-opacity-35 h-9 justify-center mx-1 md:mx-48 2xl:mx-96 gap-x-2">
        {/* <strong className="text-center mt-4">Nhà sản xuất: </strong> */}
        {movie.production_companies
          .filter((company) => company.logo_path !== null)
          .map((company) => (
            <img
              key={company.id}
              src={`${import.meta.env.VITE_IMG_URL}${company.logo_path}`}
              alt={company.name}
              className="w-10 h-10 sm:max-h-14 pl-2 bg-center object-contain"
            />
          ))}

        {/* <img src={`${import.meta.env.VITE_IMG_URL}${movie.production_companies[0].logo_path||movie.production_companies[1].logo_path}`} alt={movie.production_companies[0].name} className="max-w-36 max-h-14 ml-9" /> */}
      </p>

      <div className="mt-10 flex justify-center gap-x-4 items-center">
        <img src={user.photoURL} className="rounded-full w-10"/>
        <input
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Bình luận..."
          className="w-full md:w-[50%]  h-12 text-[12px] sm:text-sm mt-4 p-4 bg-gray-800 text-white border border-gray-600 rounded-lg"
        />
        <button
          onClick={handleAddReview}
          className="mt-4 bg-red-700 text-white  py-2 px-3 rounded-lg h-10"
        >
          <IoIosSend />
        </button>
      </div>

      <div className="md:w-[50%] mt-10 flex flex-col item-center justify-center m-auto">
        {reviews.length === 0 ? (
          <p>Chưa có bình luận.</p>
        ) : (
          reviews.map((review, index) => (
            <div
              key={index}
              className="  mt-4 p-2 bg-gray-900 rounded-lg h-22 flex items-start"
            >
              <img src={review.userPhotoURL} className="w-10 rounded-full" />

              <div className="">
                <strong className="text-red-700 text-glow px-2">
                  {review.userName}
                </strong>
                <p className="mt-2 mx-5 text-[10px] text-gray-400">
                  {new Date().toLocaleDateString()}
                </p>


                <p className="mt-2 mx-5 font-semibold">{review.reviewText}</p>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
