import React from "react";

import { Link } from "react-router-dom";
import SearchBar from "../search/SearchBar";


function Navbar() {
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

            <nav className="h-[18dvh] w-[95dvw] mx-auto flex items-center px-1">
                
                {/* Left: Logo */}
                <div className="flex items-center flex-none">
                    <Link to="/">
                    <img src="/logos/z-news-logo.svg" alt="Logo" className="h-16" />
                    </Link>
                </div>


                {/* Center: Nav Links */}
                <div className="flex-grow flex justify-center">
                    <ul className="flex space-x-8 lg:space-x-16 text-xl lg:text-2xl">
                    <li className="font-semibold hover:text-purple-600"><Link to="/today">TODAY</Link></li>
                    <li className="font-semibold hover:text-blue-600"><Link to="/hongkong" >HONG KONG</Link></li>
                    <li className="font-semibold hover:text-red-600"><Link to="/china">CHINA</Link></li>
                    <li className="font-semibold hover:text-green-600"><Link to="/for-you">FOR YOU</Link></li>
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