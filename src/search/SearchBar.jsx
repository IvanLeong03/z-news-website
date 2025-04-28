import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
  const [searchInput, setSearchInput] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchInput)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex justify-between items-center">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full pr-4 py-2 pl-8 mr-2 mx-auto border border-[rgba(96,96,96,0.3765)] rounded-xl focus:outline-none focus:ring-1 focus:ring-[theme(--color-line-lightgrey)]"
      />
      <button type="submit" className="absolute left-2 my-auto hover:cursor-pointer">
        <FaSearch className="text-gray-400" />
      </button>
    </form>
  );
}

export default SearchBar;