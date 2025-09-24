import React, { useState, useEffect } from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchFeed } from "../services/feedService";
import { fetchArticle } from "../services/articleService";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


function Feed(props) {
    const { language } = useLanguage();
    const headerName = {
        "hk": {
            "en": "Hong Kong",
            "zh-Hant": "香港",
            "zh-Hans": "香港",
        },
        "china": {
            "en": "China",
            "zh-Hant": "中國",
            "zh-Hans": "中国",
        },
        "personal": {
            "en": "Recommended",
            "zh-Hant": "個人推薦",
            "zh-Hans": "个人推荐"
        }
    };
    const { tag } = props;
    const [articles, setArticles] = useState([]);
    const [headlineArticles, setHeadlineArticles] = useState([]);
    const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const backendLang = mapFrontendLangToBackend(language);
                const results = await fetchFeed(tag, backendLang);
                const headlines = results.headlines;
                const headlinesArray = [];
                for (let i = 0; i < headlines.length; i++) {
                    headlinesArray.push(await fetchArticle(headlines[i].articleID, backendLang));
                }
                setHeadlineArticles(headlinesArray);
                setCurrentHeadlineIndex(0);
                setArticles(results.articles);
            } catch (error) {
                console.error("Failed to load articles:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, [language, tag]);

    //auto-advance every 5s
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHeadlineIndex((prevIndex) =>
            prevIndex < headlineArticles.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [headlineArticles]);

    const handleNext = () => {
        setCurrentHeadlineIndex((prevIndex) =>
            prevIndex < headlineArticles.length - 1 ? prevIndex + 1 : 0
        );        
    };

    const handlePrev = () => {
        setCurrentHeadlineIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : headlineArticles.length - 1
        );
    };

    function getHoursAgo(dateString) {
        const articleDate = new Date(dateString);
        const now = new Date();
        const diffMs = now - articleDate;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        return diffHours;
    }
    
    // Filter out headline articles from the main articles list
    const headlineIDs = headlineArticles.map(article => article.articleID);
    const filteredArticles = articles.filter(article => !headlineIDs.includes(article.articleID));

    if (loading) return <div>Loading articles...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="flex flex-col w-[80%] mx-auto my-16">
            {tag && (<h1 className="text-5xl font-bold mb-8 pl-5">{headerName[tag][language]}</h1>)}

            {/* headline */}
            <div className="overflow-hidden relative w-[95%] mx-auto">
                <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentHeadlineIndex * 100}%)` }}
                >
                    {headlineArticles.map((article, index) => (
                    <div key={article.articleID} className="min-w-full px-4 my-8">
                        <Link to={`/article/${article.articleID}`}>
                        <div className="w-full aspect-[16/9] overflow-hidden border border-[var(--color-line-grey)]">
                            <img
                            src={article.pictureURL}
                            alt={article.title}
                            className="object-cover w-full h-full"
                            />
                        </div>
                        <h2 className="text-3xl font-bold mt-4">{article.title}</h2>
                        <p className="text-sm text-[var(--color-text-lightgrey)] my-2 line-clamp-2">
                            {article.description.synopsis}
                        </p>
                        <div className="w-full grid grid-cols-[3fr_1fr] my-2">
                            <div className="w-2/3">
                                <SentimentSlider sentiment={article.metrics.sentiment} />
                            </div>
                            <div className="flex text-xs px-4 items-center">
                                <p className="whitespace-nowrap">
                                    {article.nSources} {language === 'zh-Hant' ? '篇文章' : language === 'zh-Hans' ? '篇文章' : ' articles'}
                                </p>
                                <label className="mx-1"> · </label>
                                <p className="whitespace-nowrap">
                                    {getHoursAgo(article.date)} {language === 'zh-Hant' ? '小時前' : language === 'zh-Hans' ? '小时前' : ' hours ago'}
                                </p>
                            </div>
                        </div>
                        </Link>
                    </div>
                    ))}
                </div>

                {/* Navigation buttons */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[var(--color-light-turquoise)] p-2 z-10 rounded-full"
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={handleNext}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[var(--color-light-turquoise)] p-2 z-10 rounded-full"
                >
                    <FaArrowRight />
                </button>
            </div>
           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map((article, index) => (
                    <div
                        key={index}
                        className="flex flex-col p-4 m-2 text-xl border-b border-[var(--color-line-verylightgrey)] hover:border-b-2 hover:border-[var(--color-primary)] hover:shadow-md"
                    >
                        <div className="w-full aspect-[16/9] overflow-hidden border border-[var(--color-line-grey)]">
                            <Link to={`/article/${article.articleID}`}>
                                <img
                                    src={article.pictureURL}
                                    alt={article.title}
                                    className="object-cover w-full h-full"
                                />
                            </Link>
                        </div>
                        <div className="flex text-[var(--color-primary)] text-sm my-1">
                            <label>{article.sector}</label>
                        </div> 
                        <Link to={`/article/${article.articleID}`}>
                            <h2 className="font-semibold my-2">{article.title}</h2>
                        </Link>
                        <div className="flex flex-col my-4">
                            <Link to={`/article/${article.articleID}`}>
                                <SentimentSlider sentiment={article.metrics.sentiment} />
                            </Link>
                            <div className="flex items-center text-xs mt-2">
                                <p className="whitespace-nowrap">
                                    {article.nSources}
                                    {language === 'zh-Hant' ? '篇文章' : language === 'zh-Hans' ? '篇文章' : ' articles'}
                                </p>
                                <label className="mx-1"> · </label>
                                <p className="whitespace-nowrap">
                                    {getHoursAgo(article.date)}
                                    {language === 'zh-Hant' ? '小時前' : language === 'zh-Hans' ? '小时前' : ' hours ago'}
                                </p>
                            </div>                                                        
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feed;
