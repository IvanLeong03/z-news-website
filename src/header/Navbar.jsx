import React from "react";

import { Link } from "react-router-dom";
import SearchBar from "../search/SearchBar";


function Navbar() {
    return (

        <nav className="h-[18dvh] w-[95dvw] mx-auto flex items-center px-1">
            
            {/* Left: Logo */}
            <div className="flex items-center flex-none">
                <Link to="/">
                <img src="/logos/z-news-logo.svg" alt="Logo" className="h-16" />
                </Link>
            </div>


            {/* Center: Nav Links */}
            <div className="flex-grow flex justify-center">
                <ul className="flex space-x-8 lg:space-x-16 text-lg lg:text-xl">
                <li><Link to="/today" className="hover:text-2xl">TODAY</Link></li>
                <li><Link to="/hongkong" className="hover:text-2xl">HONG KONG</Link></li>
                <li><Link to="/china" className="hover:text-2xl">CHINA</Link></li>
                <li><Link to="/for-you" className="hover:text-2xl">FOR YOU</Link></li>
                </ul>
            </div>

            {/* Right: Search */}
            <div className="flex items-center flex-none">
                < SearchBar />
            </div>
           
         
        
        </nav>

  


    )
}

export default Navbar;