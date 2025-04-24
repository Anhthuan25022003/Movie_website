import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

import { FaDiceFive, FaSearch } from "react-icons/fa";
import Login from "./Login";


const Header = ({ onSearch, suggestions = [] }) => {
  const [search, setSearch] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Debounce để tránh gọi API liên tục
  const debouncedSearch = useCallback(
    debounce((query) => {
      onSearch(query);
    }, 3000),
    []
  );

  useEffect(() => {
    if (search.trim() !== "") {
      // debouncedSearch(search);

      // Lọc danh sách gợi ý từ props
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowDropdown(true);
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }
    return () => {
      // debouncedSearch.cancel();
    };
    
  }, [search,suggestions,debouncedSearch]);

  return (
    <div className=" gap-x-9 p-4 flex justify-start fixed top-0 left-0 w-full z-[9999] bg-slate-900">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-[35px] text-red-700 font-bold text-glow">
          Movie
        </Link>
      </div>
      <div className="relative inline-block text-left pt-2 group">
  <div>
    <div
      className="inline-flex justify-center w-full rounded-2xl 
        border0 shadow-sm px-4 py-2
        text-sm font-medium text-red-600 text-glow hover:bg-slate-500 hover:bg-opacity-50
        focus:outline-none"
    >
      Loại film 
    </div>
  </div>

  <div
    className="origin-top-left absolute right-0 mt-2 w-56 
      rounded-md shadow-lg bg-slate-900 ring-1 ring-black ring-opacity-5 
      hidden group-hover:block z-50"
    role="menu"
  >
    <div className="py-1" role="none">
      <Link to='/danhmuc/upcoming'
        className="block px-4 py-2 text-sm text-white hover:text-red-500 hover:text-glow"
        role="menuitem"
      >
        Phim mới
      </Link>
      <Link to='/danhmuc/top_rated'
        className="block px-4 py-2 text-sm text-white hover:text-red-500 hover:text-glow"
        role="menuitem"
      >
        Phim đánh giá cao
      </Link>
      <Link to='/danhmuc/now_playing'
        className="block px-4 py-2 text-sm text-white hover:text-red-500 hover:text-glow"
        role="menuitem"
      >
        Phim khởi chiếu
      </Link>
    </div>
  </div>
</div>

      <div className="relative flex items-center space-x-2 border border-none">
        <input
          type="text"
          placeholder="Search"
          className="sm:w-32  h-8 border-white p-1 bg-slate-600 text-white rounded-full md:w-72"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onSearch(search)
              setShowDropdown(false)
            }
            // console.log(search)
          }}
        />
        <button
          className=" bg-red-700 text-black px-3 py-1 rounded-full"
          onClick={() => {
            onSearch(search)
            setShowDropdown(false)

          }}

        >
          <FaSearch />
        </button>

        <Login/>

        {showDropdown && filteredSuggestions.length > 0 && (
          <ul className="absolute top-10 left-0 w-96 bg-black text-white border border-none rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-500 hover:text-red-500 hover:text-glow cursor-pointer"
                onClick={() => {
                  setSearch(suggestion);
                  setShowDropdown(false);
                  onSearch(suggestion);
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
                
    </div>
  );
};

// Header.propTypes = {
//   onSearch: PropTypes.func.isRequired,
//   suggestions: PropTypes.arrayOf(PropTypes.string),
// };

// Header.defaultProps = {
//   suggestions: [],
// };

export default Header;