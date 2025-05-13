import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieContext = createContext();

const opts = {
  // height: "300",
  // width: "500",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const MovieProvider = ({ children }) => {
  const [trailerUrl, setTrailerUrl] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleVideoTrailer = async (movieId) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    };

    try {
      const data = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        options
      );

      // const data = await response.json();
      setTrailerUrl(data?.data.results[0]?.key);
      setModalIsOpen(true);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetisOpen=()=>{
    setModalIsOpen(false)
  }
  {console.log(import.meta.env.VITE_API_KEY)}

  
  return (
    <MovieContext.Provider value={{ handleVideoTrailer }}>
      {children}

      <Modal
  isOpen={modalIsOpen}
  onRequestClose={handleSetisOpen}
  style={{
    overlay: {
      position: "fixed",
      zIndex: 9999,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    content: {
      inset: "auto",
      padding: 0,
      background: "transparent",
      border: "none",
      overflow: "visible",
    },
  }}
  contentLabel="Trailer Modal"
>
{trailerUrl && (
  <div className="flex flex-col items-center justify-center w-full mt-20 px-4">
    <button
      onClick={handleSetisOpen}
      className="text-red-600 text-glow font-bold text-base mb-8 sm:mx-32 self-start"
    >
      &lt; Quay lại
    </button>
    <div className="w-full max-w-[90vw] sm:w-[600px] aspect-video mx-auto sm:mx-32 ">
      <YouTube
        videoId={trailerUrl}
        opts={{
          width: "100%",
          height: "100%",
          playerVars: { autoplay: 1 },
        }}
        className="w-full h-full"
      />
    </div>
  </div>
)}

</Modal>

    </MovieContext.Provider>
  );
};

// MovieProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export { MovieProvider, MovieContext };
