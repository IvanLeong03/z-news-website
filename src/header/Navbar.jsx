import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { useLanguage } from "../context/LanguageContext";
import { FaUser } from "react-icons/fa";
import EnLogo from "../assets/ZoneNewsLogo/zonenews__logo_primary_EN.jpg";
import ChLogo from "../assets/ZoneNewsLogo/zonenews__logo_primary_CH.jpg";
import { mapFrontendLangToBackend } from "../context/LangConverter";


function Navbar() {
    const { language } = useLanguage(); 
    const navigate = useNavigate();
    const locale = mapFrontendLangToBackend(language);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 100); // adjust threshold as needed
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="sticky top-0 z-50 w-full flex flex-col">
            <div className="flex w-full justify-center space-x-6 text-sm text-center bg-black p-1 text-[#fefefe]">
                <label>
                    {new Date().toLocaleDateString(locale, 
                        {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        })
                    }
                </label>
                <label>
                    {new Date().toLocaleDateString(locale, {weekday: "long",})}
                </label>
            </div>

            <nav 
                className={`w-full grid grid-cols-[1fr_3fr_1fr] px-16 bg-[var(--color-gs-white)] border-[var(--color-line-lightgrey)] transition-all duration-300 ${
                    isScrolled ? "py-0 border-b" : "py-8 border-b-2"
                }`}
        >
                {/* Left: Logo */}
                <Link to="/">
                    <div>                    
                        <img                             
                        src={language === "zh-Hant" || language === "zh-Hans" ? ChLogo : EnLogo}
                        alt="Logo"
                        className="h-24"
                        />                                       
                    </div>
                </Link>

                {/* Center: Nav Links */}
                <div className="flex justify-center items-center">
                    <ul className="flex space-x-8 lg:space-x-16 text-base lg:text-lg">
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
                                {language === "zh-Hant" ? "個人推薦" : language === "zh-Hans" ? "个人推荐" : "RECOMMENDED"}
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Right: Search and Account */}
                <div className="flex items-center px-2 space-x-4 relative">
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
                                <Link to="/login" className="block px-4 py-2 font-bold hover:bg-gray-100">
                                    {language === "zh-Hant" ? "登入" : language === "zh-Hans" ? "登录" : "Login"}
                                </Link>
                            </li>
                            <li>
                                <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">
                                    {language === "zh-Hant" ? "帳戶設定" : language === "zh-Hans" ? "账户设置" : "Profile settings"}
                                </Link>
                            </li>
                            <li>
                                <Link to="/account/topics" className="block px-4 py-2 hover:bg-gray-100">
                                    {language === "zh-Hant" ? "追蹤主題" : language === "zh-Hans" ? "追踪主题" : "My Topics"}                                
                                </Link>
                            </li>
                            <li>
                                <Link to="/account/topics" className="block px-4 py-2 hover:bg-gray-100">
                                    {language === "zh-Hant" ? "個人數據" : language === "zh-Hans" ? "个人数据" : "My Statistics"} (N/A)                                
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;