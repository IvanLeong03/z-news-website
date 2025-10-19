import React, { useState, useEffect } from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchFeed } from "../services/feedService";
import { fetchArticle } from "../services/articleService";
import { Link } from "react-router-dom";
import { GrPrevious, GrNext } from "react-icons/gr";

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
            "en": "Personal",
            "zh-Hant": "個人專屬",
            "zh-Hans": "个人专属"
        }
    };
    const { tag } = props;
    const [articles, setArticles] = useState([]);
    const [headlineArticles, setHeadlineArticles] = useState([]);
    const firstHeadline = headlineArticles[0];
    const carouselHeadlines = headlineArticles.slice(1);
    const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(1);    
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
            prevIndex < carouselHeadlines.length - 1 ? prevIndex + 1 : 0
            );
        }, 5000);
        return () => clearInterval(interval);
    }, [headlineArticles]);

    const handleNext = () => {
        setCurrentHeadlineIndex((prevIndex) =>
            prevIndex < carouselHeadlines.length - 1 ? prevIndex + 1 : 0
        );        
    };

    const handlePrev = () => {
        setCurrentHeadlineIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : carouselHeadlines.length - 1
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
    //const filteredArticles = articles.filter(article => !headlineIDs.includes(article.articleID));

    if (loading) return (
        <div className="min-h-[80dvh] flex items-center">
            <label className="mx-auto">Loading articles...</label>
        </div>
    ) ;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    return (
        <div className="flex flex-col w-3/4 mx-auto max-w-[1920px] my-16">
            {tag && (<h1 className="text-3xl 2xl:text-5xl font-bold mb-8 pl-5">{headerName[tag][language]}</h1>)}

            {/* headline section with standalone + carousel */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-8 items-start">
                {/* Standalone headline */}
                {firstHeadline && (
                    <div className="px-4 my-8">
                    <Link to={`/article/${firstHeadline.articleID}`}>
                        <div className="w-full aspect-[16/9] overflow-hidden border border-[var(--color-line-grey)]">
                            <img
                                src={firstHeadline.pictureURL}
                                alt={firstHeadline.title}
                                className="object-cover w-full h-full hover:scale-105 transition duration-700 ease-in-out"
                            />
                        </div>
                        <label className="text-[var(--color-primary)] my-1">{firstHeadline.sector}</label>
                        <h2 className="text-3xl font-bold">{firstHeadline.title}</h2>
                        <p className="text-sm text-[var(--color-text-lightgrey)] my-2 line-clamp-2">
                        {firstHeadline.description.synopsis}
                        </p>
                        <div className="w-full grid grid-cols-[3fr_1fr] my-2">
                            <div className="w-2/3">
                                <SentimentSlider sentiment={firstHeadline.metrics.sentiment} />
                            </div>
                            <div className="flex text-xs px-4 items-center">
                                <p className="whitespace-nowrap">
                                {firstHeadline.nSources} {language === 'zh-Hant' ? '篇文章' : language === 'zh-Hans' ? '篇文章' : ' articles'}
                                </p>
                                <label className="mx-1"> · </label>
                                <p className="whitespace-nowrap">
                                {firstHeadline.date.slice(11, 16)}
                                </p>
                            </div>
                        </div>
                    </Link>
                    </div>
                )}

                {/* Carousel for remaining headlines */}
                <div className="overflow-hidden relative w-full">
                    <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentHeadlineIndex * 100}%)` }}
                    >
                    {carouselHeadlines.map((article) => (
                        <div key={article.articleID} className="min-w-full px-4 mt-8">
                            <Link to={`/article/${article.articleID}`}>
                                <div className="w-full aspect-[16/9] overflow-hidden border border-[var(--color-line-grey)]">
                                    <img
                                        src={article.pictureURL}
                                        alt={article.title}
                                        className="object-cover w-full h-full hover:scale-105 transition duration-700 ease-in-out"
                                    />
                                </div>

                                <h2 className="text-xl 2xl:text-2xl font-semibold mt-4">{article.title}</h2>
                                <p className="text-sm text-[var(--color-text-lightgrey)] my-2 line-clamp-2">
                                {article.description.synopsis}
                                </p>
                                <div className="w-full grid grid-cols-[4fr_1fr] 2xl:grid-cols-[3fr_1fr] my-2">
                                    <div className="w-full 2xl:w-2/3">
                                        <SentimentSlider sentiment={article.metrics.sentiment} />
                                    </div>
                                    <div className="flex text-xs pl-2 2xl:pl-4 justify-end items-center">
                                        <p className="whitespace-nowrap">
                                        {article.nSources} {language === 'zh-Hant' ? '篇文章' : language === 'zh-Hans' ? '篇文章' : ' articles'}
                                        </p>
                                        <label className="mx-1"> · </label>
                                        <p className="whitespace-nowrap">
                                        {article.date.slice(11, 16)} 
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                    </div>

                    {/* Navigation buttons */}
                    <div className="relative w-full h-8 mt-4 flex">
                        <button
                            onClick={handlePrev}
                            className="absolute left-[35%] top-0 transform -translate-y-1/2 bg-[var(--color-gs-white)] hover:bg-[var(--color-light-turquoise)] p-2 z-10 rounded"
                        >
                            <GrPrevious />
                        </button>
                        <label className="text-xs absolute top-0 left-[50%] transform -translate-y-1/2 -translate-x-1/2">{currentHeadlineIndex+1} of {carouselHeadlines.length}</label>
                        <button
                            onClick={handleNext}
                            className="absolute right-[35%] top-0 transform -translate-y-1/2 bg-[var(--color-gs-white)] hover:bg-[var(--color-light-turquoise)] p-2 z-10 rounded"
                        >
                            <GrNext />
                        </button>
                    </div>
                </div>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className="flex flex-col p-4 m-2 text-xl border-b border-[var(--color-line-verylightgrey)] hover:border-b-2 hover:border-[var(--color-primary)] hover:shadow-md"
                    >
                        <div className="grid grid-cols-[3fr_2fr] items-center">
                            <div className="px-2">
                                <div className="flex text-[var(--color-primary)] text-sm my-1">
                                    <label>{article.sector}</label>
                                </div> 
                                <Link to={`/article/${article.articleID}`}>
                                    <h2 className="mb-2 text-lg 2xl:text-xl">{article.title}</h2>
                                </Link>
                            </div>
                            <div className="w-full px-2 aspect-[3/2] 2xl:aspect-[16/9] overflow-hidden">
                                <Link to={`/article/${article.articleID}`}>
                                    <img
                                        src={article.pictureURL}
                                        alt={article.title}
                                        className="object-cover w-full h-full hover:scale-105 transition duration-500 ease-in-out"
                                    />
                                </Link>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-[3fr_1fr] my-2 items-center space-x-4 space-y-2 gap-x-4">
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
                                    { getHoursAgo(article.date) > 4 ? `${getHoursAgo(article.date)}h ago` : article.date.slice(11, 16) }
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
