import React, { useState, useEffect } from "react";
import { fetchHistory, deleteHistoryArticle } from "../services/profileService";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";

function ReadingHistory() {
    const { language } = useLanguage();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const backendLang = mapFrontendLangToBackend(language);
                const history = await fetchHistory(backendLang);
                setHistory(history);
            } catch (error) {
                console.error("Failed to load articles:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };        
        loadHistory();
    }, [language]);

    return (
        <div className="w-1/2 mx-auto my-8">
            <h1 className="text-2xl font-bold my-4">Reading history</h1>
            <p className="my-2">Here you can view all the articles you have previously read.</p>
            <div className="my-12">
                {loading && <div>Loading reading history...</div>}
                {error && <div className="text-red-500">Error: {error}</div>}
                {!loading && !error && history.length === 0 && (
                    <div>You have no reading history.</div>
                )}
                {!loading && !error && history.length > 0 && (
                    <ul>
                        {history.map((article) => (
                            <li key={article.articleID} className="mb-4">
                                <div className="flex items-start justify-between my-4">
                                    {/* left: date top, title below it */}
                                    <div className="px-2 flex flex-col">
                                        <p className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</p>
                                        <a href={`/article/${article.articleID}`} className="hover:underline my-1">
                                            {article.title}
                                        </a>
                                        <button
                                            className="w-1/4 hover:text-[var(--color-primary)] text-sm rounded-xl border border-black px-2 my-2"
                                            onClick={async () => {
                                                try {
                                                    await deleteHistoryArticle(article.articleID);
                                                    setHistory((prev) => prev.filter(a => a.articleID !== article.articleID));
                                                } catch (err) {
                                                    setError(err.message);
                                                }
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                    {/* right: image */}
                                    <div className="aspect-[16/9] overflow-hidden h-24">
                                        <Link to={`/article/${article.articleID}`}>
                                            <img src={article.pictureURL} className="w-full h-full object-cover"/>
                                        </Link>
                                    </div>
                                </div>                                
                            </li>
                        ))}
                    </ul>
                )}
                {history.length > 0 && (
                    <div className="flex justify-start my-6">
                        <button
                            className="px-4 py-2 rounded hover:text-red-600"
                            onClick={async () => {
                                try {
                                    for (const article of history) {
                                        await deleteHistoryArticle(article.articleID);
                                    }
                                    setHistory([]);
                                } catch (err) {
                                    setError(err.message);
                                }
                            }}
                        >
                            Clear All Reading History
                        </button>
                    </div>    
                )}
                            
            </div>
        </div>
    );
}

export default ReadingHistory;