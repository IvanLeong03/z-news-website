import React from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "../search/SearchBar";
import { useLanguage } from "../context/LanguageContext";
import { FaUser } from "react-icons/fa";

function Navbar() {
    const { language } = useLanguage(); 
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col">
            <div className="flex w-full justify-center space-x-3 text-sm text-center bg-black p-1 text-[#fefefe]">
                <label>
                    {new Date().toLocaleDateString("en-GB", 
                        {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })
                    }
                </label>
                <label>|</label>
                <label>
                    {new Date().toLocaleDateString("en-GB", {weekday: "long",})}
                </label>
            </div>

            <nav className="w-9/10 mx-auto flex items-center px-1 h-[20vh] max-h-[12rem]">
                {/* Left: Logo */}
                <Link to="/">
                    <div className="flex items-center flex-none max-w-[20vw] space-x-2">                    
                        <img src="/logos/logo_icon_turquoise.png" alt="Logo" className="h-16" />
                        <h1 className="text-lg lg:text-2xl font-bold break-words whitespace-normal">
                            Zone News
                        </h1>                   
                    </div>
                </Link>

                {/* Center: Nav Links */}
                <div className="flex flex-grow justify-center">
                    <ul className="flex space-x-8 lg:space-x-16 text-base lg:text-xl">
                        <li>
                            <Link to="/today">
                                {language === "zh-Hant" ? "今日頭條" : language === "zh-Hans" ? "今日头条" : "TODAY"}
                            </Link>
                        </li>
                        <li>
                            <Link to="/hongkong">
                                {language === "zh-Hant" ? "香港" : language === "zh-Hans" ? "香港" : "HONG KONG"}
                            </Link>
                        </li>
                        <li>
                            <Link to="/china">
                                {language === "zh-Hant" ? "中國" : language === "zh-Hans" ? "中国" : "CHINA"}
                            </Link>
                        </li>
                        <li>
                            <Link to="/for-you">
                                {language === "zh-Hant" ? "為你推薦" : language === "zh-Hans" ? "为你推荐" : "FOR YOU"}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right: Search and Account */}
                <div className="flex items-center flex-none max-w-[20vw] space-x-4">
                    <SearchBar />
                    <button
                        onClick={() => navigate('/account')}
                        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                        aria-label="Account"
                    >
                        < FaUser />
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;