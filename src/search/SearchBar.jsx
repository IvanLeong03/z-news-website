import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";

function SearchBar() {
  const [searchInput, setSearchInput] = React.useState("");
  const { language } = useLanguage();
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
        className="transition-all duration-300 ease-in-out w-24 md:w-32 focus:w-48 hover:w-48 pr-4 py-2 pl-8 mr-2 mx-auto border border-[rgba(96,96,96,0.3765)] rounded-xl focus:outline-none focus:ring-1 focus:ring-[var(--color-line-darkgrey)]"
        placeholder={language === "zh-Hant" ? "搜尋" : language === "zh-Hans" ? "搜索" : "Search"}
      />
      <button type="submit" className="absolute left-2 my-auto hover:cursor-pointer">
        <FaSearch className="text-gray-400" />
      </button>
    </form>
  );
}

export default SearchBar;