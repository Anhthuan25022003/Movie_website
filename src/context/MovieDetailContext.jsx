import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieContext = createContext();

const opts = {
  height: "500",
  width: "800",
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
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NWE2ZDJkMzY3YTJjMzgxYjY5MThlZmYxZDQ2ZjBkMCIsIm5iZiI6MTcyNzAxODY1Ni44NjUsInN1YiI6IjY2ZjAzNmEwN2ZmMmJmNTdjZDI2NTk5MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6wcH45hDa7Tigo6DyPZaYoxa_vKCP7YJExuopJN0tKQ'
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
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
        contentLabel="Example Modal"
      >
        {trailerUrl && (
          <div className="block items-center justify-center mt-5">
            <button  className="bg-red-600 h-9 font-bold mb-3"> &lt; Quay lại</button>
            <YouTube videoId={trailerUrl} opts={opts} />
          </div>
        )}
      </Modal>
    </MovieContext.Provider>
  );
};

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MovieProvider, MovieContext };
