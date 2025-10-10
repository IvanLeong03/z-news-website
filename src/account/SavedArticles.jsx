import React, { useState, useEffect } from "react";
import { fetchSaved, deleteSavedArticle } from "../services/profileService";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

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
                                <div className="flex items-start justify-between my-4">
                                    {/* left: date top, title below it */}
                                    <div className="px-2 flex flex-col">
                                        <p className="text-sm text-[var(--color-text-lightgrey)] mb-1">{new Date(article.date).toLocaleDateString()}</p>
                                        <Link to={`/article/${article.articleID}`}>
                                            {article.title}
                                        </Link>
                                        <button
                                            className="w-12 rounded-lg border border-[var(--color-secondary-1)] bg-[var(--color-secondary-1)] px-2 py-1 my-2 flex justify-center items-center text-sm"
                                            onClick={async () => {
                                                try {
                                                    await deleteSavedArticle(article.articleID);
                                                    setSavedArticles((prev) => prev.filter(a => a.articleID !== article.articleID));
                                                } catch (err) {
                                                    setError(err.message);
                                                }
                                            }}
                                        >
                                            <FaTrash color="white" />
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
                {savedArticles.length > 0 && (
                    <div className="flex justify-start my-6">
                        <button
                            className="px-4 py-2 rounded hover:text-red-600 text-xl border border-red-600"
                            onClick={async () => {
                                try {
                                    for (const article of savedArticles) {
                                        await deleteSavedArticle(article.articleID);
                                    }
                                    setSavedArticles([]);
                                } catch (err) {
                                    setError(err.message);
                                }
                            }}
                        >
                            Clear All Saved Articles
                        </button>
                    </div>
                )}                                
            </div>
        </div>
    );
}

export default SavedArticles;