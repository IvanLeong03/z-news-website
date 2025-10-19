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

    // animated state for the card
    const [cardStyle, setCardStyle] = useState({
        // start fairly small and translucent
        width: "65%",
        opacity: 0.7,
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
            clamp(window.innerHeight * 0.20, 80, 432) // px
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
            const start = viewportH * -0.10;     // when the card just peeks
            const end   = viewportH * -0.03;     // when it should be fully expanded
            const y = viewportH - heroRect.bottom; // how much of hero bottom has gone past the viewport bottom
            const t = clamp((y - start) / (end - start), 0, 1);0
            // map t → width/opacity
            const widthPct = lerp(65, 100, t); // 65% → 96%
            const opacity  = lerp(0.7, 1, t*2); // 0.5 → 1

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
                className="relative w-full overflow-hidden h-dvh bg-orange-200"
                // Give the hero a sane, scalable height
                //style={{
                //    height: "clamp(80dvh, 90dvh, 100dvh)",
                //}}            
            >
                 
                <video
                    src={video1}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
                
                
                <h1 className="absolute top-[30%] left-[50%] -translate-x-1/2 text-6xl text-[var(--color-gs-white)] font-bold">The Future of <br/>News-reading</h1>
            </section>

            <section
                ref={cardRef}
                className="relative z-10 bg-black text-[var(--color-gs-white)] rounded-lg text-base 2xl:text-lg mx-auto pt-[10dvh] will-change-transform will-change-opacity"
                style={{
                transform: "translateY(calc(var(--overlap, 140px) * -1))",
                width: cardStyle.width,
                opacity: cardStyle.opacity,
                transition: "width 100ms linear, opacity 100ms linear", // small smoothing between rAF steps
                }}
            >
                <div className="w-[65dvw] mx-auto">
                    <h2 className="text-3xl 2xl:text-4xl font-semibold mb-16 mt-8 mx-auto">Your one stop, multi-dimensional news platform.</h2>
                    {error && <p className="text-[var(--color-secondary-1)]">{error}</p>} 
                    {/* fetched from backend */}            
                    {/*about && (
                        <p className="text-yellow-200">
                            {about}  (taken from the backend: https://api.zonenews.io/dev/info/aboutus)
                        </p>
                    )*/}
                    <div className="w-full px-4 flex justify-evenly items-start space-x-20 my-8">
                        <p className="text-left px-8">
                            <span className="text-[var(--color-primary)]">{labels.about[language][0]}</span>
                            <span>{labels.about[language][1]}</span>
                        </p>
                        <p className="text-left px-8 pt-40">
                            <span>{labels.mission[language][0]}</span>
                            <span className="text-[var(--color-primary)]">{labels.mission[language][1]}</span>
                            <span>{labels.mission[language][2]}</span>
                        </p>
                    </div>
                </div>                
                <div className="bg-[var(--color-gs-black)] mt-16">
                    <Carousel /> 
                </div>
            </section>        

            <section className="bg-black text-[var(--color-gs-white)]">
                {/* about team members + origin + extra info*/}
                <div className="w-2/3 mx-auto p-4">
                    <h2 className="text-3xl 2xl:text-4xl font-semibold mb-16">Why we started</h2>
                    <p>
                        I sexually Identify as an Attack Helicopter. Ever since I was a boy I dreamed of soaring over the oilfields dropping hot sticky loads on disgusting foreigners. People say to me that a person being a helicopter is Impossible and I'm fucking retarded but I don't care, I'm beautiful. I'm having a plastic surgeon install rotary blades, 30 mm cannons and AMG-114 Hellfire missiles on my body. From now on I want you guys to call me "Apache" and respect my right to kill from above and kill needlessly. If you can't accept me you're a heliphobe and need to check your vehicle privilege. Thank you for being so understanding.
                    </p>
                </div>
            </section>
                             
        </main>
    )


};

export default AboutUs