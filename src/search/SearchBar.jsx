import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { fetchTrendingSearch } from "../services/searchService";
import { mapFrontendLangToBackend } from "../context/LangConverter";

function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const [open, setOpen] = useState(false);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [highlighted, setHighlighted] = useState(-1);

    const { language } = useLanguage();
    const navigate = useNavigate();
    const wrapperRef = useRef(null);

    const loadTrending = useCallback(async () => {
        if (trending.length || loading) return;
        try {
        setLoading(true);
        setError(null);
        const backendLang = mapFrontendLangToBackend(language);
        const articles = await fetchTrendingSearch(backendLang);
        setTrending(Array.isArray(articles) ? articles.slice(0, 8) : []);
        } catch (e) {
        setError(e.message || "Failed to load trending");
        } finally {
        setLoading(false);
        }
    }, [language, trending.length, loading]);

    const handleFocus = () => {
        setOpen(true);
        loadTrending();
    };

    useEffect(() => {
        const onClickOutside = (e) => {
        if (!wrapperRef.current?.contains(e.target)) {
            setOpen(false);
            setHighlighted(-1);
        }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim() !== "") {
        navigate(`/search?q=${encodeURIComponent(searchInput)}`);
        }
        setOpen(false);
    };

    const selectTrending = (title) => {
        setSearchInput(title);
        navigate(`/search?q=${encodeURIComponent(title)}`);
        setOpen(false);
    };

    const collapsedW = "w-24 md:w-32";
    const expandedW = "w-48 md:w-64";

    return (
        <div
        ref={wrapperRef}
        className={`relative ${collapsedW} overflow-visible`}
        role="combobox"
        aria-expanded={open}
        >
        {/* Input container (fixed height) */}
            <form
                onSubmit={handleSearch}
                className={`absolute right-0 top-1/2 -translate-y-1/2 ${open ? expandedW : collapsedW} transition-[width] duration-300 ease-in-out
                 flex items-center rounded-xl border border-[var(--color-line-darkgrey)] bg-white ${
                open ? "shadow-md" : ""
                }`}
            >
                <FaSearch className="absolute left-3 text-gray-400 pointer-events-none" />
                <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onFocus={handleFocus}
                autoComplete="off"
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-transparent focus:outline-none focus:ring-1 focus:ring-[var(--color-line-darkgrey)]"
                placeholder={
                    language === "zh-Hant" ? "搜尋" : language === "zh-Hans" ? "搜索" : "Search"
                }
                />
            </form>

        {/* Popdown – expands *below* the input */}
            <div
                className={`absolute right-0 top-full mt-5 ${open ? expandedW : collapsedW} transition-[width] duration-300 ease-in-out
                  bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden origin-top 
                   ${ open ? "max-h-80 opacity-100 scale-y-100" : "max-h-0 opacity-0 scale-y-0"}`
                }
            >
                <div className="px-3 pt-2 text-xs text-[var(--color-text-lightgrey)]">
                    {language.startsWith("zh") ? "熱門搜尋" : "Trending searches"}
                </div>

                <div className="max-h-64 overflow-auto pb-2">
                    {loading ? (
                        <ul className="p-2 space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <li key={i} className="h-4 bg-gray-200 rounded motion-safe:animate-pulse" />
                        ))}
                        </ul>
                    ) : error ? (
                        <div className="px-3 py-2 text-sm text-red-600">{error}</div>
                    ) : trending.length ? (
                        <ul role="listbox">
                        {trending.map((a, i) => (
                            <li key={a.articleID ?? i}>
                            <button
                                type="button"
                                onMouseEnter={() => setHighlighted(i)}
                                onMouseLeave={() => setHighlighted(-1)}
                                onClick={() => selectTrending(a.title)}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                highlighted === i ? "bg-gray-100" : ""
                                }`}
                                title={a.title}
                            >
                                {a.title}
                            </button>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">
                            {language.startsWith("zh") ? "暫無資料" : "No trending now"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchBar;
