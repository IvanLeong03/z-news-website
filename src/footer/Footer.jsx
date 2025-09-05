import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
    const { language, setLanguage } = useLanguage();    

    return (
        <footer className="w-full h-[25vh] max-h-[10rem] flex flex-col justify-center items-center relative bottom-0 mx-auto border-t border-[rgba(37,37,37,0.75)]">
            <div className="flex items-center space-x-2 my-8">
                <span className="text-base">
                    {language === "en" ? "Language" : language === "zh-Hant" ? "語言" : language === "zh-Hans" ? "语言" : "Language"}:
                </span>
                <button
                    className={`border rounded-xl px-2 py-1 mx-1 ${language === "en" ? "bg-[var(--color-dark-turquoise)] text-white" : ""}`}
                    onClick={() => setLanguage("en")}
                >
                    Eng
                </button>
                <button
                    className={`border rounded-xl px-2 py-1 mx-1 ${language === "zh-Hant" ? "bg-[var(--color-dark-turquoise)] text-white" : ""}`}
                    onClick={() => setLanguage("zh-Hant")}
                >
                    繁
                </button>
                <button
                    className={`border rounded-xl px-2 py-1 mx-1 ${language === "zh-Hans" ? "bg-[var(--color-dark-turquoise)] text-white" : ""}`}
                    onClick={() => setLanguage("zh-Hans")}
                >
                    简
                </button>
            </div> 
            
            <div className="flex w-3/5 mx-auto justify-between items-center">
                <p>Copyright © 2025</p>
                <p>
                <Link to="/about-us" className="hover:text-[var(--color-dark-turquoise)]">
                    {language === 'zh-Hant' ? "關於我們" : language === "zh-Hans" ? "关于我们" : "About us"}
                </Link>                    
                </p>
                <p>
                <Link to="/user-guide" className="hover:text-[var(--color-dark-turquoise)]">
                    {language === 'zh-Hant' ? "使用指引" : language === "zh-Hans" ? "使用指引" : "User Guide"}
                </Link>                    
                </p>
                <p>
                <Link to='/privacy-policy' className="hover:text-[var(--color-dark-turquoise)]" >
                    {language === 'zh-Hant' ? "隱私政策" : language === "zh-Hans" ? "隐私政策" : "Privacy Policy"}
                </Link>                    
                </p>
                <p>
                    <Link to='/terms-and-conditions' className="hover:text-[var(--color-dark-turquoise)]">
                    {language === 'zh-Hant' ? "使用條款" : language === "zh-Hans" ? "使用条款" : "Terms of Use"}
                    </Link>
                </p>
                <p>
                    <Link to='/contact-us' className="hover:text-[var(--color-dark-turquoise)]">
                    {language === 'zh-Hant' ? "聯絡我們" : language === "zh-Hans" ? "联系我们" : "Contact Us"}
                    </Link>
                </p>
                
            </div>

        </footer>
    )
}

export default Footer;