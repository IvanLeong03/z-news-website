import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
    const { language } = useLanguage();
    const location = useLocation();
    const isAboutUs = location.pathname === "/about-us" || location.pathname === "/about-us/";
    
    return (
        <footer className={`w-full h-[20dvh] max-h-[288px] flex flex-col justify-center items-center relative bottom-0 mx-auto ${isAboutUs ? "bg-[var(--color-gs-black)] text-[var(--color-gs-white)]" : "bg-[var(--color-line-grey)] text-[var(-color-text-grey)]"}`}>        
            <div className="flex w-3/5 mx-auto justify-between items-center">
                <p>Copyright © 2025</p>
                <p>
                <Link to="/about-us">
                    {language === 'zh-Hant' ? "關於我們" : language === "zh-Hans" ? "关于我们" : "About us"}
                </Link>                    
                </p>
                <p>
                <Link to="/user-guide">
                    {language === 'zh-Hant' ? "使用指引" : language === "zh-Hans" ? "使用指引" : "User Guide"}
                </Link>                    
                </p>
                <p>
                <Link to='/privacy-policy' >
                    {language === 'zh-Hant' ? "隱私政策" : language === "zh-Hans" ? "隐私政策" : "Privacy Policy"}
                </Link>                    
                </p>
                <p>
                    <Link to='/terms-and-conditions'>
                    {language === 'zh-Hant' ? "使用條款" : language === "zh-Hans" ? "使用条款" : "Terms of Use"}
                    </Link>
                </p>
                <p>
                    <Link to='/contact-us'>
                    {language === 'zh-Hant' ? "聯絡我們" : language === "zh-Hans" ? "联系我们" : "Contact Us"}
                    </Link>
                </p>                
            </div>

        </footer>
    )
}

export default Footer;