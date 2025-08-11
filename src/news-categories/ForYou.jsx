import React, {useState, useEffect} from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";
import { fetchArticle } from "../services/articleService";
import { login } from "../services/authService";
import { Link} from "react-router-dom";

function ForYou() {
    
    const { language } = useLanguage();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const NUM_ARTICLES = 5; // Change this value to fetch more or fewer articles

    useEffect(() => {
        const loadArticles = async () => {
            try {
                // First authenticate
                await login("admin", "admin");

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

    return (
        <div className="flex flex-col w-[80%] mx-auto my-16">
            <h1 className="text-5xl font-bold my-4 pl-5">{language === "zh-Hant" ? "個人推薦" : language === "zh-Hans" ? "个人推荐" : "FOR YOU"}</h1>
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
                            <Link to={`/article/${article.articleID}`}>
                                <img
                                    src={article.pictureURL}
                                    alt={article.title}
                                    className="object-cover w-full h-full"
                                />
                            </Link>
                        </div>
                        <div className="w-1/2 my-4">
                            <Link to={`/article/${article.articleID}`}>
                                <SentimentSlider sentiment={article.metrics.sentiment} />
                            </Link>
                        </div>
                        {/*<h2 className="font-semibold mb-2">{article.title?.[language]}</h2>*/}
                        <Link to={`/article/${article.articleID}`}>
                            <h2 className="font-semibold my-2">{article.title}</h2>
                        </Link>
                </div>
                ))}
            </div>
        </div>
    )
}   

export default ForYou;