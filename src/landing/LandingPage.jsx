import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "/src/assets/ZoneNewsLogo/zonenews__logo_secondary_EN.jpg";
import { MdClose } from "react-icons/md";
import AppStoreButton from "../../public/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg";
import PlayStoreBtn from "/src/assets/GetItOnGooglePlay_Badge_Web_color_English.svg";
import LandingLogo from "/src/assets/ZoneNewsLogo/zonenews__logo_primary_EN.jpg";

const LandingPage = () => {

    return (
        <main className="landing-page w-dvw min-h-dvh text-[var(--color-text-grey)] bg-[var(--color-light)] overflow-scroll py-8 lg:py-24 px-8 flex items-center">
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-semibold text-2xl lg:text-3xl my-4">The Multidimensional News App of the Future</h1>
                <p>Read personalized reports from dozens of sources, with cutting edge data analysis, comprehensive context, AI support, and more</p>
                <div className="flex justify-evenly w-full bg-green-200 my-4">
                    <button>
                        <a href="https://www.zonenews.io" target="blank">
                            <img src={AppStoreButton} />
                        </a>
                    </button>
                    <button className="z-20">
                        <a href="https://www.youtube.com" target="blank">
                            <img src={PlayStoreBtn} />
                        </a>
                    </button>
                </div>

                
                {/* Add more content as needed */}
                <div className="w-3/4 lg:w-1/4 mx-auto my-8">
                    <img src={img1} />
                </div>
                <div className="w-3/4 lg:w-1/4 mx-auto my-8">
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
            <div className="absolute top-0 left-0 w-1/2 md:w-1/4">
                <img src={LandingLogo}/>
            </div>
            
        </main>
    );
};

export default LandingPage;
