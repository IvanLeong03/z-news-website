import React, { useState, useEffect, useCallback } from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchArticle } from "../services/articleService";
import { Link } from "react-router-dom";

function MostRead() {
  const { language } = useLanguage();
  const [mostReadArticles, setMostReadArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const NUM_ARTICLES = 5;

  const loadArticles = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const backendLang = mapFrontendLangToBackend(language);
      const fetchPromises = Array.from({ length: NUM_ARTICLES }, (_, i) =>
        fetchArticle(i, backendLang)
      );
      const results = await Promise.all(fetchPromises);
      setMostReadArticles(results);
    } catch (err) {
      console.error("Failed to load articles:", err);
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
    <section className="relative w-4/5 mx-auto flex-grow flex-col justify-start items-start px-2 py-4">
      <h2 className="font-bold text-xl my-8">
        {language === "zh-Hant"
          ? "熱門新聞"
          : language === "zh-Hans"
          ? "热门新闻"
          : "Most Read"}
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
            <span className="sr-only">Loading most read articles…</span>
          </ul>
        ) : mostReadArticles.length === 0 ? (
          <p className="text-sm text-gray-500">
            {language === "zh-Hant"
              ? "暫無熱門新聞"
              : language === "zh-Hans"
              ? "暂无热门新闻"
              : "No most-read articles yet."}
          </p>
        ) : (
          mostReadArticles.map((article, index) => (
            <div
              key={article.articleID ?? index}
              className="flex flex-col justify-between items-start py-2 border-b border-[var(--color-line-grey)] hover:border-b-2 hover:border-[var(--color-secondary-1)]"
            >
              <Link to={`/article/${article.articleID}`}>
                  <div className="flex text-[var(--color-primary)] my-1 items-center">
                    <div className="rounded-full px-4 py-2 bg-[var(--color-primary)] text-[var(--color-gs-white)] mr-4">{index+1}</div>
                    <label className="text-sm">{article.region}</label>
                    <label className="mx-2">|</label>
                    <label className="text-sm">{article.sector}</label>
                  </div>
                  <h3 className="my-2 text-lg">{article.title}</h3>
                  <div className="w-full mb-4">
                    <SentimentSlider sentiment={article.metrics.sentiment} />
                  </div>
                  {/*}
                  <div className="flex items-center py-1 mb-1">
                    <p className="text-xs whitespace-nowrap">
                      {article.nSources}
                      {language === "zh-Hant"
                        ? "篇文章"
                        : language === "zh-Hans"
                        ? "篇文章"
                        : " articles"}
                    </p>
                    <label className="mx-2"> · </label>
                    <p className="text-xs whitespace-nowrap">
                      {getHoursAgo(article.date)}
                      {language === "zh-Hant"
                        ? "小時前"
                        : language === "zh-Hans"
                        ? "小时前"
                        : "h ago"}
                    </p>
                  </div>
                  */}
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MostRead;
