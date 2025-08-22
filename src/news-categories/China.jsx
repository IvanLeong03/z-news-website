import React, {useState, useEffect} from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";
import { fetchArticle } from "../services/articleService";
import { Link } from "react-router-dom";

function China() {
    const { language } = useLanguage();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    
    const NUM_ARTICLES = 8;

    useEffect(() => {
        const loadArticles = async () => {
            try {
                //await login("admin", "admin");
                const fetchPromises = [];
                for (let i = 0; i < NUM_ARTICLES; i++) {
                    fetchPromises.push(fetchArticle(i));
                }
                const results = await Promise.all(fetchPromises);
                setArticles(results);
            } catch (error) {
                console.error("Failed to load articles:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadArticles();
    }, []);

    if (loading) return <div>Loading articles...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    function getHoursAgo(dateString) {
        const articleDate = new Date(dateString);
        const now = new Date();
        const diffMs = now - articleDate;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        return diffHours;
    }

    return (
        <div className="flex flex-col w-[80%] mx-auto my-16">
            <h1 className="text-5xl font-bold my-4 pl-5">{language === "zh-Hant" ? "中国" : language === "zh-Hans" ? "中国" : "CHINA"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className={
                            index === 0
                                ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 flex flex-col rounded-lg p-4 m-2 lg:h-[32rem] text-3xl"
                                : "flex flex-col rounded-lg p-4 m-2 text-xl"
                        }
                        style={index === 0 ? { minHeight: '20rem' } : {}}
                    >
                        <div className="w-full aspect-[16/9] overflow-hidden border border-[var(--color-line-grey)]">
                            <Link to={`/article/${article.articleID}`} state={{ article }}>
                                <img
                                    src={article.pictureURL}
                                    alt={article.title}
                                    className="object-cover w-full h-full"
                                />
                            </Link>
                        </div>
                        <div className="flex text-[var(--color-primary)] text-sm my-1">
                            <label>{article.region}</label>
                            <label className="mx-2">|</label>
                            <label>{article.sector}</label>
                        </div> 
                        <Link to={`/article/${article.articleID}`} state={{ article }}>
                            <h2 className="font-semibold my-2">{article.title}</h2>
                        </Link>
                        <div className="grid grid-cols-[3fr_1fr] items-center">
                            <div className="my-4">
                                <Link to={`/article/${article.articleID}`} state={{ article }}>
                                    <SentimentSlider sentiment={article.metrics.sentiment} />
                                </Link>
                            </div>
                            <div className="flex items-center px-2 text-xs">
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
    )
}

export default China;