import React, { useState, useEffect } from "react";
import { fetchSaved } from "../services/profileService";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { useLanguage } from "../context/LanguageContext";

function SavedArticles() {
    const { language } = useLanguage();
    const [savedArticles, setSavedArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSaved = async () => {
            try {
                const backendLang = mapFrontendLangToBackend(language);
                const saved = await fetchSaved(backendLang);
                setSavedArticles(saved);
            } catch (error) {
                console.error("Failed to load articles:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };        
        loadSaved();
    }, [language]);

    return (
        <div className="w-1/2 mx-auto my-8">
            <h1 className="text-2xl font-bold my-4">Saved Articles</h1>
            <p className="my-2">Here you can view all the articles you have saved for later reading.</p>
            <div className="my-12">
                {loading && <div>Loading saved articles...</div>}
                {error && <div className="text-red-500">Error: {error}</div>}
                {!loading && !error && savedArticles.length === 0 && (
                    <div>You have no saved articles.</div>
                )}
                {!loading && !error && savedArticles.length > 0 && (
                    <ul>
                        {savedArticles.map((article) => (
                            <li key={article.articleID} className="mb-4">
                                <a href={`/article/${article.articleID}`} className="text-blue-600 hover:underline">
                                    {article.title}
                                </a>
                                <p className="text-sm text-gray-500">{new Date(article.date).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                )}
                
            </div>
        </div>
    );
}

export default SavedArticles;