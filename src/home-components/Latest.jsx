import React, { useState, useEffect, useCallback } from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchArticle } from "../services/articleService";
import { Link } from "react-router-dom";

function Latest() {
    const { language } = useLanguage();
    const [latest, setLatest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const NUM_ARTICLES = 3;

    const loadArticles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const backendLang = mapFrontendLangToBackend(language);
            const fetchPromises = Array.from({ length: NUM_ARTICLES }, (_, i) =>
                fetchArticle(i, backendLang)
            );
            const results = await Promise.all(fetchPromises);
            setLatest(results);
        } catch (err) {
            console.error("Failed to load latest articles:", err);
            setError(err.message || "Failed to load");
        } finally {
            setLoading(false);
        }
    }, [language]);

    useEffect(() => {
        loadArticles();
    }, [loadArticles]);

    // Helper: calculate "hours ago"
    function getHoursAgo(dateString) {
        const articleDate = new Date(dateString);
        const diffMs = Date.now() - articleDate.getTime();
        return Math.floor(diffMs / (1000 * 60 * 60));
    }

    return (
        <section className="relative w-[90%] mx-auto flex-grow flex-col justify-start items-start px-2 py-8 rounded-lg border border-[var(--color-line-verylightgrey)] my-16">
            <h2 className="font-bold text-xl my-4">
                {language === "zh-Hant"
                ? "最新"
                : language === "zh-Hans"
                ? "最新"
                : "Latest"}
            </h2>

            {/* Error (keeps header visible) */}
            {error && (
                <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
                <button
                    onClick={loadArticles}
                    className="ml-3 underline hover:no-underline"
                >
                    {language === "zh-Hant"
                    ? "重試"
                    : language === "zh-Hans"
                    ? "重试"
                    : "Retry"}
                </button>
                </div>
            )}

            {/* List area (either skeletons or content). aria-busy informs ATs. */}
            <div aria-busy={loading} aria-live="polite">
                {loading ? (
                // Skeletons matching the final layout to avoid CLS
                <ul className="space-y-2 motion-safe:animate-pulse">
                    {Array.from({ length: NUM_ARTICLES }).map((_, i) => (
                    <li
                        key={i}
                        className="py-2 border-b border-[var(--color-line-grey)]"
                    >
                        <div className="flex text-sm mt-1 items-center gap-2">
                        <div className="h-3 w-16 rounded bg-gray-200" />
                        <div className="h-3 w-3 rounded bg-gray-200" />
                        <div className="h-3 w-20 rounded bg-gray-200" />
                        </div>
                        <div className="my-2 h-5 w-3/4 rounded bg-gray-200" />
                        {/* sentiment slider placeholder */}
                        <div className="h-2 w-full rounded bg-gray-200" />
                    </li>
                    ))}
                    <span className="sr-only">Loading latest articles…</span>
                </ul>
                ) : latest.length === 0 ? (
                <p className="text-sm text-gray-500">
                    {language === "zh-Hant"
                    ? "暫無最新新聞"
                    : language === "zh-Hans"
                    ? "暂无最新新闻"
                    : "No latest articles yet."}
                </p>
                ) : (
                latest.map((article, index) => (
                    <div
                    key={article.articleID ?? index}
                    className="flex flex-col justify-between items-start py-2 border-b border-[var(--color-line-grey)] hover:border-b-2 hover:border-[var(--color-secondary-1)]"
                    >
                    <Link to={`/article/${article.articleID}`}>
                        <div className="flex text-[var(--color-primary)] my-1 items-center text-xs 2xl:text-sm ">
                            <label>{article.region}</label>
                            <label className="mx-1">|</label>
                            <label>{article.sector}</label>
                        </div>
                        <h3 className="my-2 text-base 2xl:text-lg">{article.title}</h3>
                        <div className="w-full mb-4">
                            <SentimentSlider sentiment={article.metrics.sentiment} />
                        </div>

                        <div className="flex space-x-4 py-1 mb-1">
                            <p className="text-xs whitespace-nowrap">
                            {article.date.slice(10, 16)}                            
                            </p>
                            <p className="text-xs whitespace-nowrap">
                            ({getHoursAgo(article.date)}
                            {language === "zh-Hant"
                                ? "小時前"
                                : language === "zh-Hans"
                                ? "小时前"
                                : "h ago"})
                            </p>
                        </div>

                    </Link>
                    </div>
                ))
                )}
            </div>
        </section>
    );
}

export default Latest;
