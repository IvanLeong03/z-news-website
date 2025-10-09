import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchTopic } from "../services/topicService";

function TopicsBar() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTopicClick = (topic) => {
    navigate(`/topics/${encodeURIComponent(topic.displayName)}`);
  };

  const loadTopics = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const backendLang = mapFrontendLangToBackend(language);
      const data = await fetchTopic(backendLang);
      setTopics(data);
    } catch (err) {
      setTopics([]);
      setError(err?.message || "Failed to load topics");
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  return (
    <div className="w-full py-1 border-b border-[var(--color-line-grey)] bg-[var(--color-gs-white)]">
      <div className="max-w-1/3 mx-auto text-sm flex justify-center items-center gap-6 px-4">
        <label className="text-red-400 italic flex-shrink-0 whitespace-nowrap break-keep">
          {language === "en"
            ? "Hot"
            : language === "zh-Hant"
            ? "熱門"
            : language === "zh-Hans"
            ? "热门"
            : "Hot"}
          :
        </label>

        {error && (
          <div className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700">
            {error}{" "}
            <button onClick={loadTopics} className="underline hover:no-underline">
              {language === "zh-Hant" ? "重試" : language === "zh-Hans" ? "重试" : "Retry"}
            </button>
          </div>
        )}

        <div
          className="flex-1 min-w-0 flex justify-evenly items-center gap-4 overflow-x-auto whitespace-nowrap"
          aria-busy={loading}
        >
          {loading ? (
            // SKELETON — shows during loading instead of a text fallback
            <div className="flex items-center gap-4 motion-safe:animate-pulse">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-14 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ) : topics.length ? (
            topics.map((topic, i) => (
              <button
                key={i}
                onClick={() => handleTopicClick(topic)}
                className="hover:text-[var(--color-primary)] shrink-0"
                title={topic.displayName}
              >
                {topic.displayName}
              </button>
            ))
          ) : (
            // Optional empty state (still no early return)
            <span className="text-gray-500 text-xs">
              {language.startsWith("zh") ? "暫無主題" : "No topics"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopicsBar;
