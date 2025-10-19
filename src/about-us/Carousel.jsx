import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Img1 from "/src/assets/ZoneNewsLogo/zonenews_logo_secondary_EN_WHITE.png";
import FilterImg from "/src/assets/filter-image.webp";

const Carousel = () => {
    const carouselSlides = [
        {
            slideImg: Img1,
            slideHeading: "AI Context",
            slideDesc: "Understand everything, without gaps",
            bottomText: "We provide the full backstory to every news event.",
        },
        {
            slideImg: Img1,
            slideHeading: "In-depth analytics",
            slideDesc: "Media bias, stance and distribution",
            bottomText: "Understand different perspectives on important stories and develop a nuanced understanding.",
        },
        {
            slideImg: Img1,
            slideHeading: "Personalized experience",
            slideDesc: "Follow everything you want (literally)",
            bottomText: "We offer custom tags in addition to the defaults to premium users. Stay updated on any topic."
        },
        {
            slideImg: Img1,
            slideHeading: "Feel the event",
            slideDesc: "Media sentiment quantified",
            bottomText: "We carry out text analysis to calculate the overall tone.",
        },
        {
            slideImg: Img1,
            slideHeading: "Significance",
            slideDesc: "Know the things you must know",
            bottomText: "DALY (life-years) and economic impact analysis for every event.",
        },
    ];

    const loopedSlides = [];
    while (loopedSlides.length < 100) {
        loopedSlides.push(...carouselSlides);
    }
    const controls = useAnimation();
    const [currentX, setCurrentX] = useState(0); // Store current x coordinate to change speed while staying in place
    const [speed, setSpeed] = useState(-1.25); // Speed in percentage
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateAnimation = () => {
            const newSpeed = isHovered ? speed*0.3 : speed;
            controls.start({
                x: [currentX, currentX + newSpeed],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 180,
                        ease: "linear",
                    },
                },
            });
            setCurrentX(currentX + newSpeed);
        };

        const interval = setInterval(updateAnimation, 1000 / 60); // Update 60 times per second

        return () => clearInterval(interval);
    }, [controls, currentX, speed, isHovered]);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="w-full relative py-8">
            <h2 className="w-2/3 mx-auto text-left text-2xl 2xl:text-3xl font-semibold mb-16 mt-4 text-[var(--color-gs-white)]">
                A new way of reading news
            </h2>
            <div className="overflow-hidden w-full">
                <motion.div
                  className="flex"
                  animate={controls}
                  style={{
                    width: `${loopedSlides.length * 25}%`, // Adjust width based on the number of slides
                  }}
                >
                    {loopedSlides.map((slide, index) => (
                      <div
                        key={index}
                        className="mx-2"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="relative overflow-hidden cursor-pointer rounded-md h-[40dvh] w-[25dvw] mx-2 shadow-lg z-1 transition-transform duration-300 ease-in-out hover:brightness-90">
                            <div className="absolute inset-0 w-full h-full overflow-hidden">
                                <img
                                  src={slide.slideImg}
                                  alt={slide.slideHeading}
                                  className="w-full h-full object-cover transition-all duration-300 ease-in-out"
                                />
                            </div>

                            {/* Filter image layer */}
                            <div className="absolute inset-0 bg-blend-overlay opacity-45 brightness-75">
                                <img
                                  src={FilterImg}
                                  alt="Filter"
                                  className="w-full h-full object-cover"
                                />
                            </div>
                            {/* text */}
                            <div className="absolute inset-0 p-4 2xl:p-8 flex flex-col justify-between z-10">
                                <div className="px-2">
                                    <h3 className="text-white text-sm md:text-base 2xl:text-lg">{slide.slideHeading}</h3>
                                    <p className="text-lg md:text-xl 2xl:text-2xl text-darkWhite mt-2 font-semibold">
                                        {slide.slideDesc}
                                    </p>
                                </div>
                                {/* Bottom text */}
                                <div className="px-4 py-2">
                                    <p className="text-sm md:text-base 2xl:text-lg text-ellipsis">
                                        {slide.bottomText}
                                    </p>
                                </div>
                            </div>
                        </div>
                      </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Carousel;
