import PropTypes from "prop-types";
// import { useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
// import { MovieContext } from "../context/MovieDetailContext";
import { useNavigate } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 500 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data }) => {
  const navigate = useNavigate();


  return (
    <>
    <div className=" my-10 px-10 max-w-full ">
    <h2 className="text-2xl font-bold mb-4 animate-color-change text-blue-600 text-glow">
  {title}
</h2>

      <div>
  <Carousel responsive={responsive} draggable={false} autoPlay={100} itemClass="mx-[10px] sm:mx-[15px]">
        
  {data?.map((movie) => (
    <div
      key={movie.id}
      className="w-[150px] bg-cover bg-no-repeat bg-center sm:w-[180px] h-[300px]  relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
      style={{
        backgroundImage: `url(${import.meta.env.VITE_IMG_URL}${movie.poster_path})`,
      }}
      onClick={() => 
        navigate(`/movie/${movie.id}`)
      }
    >
      {/* <div className="bg-black w-full h-full opacity-40 absolute top-0 left-0 z-0" /> */}
      <div className="relative flex flex-col items-center justify-end h-full">
        {/* <h3 className="text-lg font-bold text-blue-700 truncate w-[180px] text-center">
          {movie.name || movie.title || movie.original_title}
        </h3> */}
      </div>
    </div>
    
  ))}
</Carousel>

      </div>

    </div>
    </>
  );
};

// MovieList.propTypes = {
//   title: PropTypes.string.isRequired,
//   data: PropTypes.array,
// };

export default MovieList;
