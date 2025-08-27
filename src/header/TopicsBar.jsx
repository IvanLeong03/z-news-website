import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage} from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchTopic } from "../services/topicService";

function TopicsBar() {
    const navigate = useNavigate();
    const { language, setLanguage } = useLanguage();
    const [ topics, setTopics ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);    

    useEffect(() => {
        const loadTopics = async () => {
            try {
                const backendLang = mapFrontendLangToBackend(language);
                const topics = await fetchTopic(backendLang);
                console.log("Fetched topics:", topics);
                setTopics(topics);
            } catch (error) {
                console.error("Failed to load articles:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadTopics();
    }, [language]);

    if (loading) return <div>Loading topics...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;   

    const handleTopicClick = (topic) => {
        navigate(`/topics/${encodeURIComponent(topic.tag)}`);
    };
    
    return (
        <div className="w-9/10 mx-auto py-6 border-b border-[var(--color-line-lightgrey)] bg-[var(--color-gs-white)] transition-all duration-300 h-8 md:h-10">
            <div className="mx-auto flex justify-between items-center h-full">
                <div className="mx-auto flex justify-center items-center px-1">
                    <div className="font-semibold text-sm text-red-400">
                        {language === "en" ? "Trending" : language === "zh-Hant" ? "熱門" : language === "zh-Hans" ? "热门" : "Trending"}:
                    </div>
                    {topics.map((topic, index) => (
                        <button
                        key={index}
                        onClick={() => handleTopicClick(topic)}
                        className="font-bold hover:cursor-grab hover:underline hover:underline-offset-2 hover:decoration-[var(--color-primary)] px-8"
                        >
                        {topic.displayName}
                        </button>
                    ))}
                </div>
                <div className="flex items-center space-x-1">
                    <p className="text-sm">
                        {language === "en" ? "Language" : language === "zh-Hant" ? "語言" : language === "zh-Hans" ? "语言" : "Language"}:
                    </p>
                    <select
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <option value="en">English</option>
                        <option value="zh-Hant">繁體中文</option>
                        <option value="zh-Hans">简体中文</option>
                    </select>
                </div>            
            </div>
            
        </div>

    )
}

export default TopicsBar;