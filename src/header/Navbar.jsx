import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../search/SearchBar";
import { useLanguage } from "../context/LanguageContext";
import { FaUser } from "react-icons/fa";
import EnLogo from "../assets/ZoneNewsLogo/zonenews__logo_primary_EN.jpg";
import ChLogo from "../assets/ZoneNewsLogo/zonenews__logo_primary_CH.jpg";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { BsGlobe } from "react-icons/bs";


function Navbar() {
    const { language, setLanguage } = useLanguage();    
    const navigate = useNavigate();
    const locale = mapFrontendLangToBackend(language);
    const [isScrolled, setIsScrolled] = useState(false);
    const lastStateRef = useRef(false);
    const tickingRef = useRef(false);
    const LANGS = [
        { code: "en", label: "English" },
        { code: "zh-Hant", label: "繁體中文" },
        { code: "zh-Hans", label: "简体中文" },
    ];

    useEffect(() => {
        const UPPER = 120; // turn scrolled ON past here
        const LOWER = 80;  // turn scrolled OFF above here (hysteresis)

        const onScroll = () => {
        const y = window.scrollY || window.pageYOffset || 0;
        if (tickingRef.current) return;

        tickingRef.current = true;
        window.requestAnimationFrame(() => {
            const next =
            y > UPPER ? true :
            y < LOWER ? false :
            lastStateRef.current; // stay as-is inside the band

            if (next !== lastStateRef.current) {
            lastStateRef.current = next;
            setIsScrolled(next);
            }
            tickingRef.current = false;
        });
        };

        // run once to set initial state and attach listener
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="sticky top-0 z-50 w-full flex flex-col">
            {/* date and time bar */}
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
            {/* main nav bar */}
            <nav
                className={`w-full bg-[var(--color-gs-white)]
                border-b border-[var(--color-line-darkgrey)] transition-all duration-300
                ${isScrolled ? "py-0 border-opacity-100 shadow-md" : "py-4 border-opacity-60"}`}
            >
                <div className="w-4/5 max-w-[2048px] mx-auto grid grid-cols-[1fr_3fr_1fr]">
                    {/* Left: Logo */}
                    <Link to="/home">
                        <div>                    
                            <img                             
                            src={language === "zh-Hant" || language === "zh-Hans" ? ChLogo : EnLogo}
                            alt="Logo"
                            />                                       
                        </div>
                    </Link>

                    {/* Center: Nav Links */}
                    <div className="w-3/5 mx-auto flex items-center">
                        <ul className="w-full flex justify-between text-lg 2xl:text-xl">
                            <li>
                                <Link to="/hk">
                                    {language === "zh-Hant" ? "香港" : language === "zh-Hans" ? "香港" : "Hong Kong"}
                                </Link>
                            </li>
                            <li>
                                <Link to="/china">
                                    {language === "zh-Hant" ? "中國" : language === "zh-Hans" ? "中国" : "China"}
                                </Link>
                            </li>
                            <li className="text-[var(--color-primary)] font-semibold">
                                <Link to="/for-you">
                                    {language === "zh-Hant" ? "個人專屬" : language === "zh-Hans" ? "个人专属" : "Personal"}
                                </Link>
                            </li>
                            <li className="text-[var(--color-gs-black]">
                                <Link to="/recap">
                                    {language === "zh-Hant" ? "回顧" : language === "zh-Hans" ? "回顾" : "Recap"}                           
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Right: Search and Account */}
                    <div className="flex items-center justify-center px-2 space-x-4 relative">
                        <SearchBar />
                        {/* account */}
                        <div className="relative group">
                            <button
                                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                                aria-label="Account"
                            >
                                <FaUser />
                            </button>
                            <ul className="hidden group-hover:flex group-focus-within:flex flex-col absolute right-0 w-48 bg-[var(--color-gs-white)] border border-gray-200 rounded-lg shadow-lg z-50 text-center">
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
                                {/*
                                <li>
                                    <Link to="/recap" className="block px-4 py-2 hover:bg-gray-100">
                                        {language === "zh-Hant" ? "回顧" : language === "zh-Hans" ? "回顾" : "Recap"}                              
                                    </Link>
                                </li>
                                */}
                            </ul>
                        </div>
                        {/* language */}
                        <div className="relative group">
                            <button
                                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                                aria-label="Account"
                            >
                                <BsGlobe />
                            </button>
                            <ul className="hidden group-hover:flex group-focus-within:flex flex-col absolute right-0 w-36 bg-[var(--color-gs-white)] border border-gray-200 rounded-lg shadow-lg z-50 text-center">
                                {LANGS.map(({ code, label }) => {
                                    const selected = language === code;
                                    return (
                                        <button
                                        key={code}                                
                                        onClick={() => setLanguage(code)}
                                        className={`px-4 py-2 hover:bg-[var(--color-bg-grey)] flex justify-between ${
                                            selected
                                            ? "underline decoration-2 underline-offset-4 font-semibold text-[var(--color-primary)]"
                                            : ""
                                        }`}
                                        >
                                        {label}                                        
                                        </button>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>                                
            </nav>
        </div>
    )
}

export default Navbar;