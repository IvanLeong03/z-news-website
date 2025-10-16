import { useState, useEffect, useRef, useCallback } from "react";
import HeadlineLg from "./HeadlineLg";
import HeadlineSm from "./HeadlineSm";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchFeed } from "../services/feedService";
import { fetchArticle } from "../services/articleService";
import { GrPrevious, GrNext } from "react-icons/gr";

function MainCol() {
    const { language } = useLanguage();
    const [headlineArticles, setHeadlineArticles] = useState([]);
    const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
    const [subArticles, setSubArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const timeoutRef = useRef(null);
    const AUTOPLAY_MS = 7000;
    
    useEffect(() => {
        const loadArticles = async () => {
            try {
                const backEndLang = mapFrontendLangToBackend(language);
                const results = await fetchFeed('today', backEndLang);
                // use 'headlines' to fetch the main articles
                const mainArticleResult = results.headlines; 
                const mainArticlesArray = []; //fetch detailed info for each main article
                for (let i = 0; i < mainArticleResult.length; i++) {
                    mainArticlesArray.push(await fetchArticle(mainArticleResult[i].articleID, backEndLang));
                }
                // Set 'articles' as subArticles
                const subArticlesResults = results.articles;

                setHeadlineArticles(mainArticlesArray);
                setCurrentHeadlineIndex(0); // Start with the first headline
                setSubArticles(subArticlesResults);
            } catch (error) {
                console.error("Failed to load articles:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, [language]);

    // Schedules the next auto-advance, clearing any previous timeout
    const scheduleNext = useCallback(() => {
        if (!headlineArticles.length) return;
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setCurrentHeadlineIndex((prev) =>
                prev < headlineArticles.length - 1 ? prev + 1 : 0
            );
        }, AUTOPLAY_MS);
    }, [headlineArticles.length]);
    
    // Reset the timer whenever the current index or article count changes
    useEffect(() => {
        scheduleNext();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentHeadlineIndex, headlineArticles.length, scheduleNext]);

    if (loading) return <div>Loading articles...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    const handleNext = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current); // cancel pending auto-advance
        setCurrentHeadlineIndex((prev) =>
            prev < headlineArticles.length - 1 ? prev + 1 : 0
        );
    };

    const handlePrev = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current); // cancel pending auto-advance
        setCurrentHeadlineIndex((prev) =>
            prev > 0 ? prev - 1 : headlineArticles.length - 1
        );
    };

    return (
        <div className="w-full flex flex-col justify-start items-center my-6 border-r-2 border-l-2 border-[var(--color-line-grey)]">
            { /* one large article, and the rest will be smaller ones */}
            <div className="relative w-full overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentHeadlineIndex * 100}%)` }}
                >
                    {headlineArticles.map((article) => (
                        <div key={article.articleID} className="min-w-full">
                            <Link to={`/article/${article.articleID}`}>
                                <HeadlineLg article={article} />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Navigation buttons */}
                <div className="relative w-full h-8 flex my-8">
                    <button
                    onClick={handlePrev}
                    className="absolute left-[42%] transform bg-[var(--color-gs-white)] hover:bg-[var(--color-light-turquoise)] p-2 z-10 rounded"
                    aria-label="Previous headline"
                    >
                        <GrPrevious />
                    </button>
                    <button
                    onClick={handleNext}
                    className="absolute right-[42%] transform bg-[var(--color-gs-white)] hover:bg-[var(--color-light-turquoise)] p-2 z-10 rounded"
                    aria-label="Next headline"
                    >
                        <GrNext />
                    </button>

                </div>                
            </div>

            <div className="mb-8 px-2">
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full items-stretch">
                    {Array.isArray(subArticles) && subArticles.map((article) => (
                        <div key={article.articleID} className="flex flex-grow flex-col justify-start items-center mx-auto p-2">
                            <Link to={`/article/${article.articleID}`}>
                                <HeadlineSm
                                    article = {article}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="flex justify-center my-6">
                    <button className="relative px-2 rounded hover:text-[var(--color-primary)]">{language === 'zh-Hant' ? '查看更多' : language === 'zh-Hans' ? '查看更多' : ' Load more'}...</button>
                </div>
            </div>      
        </div>   
    );
}
  
export default MainCol;
  