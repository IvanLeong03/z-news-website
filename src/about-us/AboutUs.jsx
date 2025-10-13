import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import Carousel from "./Carousel"; // Assuming you have a Carousel component
import { fetchAbout } from "../services/infoService";
import video1 from "/src/assets/aboutUsVideo.mp4"

function AboutUs() {
    const { language, setLanguage } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [about, setAbout] = useState();
    const [sectionStyle, setSectionStyle] = useState({ width: '65%', opacity: 0.5 });

    useEffect(() => {
        const loadAbout = async () => {
        try {
            const backendLang = mapFrontendLangToBackend(language);
            const aboutUsInfo = await fetchAbout(backendLang);
            setAbout(aboutUsInfo);
        } catch (error) {
            console.error("Failed to load topics:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
        };        
        loadAbout();
    }, [language]);

    if (error) return <div className="text-red-500">Error: {error}</div>;

    useEffect(() => {
        function handleScroll() {
            const scrollY = window.scrollY;
            const newWidth = Math.min(100, 65 + (scrollY / 10)) + '%';
            const newOpacity = scrollY > 500 ? 1 : Math.min(0.5 + (scrollY / 1000));
            setSectionStyle({ width: newWidth, opacity: newOpacity });
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="flex-col w-full mx-auto justify-center items-center text-center">            
            <video
                src={video1}
                className="w-full shadow-lg z-10 aspect-auto"
                autoPlay
                muted
                loop
            />

            <div
                className="relative bg-[var(--color-light-turquoise)] rounded-lg text-lg 2xl:text-xl mx-auto z-20 -mt-[20rem] pt-32 px-2 text-[var(--color-gs-black)]"
                style={sectionStyle}
            >   
                {/* fetched from backend */}            
                {about && (
                    <p className="text-center my-8 w-1/2 mx-auto text-[var(--color-secondary-1)]">
                        {about}
                    </p>
                )}
                <p className="text-left my-12 w-2/3 mx-auto">
                    Zone News is your comprehensive source for the latest news from around the world. We provide balanced,
                    accurate and timely reporting on politics, technology, sport and more.
                </p>
                <p className="text-left my-8 w-2/3 mx-auto">
                    Our mission is to keep you informed with quality journalism and diverse persepctives on the stories that matter most.
                </p>    
                <p className="text-left text-sm mt-16 mb-8 w-2/3 mx-auto">
                    Our other flagship product, Zimuth Terminal, is an AI-powered Media Monitoring assistant that was designed for communication
                    firms. To learn more, please visit <a href="https://zimuth.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">zimuth.ai</a>.
                </p>    
                <Carousel />                               
            </div>     
                             
        </main>
    )


};

export default AboutUs