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
    const topicLabel = {
        "en": "Focus",
        "zh-Hant": "主題",
        "zh-Hans": "主题"
    };

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
        <div className="w-3/4 mx-auto my-8 p-2">
            <label className="bg-[var(--color-bg-grey)] px-2">{topicLabel[language]}</label>
            <div className="flex items-center w-full border-b-2 border-dotted border-[var(--color-line-darkgrey)] mt-4 mb-12 pb-8">
                <h1 className="text-4xl">{topic}</h1>
                <button className="mx-16 px-4 rounded-lg border border-blue-300">
                    <label>Follow</label>
                </button>
            </div>
            {articles.map((article, index) => (                
                <div key={index}>
                    <SearchObject article={article}/>
                </div>
            ))}
        </div>
    );
}

export default Topic;