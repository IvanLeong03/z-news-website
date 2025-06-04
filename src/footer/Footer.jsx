import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

function Footer() {

    const { language } = useLanguage();

    return (
        <>
        <footer className="w-full h-[16rem] flex items-center relative bottom-0 justify-center mx-auto border-t border-[rgba(37,37,37,0.75)]">
            <div className="flex w-3/5 justify-between">
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
        </>
    )
}

export default Footer;