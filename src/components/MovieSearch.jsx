import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { MovieContext } from "../context/MovieDetailContext";
import { useNavigate } from "react-router-dom";

const MovieSearch = ({ data }) => {
  const { handleVideoTrailer } = useContext(MovieContext);
  const navigate = useNavigate();

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Cắt dữ liệu theo trang
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="my-10 px-10 max-w-full">
      <h2 className="text-xl mb-4">KẾT QUẢ</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-2">
        {paginatedData.map((item) => (
          <div
            key={item.id}
            className="bg-cover bg-no-repeat bg-center w-[150px] h-[250px] sm:w-[200px] sm:h-[300px] relative hover:scale-110 transition-transform duration-500 ease-in-out cursor-pointer"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.poster_path})`,
            }}
            onClick={() => navigate(`/movie/${item.id}`)}
          >
            <div className="relative p-4 flex flex-col items-center justify-end h-full">
              <h3 className="text-md uppercase">
                {item.name || item.title || item.original_title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center mt-6 gap-2">
       

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-red-700 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}

        
      </div>
    </div>
  );
};

// MovieSearch.propTypes = {
//   data: PropTypes.array.isRequired,
// };

export default MovieSearch;
