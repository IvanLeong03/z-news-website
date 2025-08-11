import React from "react";
import { Link, useNavigate } from "react-router-dom";

import SearchBar from "../search/SearchBar";
import { useLanguage } from "../context/LanguageContext";
import { FaUser } from "react-icons/fa";
import EnLogo from "../assets/ZoneNewsLogo/zonenews__logo_secondary_EN.jpg";
import ChLogo from "../assets/ZoneNewsLogo/zonenews__logo_secondary_CH.jpg";


function Navbar() {
    const { language } = useLanguage(); 
    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col">
            <div className="flex w-full justify-center space-x-6 text-sm text-center bg-black p-1 text-[#fefefe]">
                <label>
                    {new Date().toLocaleDateString("en-GB", 
                        {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })
                    }
                </label>
                <label>
                    {new Date().toLocaleDateString("en-GB", {weekday: "long",})}
                </label>
                {/* should we show the time, and how should we handle refreshes
                <label>
                    {new Date().toLocaleTimeString("en-GB", {timeStyle: "short",})}
                </label>
                */}
            </div>

            <nav className="w-9/10 mx-auto flex items-center px-1 h-[24vh] max-h-[14rem]">
                {/* Left: Logo */}
                <Link to="/">
                    <div className="flex items-center flex-none max-w-[24vw] space-x-2">                    
                        <img                             
                        src={language === "zh-Hant" || language === "zh-Hans" ? ChLogo : EnLogo}
                        alt="Logo" className="h-24 lg:h-32 max-h-[16rem]"/>                                       
                    </div>
                </Link>

                {/* Center: Nav Links */}
                <div className="flex flex-grow justify-center">
                    <ul className="flex space-x-8 lg:space-x-16 text-base lg:text-lg">
                        <li>
                            <Link to="/today">
                                {language === "zh-Hant" ? "今日頭條" : language === "zh-Hans" ? "今日头条" : "TODAY"}
                            </Link>
                        </li>
                        <li>
                            <Link to="/hk">
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
                                {language === "zh-Hant" ? "個人推薦" : language === "zh-Hans" ? "个人推荐" : "FOR YOU"}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right: Search and Account */}
                <div className="flex items-center flex-none max-w-[20vw] space-x-4 relative">
                    <SearchBar />
                    <div className="relative group">
                        <button
                            className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                            aria-label="Account"
                        >
                            <FaUser />
                        </button>
                        <ul className="hidden group-hover:flex group-focus-within:flex flex-col absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <li>
                                <Link to="/login" className="block px-4 py-2 font-bold hover:bg-gray-100">Login / Logout</Link>
                            </li>
                            <li>
                                <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">Account Overview</Link>
                            </li>
                            {/* 
                            <li>
                                <Link to="/account/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                            </li>
                            */}
                            <li>
                                <Link to="/account/topics" className="block px-4 py-2 hover:bg-gray-100">My Topics</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;