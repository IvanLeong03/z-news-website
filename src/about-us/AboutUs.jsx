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
    const labels = {
        about: {
            "en": "Zone News is the multidimensional news platform of the future, allowing you to collate information from dozens of sources\
             across time and space with ease. We provide balanced, accurate and timely reports on politics, technology, sports and more, across\
             Hong Kong, China and beyond.",
            "zh-Hant": "Zone News 是面向未來的多維新聞平台，讓您輕鬆整合來自數十個來源的跨時空資訊。我們提供涵蓋香港、中國內地及其他地區的政治、科技、體育等內容的均衡、準確、及時的報道。",
            "zh-Hans": "Zone News 是面向未来的多维新闻平台，让您轻松整合来自数十个来源的跨时空资讯。我们提供涵盖香港、中国内地及其他地区的政治、科技、体育等内容的均衡、准确、及时的报道。",
        },
        mission: {
            "en": "Our mission is information: bringing you the stories that matter in a scientific and transparent matter.\
            We seek to pop information bubbles through concise, comprehensive and convenient reporting, showcasing multiple\
            perspectices of every event.",
            "zh-Hant": "我們的使命是訊息：以科學透明的方式為您帶來重要新聞。我們力求透過簡潔、全面、便利的報道，展現每個事件的多重視角，打破資訊泡沫。",
            "zh-Hans": "我们的使命是信息：以科学透明的方式为您带来重要新闻。我们力求通过简洁、全面、便捷的报道，展现每个事件的多重视角，打破信息泡沫。",
        },
    };

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
                className="relative bg-gradient-to-b from-[var(--color-light-turquoise)] to-[var(--color-dark-turquoise)] rounded-lg text-base 2xl:text-lg mx-auto z-20 -mt-[10rem] pt-24 px-2 text-[var(--color-gs-black)]"
                style={sectionStyle}
            >   
                {/* fetched from backend */}            
                {about && (
                    <p className="text-center my-8 w-1/2 mx-auto text-[var(--color-secondary-1)]">
                        {about}
                    </p>
                )}
                <p className="text-left my-12 w-1/2 mx-auto ">
                    {labels.about[language]}
                </p>
                <p className="text-left my-8 w-1/2 mx-auto">
                    {labels.mission[language]}
                </p>    
                <p className="text-left text-sm mt-16 mb-8 w-1/3 mx-auto">
                    Our other flagship product, Zimuth Terminal, is an AI-powered Media Monitoring assistant that was designed for communication
                    firms. To learn more, please visit <a href="https://zimuth.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">zimuth.ai</a>.
                </p>    
                <Carousel />                               
            </div>     
                             
        </main>
    )


};

export default AboutUs