import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import Carousel from "./Carousel";
import { fetchAbout } from "../services/infoService";
import video1 from "/src/assets/aboutUsVideo.mp4"

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function lerp(a, b, t) { return a + (b - a) * t; }

function AboutUs() {
    const { language, setLanguage } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [about, setAbout] = useState();
    const [error, setError] = useState(null);

    const heroRef = useRef(null);
    const cardRef = useRef(null);
    const rafRef = useRef(null);

    const [sectionStyle, setSectionStyle] = useState({ width: '65%', opacity: 0.5 });

    // animated state for the card
    const [cardStyle, setCardStyle] = useState({
        // start fairly small and translucent
        width: "65%",
        opacity: 0.5,
    });

    const labels = {
        about: {
            "en": ["Zone News is the multidimensional news platform of the future,",  " allowing you to collate information from dozens of sources\
             across time and space with ease. We provide balanced, accurate and timely reports on politics, technology, sports and more, across\
             Hong Kong, China and beyond."],
            "zh-Hant": ["Zone News 是面向未來的多維新聞平台，", "讓您輕鬆整合來自數十個來源的跨時空資訊。我們提供涵蓋香港、中國內地及其他地區的政治、科技、體育等內容的均衡、準確、及時的報道。"],
            "zh-Hans": ["Zone News 是面向未来的多维新闻平台，", "让您轻松整合来自数十个来源的跨时空资讯。我们提供涵盖香港、中国内地及其他地区的政治、科技、体育等内容的均衡、准确、及时的报道。"],
        },
        mission: {
            "en": ["Our mission is information: bringing you the stories that matter in a scientific and transparent matter.\
            We seek to pop information bubbles through", " concise, comprehensive and convenient", " reporting, showcasing multiple\
            perspectices of every event."],
            "zh-Hant": ["我們的使命是訊息：以科學透明的方式為您帶來重要新聞。我們力求透過", "簡潔、全面、便利", "的報道，展現每個事件的多重視角，打破資訊泡沫。"],
            "zh-Hans": ["我们的使命是信息：以科学透明的方式为您带来重要新闻。我们力求,", "通过简洁、全面、便捷", "的报道，展现每个事件的多重视角，打破信息泡沫。"],
        },
    };

    useEffect(() => {
        const loadAbout = async () => {
            try {
                const backendLang = mapFrontendLangToBackend(language);
                const aboutUsInfo = await fetchAbout(backendLang);
                setAbout(aboutUsInfo);
            } catch (e) {
                setError(e.message || "Failed to load about data");
            } finally {
                setLoading(false);
            }
        };        
        loadAbout();
    }, [language]);

     // Set a viewport-relative overlap once, and on resize
    useEffect(() => {
        const setOverlap = () => {
        // 12vh, but keep sane limits across tiny/huge screens
        const overlap = Math.round(
            clamp(window.innerHeight * 0.12, 80, 280) // px
        );
        document.documentElement.style.setProperty("--overlap", `${overlap}px`);
        };
        setOverlap();
        window.addEventListener("resize", setOverlap);
        return () => window.removeEventListener("resize", setOverlap);
    }, []);

    // Scroll-driven width/opacity based on progress past the hero
    const onScroll = useCallback(() => {
        if (rafRef.current) return; // throttle to rAF
        rafRef.current = requestAnimationFrame(() => {
            rafRef.current = null;

            const hero = heroRef.current;
            if (!hero) return;

            const heroRect = hero.getBoundingClientRect();
            const viewportH = window.innerHeight;

            // progress: 0 when we're at top of page, rising to 1 by the time the hero is mostly scrolled past
            // You can tune the start/end points:
            const start = viewportH * 0.10;     // when the card just peeks
            const end   = viewportH * 0.70;     // when it should be fully expanded
            const y = viewportH - heroRect.bottom; // how much of hero bottom has gone past the viewport bottom
            const t = clamp((y - start) / (end - start), 0, 1);

            // map t → width/opacity
            const widthPct = lerp(65, 100, t); // 65% → 96%
            const opacity  = lerp(0.5, 1, t); // 0.5 → 1

            setCardStyle({
                width: `${widthPct}%`,
                opacity,
            });
        });
    }, []);

    useEffect(() => {
        onScroll(); // set initial
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [onScroll]);


    return (
        <main className="flex-col w-full justify-center items-center text-center">            
            {/* hero */}
            <section
                ref={heroRef}
                className="relative w-full overflow-hidden"
                // Give the hero a sane, scalable height
                style={{
                    height: "clamp(60vh, 80vh, 92vh)",
                }}            
            >
                <video
                src={video1}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                />
                <h1 className="absolute top-[40%] left-[50%] -translate-x-1/2 text-6xl text-[var(--color-gs-white)] font-bold">The Future of <br/>News-reading</h1>
            </section>

            <section
                ref={cardRef}
                className="relative z-10 bg-white rounded-lg text-base 2xl:text-lg mx-auto pt-12 px-2 text-[var(--color-gs-black)] will-change-transform will-change-opacity"
                style={{
                transform: "translateY(calc(var(--overlap, 140px) * -1))",
                width: cardStyle.width,
                opacity: cardStyle.opacity,
                transition: "width 200ms linear, opacity 200ms linear", // small smoothing between rAF steps
                }}
            >
                <h2 className="text-2xl 2xl:text-3xl font-semibold my-12 mx-auto">Your one stop, multi-dimensional news platform.</h2>
                {error && <p className="text-[var(--color-secondary-1)]">{error}</p>} 
                {/* fetched from backend */}            
                {about && (
                    <p className="text-[var(--color-secondary-1)]">
                        {about}  (taken from the backend: https://api.zonenews.io/dev/info/aboutus)
                    </p>
                )}
                <div className="w-2/3 mx-auto flex justify-evenly items-start space-x-16 my-8">
                    <p className="text-left px-4">
                        <span className="text-[var(--color-primary)]">{labels.about[language][0]}</span>
                        <span>{labels.about[language][1]}</span>
                    </p>
                    <p className="text-left px-4 pt-24">
                        <span>{labels.mission[language][0]}</span>
                        <span className="text-[var(--color-primary)]">{labels.mission[language][1]}</span>
                        <span>{labels.mission[language][2]}</span>
                    </p>
                </div> 

                <Carousel /> 
            </section>        

            <section className="min-h-[30dvh]">
                {/* about team members + origin + extra info*/}
            </section>
                             
        </main>
    )


};

export default AboutUs