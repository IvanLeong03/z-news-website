import React, {useState, useEffect} from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";
import { fetchArticle } from "../services/articleService";
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

  // Helper function to calculate "hours ago"
  function getHoursAgo(dateString) {
    const articleDate = new Date(dateString);
    const now = new Date();
    const diffMs = now - articleDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    return diffHours;
  }

  return (
    <div className="relative w-9/10 flex-grow flex-col justify-start items-start mx-auto px-2">
      <h2 className="font-bold text-xl my-2">
        {language === 'zh-Hant' ? '熱門新聞' : language === 'zh-Hans' ? '热门新闻' : 'Most Read'}
      </h2>

      {mostReadArticles.map((article, index) => (
        <div key={index} className="flex-grow flex-col justify-between items-start py-2 border-b border-[var(--color-line-grey)]">
          <Link to={`/article/${article.articleID}`} state={{ article }}>            
            <div className="flex text-[var(--color-primary)] text-sm">
              <label>{article.region}</label>
              <label className="mx-2">|</label>
              <label>{article.sector}</label>
            </div>            
            <h2 className="my-2 text-lg">{article.title}</h2>          
            <div className="w-full">
              <SentimentSlider sentiment={article.metrics.sentiment} />
            </div>
            <div className="flex items-center">
              <p className="text-xs whitespace-nowrap">
                {article.nSources}
                {language === 'zh-Hant' ? '篇文章' : language === 'zh-Hans' ? '篇文章' : ' articles'}
              </p>
              <label className="mx-2"> · </label>
              <p className="text-xs whitespace-nowrap">
                {getHoursAgo(article.date)}
                {language === 'zh-Hant' ? '小時前' : language === 'zh-Hans' ? '小时前' : ' hours ago'}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MostRead;
