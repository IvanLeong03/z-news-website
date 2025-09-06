import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import { fetchArticle } from "../services/articleService";
import SearchObject from "../search/SearchObject";

function Topic() {
    const { language } = useLanguage();
    const topic = useParams().topic;
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const NUM_ARTICLES = 4; // Change this value to fetch more or fewer articles

    useEffect(() => {
        const loadArticles = async () => {
            try {
                const fetchPromises = [];
                const backendLang = mapFrontendLangToBackend(language);
                for (let i = 0; i < NUM_ARTICLES; i++) {
                    fetchPromises.push(fetchArticle(i, backendLang));
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
    }, [language, NUM_ARTICLES]);

    if (loading) return <div>Loading articles...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;

    // Helper function to calculate "hours ago"
    function getHoursAgo(dateString) {
        const articleDate = new Date(dateString);
        const now = new Date();
        const diffMs = now - articleDate;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        return diffHours;
    }

    return (
        <div className="w-[85%] min-h-dvh mx-auto my-8 p-2">
            <h1 className="text-4xl mt-4 mb-20">{language === "zh-Hant" ? "主題: " : language === 'zh-Hans' ? '主题: ' :  'Topic: '} {topic}</h1>
            {articles.map((article, index) => (                
                <div key={index}>
                    <SearchObject article={article}/>
                </div>
            ))}
        </div>
    );
}

export default Topic;