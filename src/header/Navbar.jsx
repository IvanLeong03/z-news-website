import React from "react";

import { Link } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { useLanguage } from "../context/LanguageContext";


function Navbar() {
    const { language } = useLanguage(); 

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

            <nav className="h-[11rem] w-[90%] mx-auto flex items-center px-1">
                {/* Left: Logo */}
                <div className="flex items-center flex-none">
                    <Link to="/">
                    <img src="/logos/z-news-logo.svg" alt="Logo" className="h-16" />
                    </Link>
                </div>

                {/* Center: Nav Links */}
                <div className="flex-grow flex justify-center">
                    <ul className="flex space-x-8 lg:space-x-16 text-lg lg:text-xl">
                        <li className="hover:text-purple-600">
                            <Link to="/today">
                                {language === "zh-Hant" ? "今日頭條" : language === "zh-Hans" ? "今日头条" : "TODAY"}
                            </Link>
                        </li>
                        <li className="hover:text-blue-600">
                            <Link to="/hongkong">
                                {language === "zh-Hant" ? "香港" : language === "zh-Hans" ? "香港" : "HONG KONG"}
                            </Link>
                        </li>
                        <li className="hover:text-red-600">
                            <Link to="/china">
                                {language === "zh-Hant" ? "中國" : language === "zh-Hans" ? "中国" : "CHINA"}
                            </Link>
                        </li>
                        <li className="hover:text-green-600">
                            <Link to="/for-you">
                                {language === "zh-Hant" ? "為你推薦" : language === "zh-Hans" ? "为你推荐" : "FOR YOU"}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right: Search */}
                <div className="flex items-center flex-none">
                    < SearchBar />
                </div>
            </nav>
        </div>
        

  


    )
}

export default Navbar;