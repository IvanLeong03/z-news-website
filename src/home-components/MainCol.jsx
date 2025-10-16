import { useState, useEffect, useRef } from "react";
import HeadlineLg from "./HeadlineLg";
import HeadlineSm from "./HeadlineSm";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchFeed } from "../services/feedService";
import { fetchArticle } from "../services/articleService";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../maincol-swiper.css";

function MainCol() {
    const { language } = useLanguage();
    const [headlineArticles, setHeadlineArticles] = useState([]);
    const [subArticles, setSubArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const AUTOPLAY_MS = 6000;
    const swiperRef = useRef(null);

    useEffect(() => {
        const loadArticles = async () => {
        try {
            const backEndLang = mapFrontendLangToBackend(language);
            const results = await fetchFeed("today", backEndLang);

            const headlines = results.headlines || [];
            const detailed = await Promise.all(
            headlines.map(h => fetchArticle(h.articleID, backEndLang))
            );

            setHeadlineArticles(detailed);
            setSubArticles(results.articles || []);
        } catch (err) {
            console.error("Failed to load articles:", err);
            setError(err.message || "Failed to load");
        } finally {
            setLoading(false);
        }
        };
        loadArticles();
    }, [language]);

    if (loading) return <div>Loading articles...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="w-full flex flex-col justify-start items-center my-6 border-r border-[var(--color-line-grey)]">
        {/* Headlines carousel with progress bullets */}
        <div className="relative w-full mb-4">
            <Swiper
            modules={[Pagination, Autoplay]}
            onBeforeInit={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            loop={headlineArticles.length > 1}
            speed={500}
            autoplay={{
                delay: AUTOPLAY_MS,
                disableOnInteraction: false,
            }}
            // This custom property drives the bullet progress duration
            style={{ "--bullet-duration": `${AUTOPLAY_MS}ms` }}
            pagination={{
                clickable: true,
                renderBullet: (index, className) =>
                `<span class="${className} bullet"><span class="bullet-fill"></span></span>`,
            }}
            className="w-full maincol-swiper"
            >
            {headlineArticles.map((article) => (
                <SwiperSlide key={article.articleID} className="pb-8">
                <Link to={`/article/${article.articleID}`}>
                    <HeadlineLg article={article} />
                </Link>
                </SwiperSlide>
            ))}
            </Swiper>
        </div>

        {/* Sub-articles */}
        <div className="mb-8 px-2 mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-stretch">
            {Array.isArray(subArticles) &&
                subArticles.map((article) => (
                <div key={article.articleID} className="flex flex-grow flex-col justify-start items-center mx-auto p-2">
                    <Link to={`/article/${article.articleID}`}>
                    <HeadlineSm article={article} />
                    </Link>
                </div>
                ))}
            </div>
            <div className="flex justify-center my-6">
            <button className="relative px-2 rounded hover:text-[var(--color-primary)]">
                {language === "zh-Hant" ? "查看更多" : language === "zh-Hans" ? "查看更多" : " Load more"}...
            </button>
            </div>
        </div>
        </div>
    );
}

export default MainCol;
