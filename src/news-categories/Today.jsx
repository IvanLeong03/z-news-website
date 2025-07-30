import React, {useState, useEffect} from "react";
import SplitBar from "../metric-components/SplitBar";
import { useLanguage } from "../context/LanguageContext";
import { fetchArticles } from "../services/articleService";

function Today() {
        
    const { language } = useLanguage();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticles = async () => {
            try {
                // Fetch articles (adjust parameters as needed)
                const data = await fetchArticles({ 
                limit: 6,
                });
                setArticles(data);
            } catch (error) {
                console.error("Failed to load articles:", error);
                // You can set error state here if needed
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);

    if (loading) return <div>Loading articles...</div>;

    return (
        <div className="flex flex-col w-[80%] mx-auto my-16">
            <h1 className="text-5xl font-bold my-4 pl-5">{language === "zh-Hant" ? "今日頭條" : language === "zh-Hans" ? "今日头条" : "TODAY"}</h1>
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
                            <img
                                src={article.pictureURL}
                                alt={article.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-1/2 my-4">
                            <SplitBar cPercent={article.coverage.percentage.centric*100} liberalPercent={article.coverage.percentage.progressive*100} />
                        </div>
                        {/*<h2 className="font-semibold mb-2">{article.title?.[language]}</h2>*/}
                        <h2 className="font-semibold mb-2">{article.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}   


export default Today;