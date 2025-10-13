import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "/src/assets/ZoneNewsLogo/zonenews__logo_secondary_EN.jpg";
import { MdClose } from "react-icons/md";

const LandingPage = () => {

    return (
        <main className="landing-page w-dvw min-h-dvh text-[var(--color-gs-white)] bg-[var(--color-primary)] overflow-scroll py-8 lg:py-24 px-2 lg:px-8 flex items-center">
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-semibold text-2xl lg:text-3xl my-4">Welcome to Zone News</h1>
                <p>Download the app from the App Store/Google Play</p>
                {/* Add more content as needed */}
                <div className="w-3/4 lg:w-1/3 mx-auto my-8">
                    <img src={img1} />
                </div>
                <div className="w-3/4 lg:w-1/3 mx-auto my-8">
                    <img src={img1} />
                </div>
            </div>
            <div className="absolute top-4 right-4">
                <button>
                    <Link to={"/home"}>
                        <MdClose size={24} />
                    </Link>                    
                </button>
            </div>
            
        </main>
    );
};

export default LandingPage;
