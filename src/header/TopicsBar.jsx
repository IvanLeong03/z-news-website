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
                setTopics(topics);
            } catch (error) {
                console.error("Failed to load articles, please reload page:", error);
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
        navigate(`/topics/${encodeURIComponent(topic.displayName)}`);
    };
    
    return (
        <div className="w-9/10 mx-auto py-4 border-b border-[var(--color-line-grey)] bg-[var(--color-gs-white)] transition-all duration-300 h-8 md:h-10">
            <div className="mx-auto flex justify-between items-center h-full">
                <div className="mx-auto flex justify-center items-center px-1">
                    <div className="text-sm text-red-400">
                        {language === "en" ? "Trending" : language === "zh-Hant" ? "熱門" : language === "zh-Hans" ? "热门" : "Trending"}:
                    </div>
                    {topics.map((topic, index) => (
                        <button
                        key={index}
                        onClick={() => handleTopicClick(topic)}
                        className="rounded-xl px-8 mx-4 border border-black hover:border-[var(--color-primary)] hover:bg-[var(--color-light-turquoise)]"
                        >
                        {topic.displayName}
                        </button>
                    ))}
                </div>       
            </div>
            
        </div>

    )
}

export default TopicsBar;