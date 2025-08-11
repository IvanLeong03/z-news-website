import React, {useState, useEffect} from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";
import { fetchArticle } from "../services/articleService";
import { login } from "../services/authService";
import { Link } from "react-router-dom";

function MostRead() {
  const { language } = useLanguage();
  const [mostReadArticles, setMostReadArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const NUM_ARTICLES = 5; // Change this value to fetch more or fewer articles

  useEffect(() => {
      const loadArticles = async () => {
          try {
              // First authenticate
              //await login("admin", "admin");

              const fetchPromises = [];
              for (let i = 0; i < NUM_ARTICLES; i++) {
                  fetchPromises.push(fetchArticle(i));
              }
              const results = await Promise.all(fetchPromises);
              setMostReadArticles(results);
          } catch (error) {
              console.error("Failed to load articles:", error);
              setError(error.message);
          } finally {
              setLoading(false);
          }
      };

      loadArticles();
  }, []);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="relative w-9/10 flex-grow flex-col justify-start items-start mx-auto p-2">
      <h2 className="font-bold text-xl mt-2 mb-6">
        {language === 'zh-Hant' ? '熱門新聞' : language === 'zh-Hans' ? '热门新闻' : 'Most Read'}
      </h2>

      {mostReadArticles.map((article, index) => (
        <div key={index} className="flex-grow flex-col justify-between items-start mt-4 pb-4 border-b border-[var(--color-line-grey)] text-sm">
          <Link to={`/article/${article.articleID}`}>
            <p className="mt-2 my-4">{article.title}</p>
          
            <div className="w-full">
              <SentimentSlider sentiment={article.metrics.sentiment} />
            </div>
            <div className="flex mt-2">
              <p className="text-xs whitespace-nowrap">
                {article.nSources}
                {language === 'zh-Hant' ? '篇文章' : language === 'zh-Hans' ? '篇文章' : ' sources'}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MostRead;
