import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Img1 from "/src/assets/react.svg";
import FilterImg from "/src/assets/filter-image.webp";

const Carousel = () => {
  const carouselSlides = [
    {
      slideImg: Img1,
      slideHeading: "Global Coverage",
      slideDesc: "Global Coverage",
      bottomText: "We provide news from Hong Kong, China and around the world.",
    },
    {
      slideImg: Img1,
      slideHeading: "Personalized Recommendations",
      slideDesc: "Personalized Recommendations",
      bottomText: "Articles tailored to your interests an reading history, selected by our AI algorithms.",
    },
    {
      slideImg: Img1,
      slideHeading: "Powerful Search",
      slideDesc: "Powerful Search",
      bottomText: "Find specific news articles and topics quickly."
    },
    {
      slideImg: Img1,
      slideHeading: "Coverage Analysis",
      slideDesc: "Coverage Analysis",
      bottomText: "Understand different perspectives on important stories.",
    },
    {
      slideImg: Img1,
      slideHeading: "Reading History",
      slideDesc: "Reading History",
      bottomText: "Keep track of articles you've read so you can revisit them, and your activity helps optimise our recommendations.",
    },
  ];

  const loopedSlides = [...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides, ...carouselSlides];
  const controls = useAnimation();
  const [currentX, setCurrentX] = useState(0); // Store current x coordinate to change speed while staying in place
  const [speed, setSpeed] = useState(-1.8); // Speed in percentage
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const updateAnimation = () => {
      const newSpeed = isHovered ? speed*0.4 : speed;
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
    <div className="w-full relative py-20 bg-darkWhite">
      <h2 className="w-full text-center text-[1.5rem] md:text-[2.5rem] font-semibold">
        Features
      </h2>
      <div className="relative mt-12 overflow-hidden py-8 w-full">
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
              <div className="relative overflow-hidden rounded-xl cursor-pointer h-[40vh] md:h-[50vh] lg:h-[60vh] xl:h-[70vh] max-h-[650px] w-[70dvw] md:w-[40dvw] xl:w-[25dvw] mx-2 shadow-lg z-1 transition-transform duration-300 ease-in-out hover:brightness-90">
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
                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                  <div className="pl-4 pt-4 flex-grow">
                    <h3 className="text-white text-sm md:text-base xl:text-lg">{slide.slideHeading}</h3>
                    <p className="text-xl md:text-2xl text-darkWhite mt-2 font-semibold">
                      {slide.slideDesc}
                    </p>
                  </div>
                  {/* Bottom text */}
                  <div className="px-4 py-2">
                    <p className="text-xs md:text-sm lg:text-base text-darkWhite text-ellipsis">
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
