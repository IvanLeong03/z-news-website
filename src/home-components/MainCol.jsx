import React, { useState, useEffect } from "react";
import HeadlineLg from "./HeadlineLg";
import HeadlineSm from "./HeadlineSm";
import { Link } from "react-router-dom";
import articles from "../article-view/articles";
import { useLanguage } from "../context/LanguageContext";
import { fetchArticle } from "../services/articleService";

function MainCol() {
  const { language } = useLanguage();
  const mainArticle = articles.find((a) => a.id === "001");
  const [subArticles, setSubArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const NUM_ARTICLES = 10; // Change this value to fetch more or fewer articles

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
        setSubArticles(results);
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
    <div className="w-full h-auto flex flex-grow flex-col justify-start items-center pt-6 px-2 border-r border-l border-[var(--color-line-lightgrey)]">
      { /* one large article, and the rest will be smaller ones */}
      {mainArticle && (
      <Link to={`/article/${mainArticle.id}`}>
        <HeadlineLg
          headline={mainArticle.title?.[language]}
          image={mainArticle.image}
          cPercent={mainArticle.cPercent}
          liberalPercent={mainArticle.liberalPercent}
          sources = {mainArticle.sources}
          sentScore={mainArticle.sentimentScore}
          subjScore={mainArticle.subjectivityScore}
        />
      </Link>
    )}
      <div className="mb-8 px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full items-stretch">
          {Array.isArray(subArticles) && subArticles.map((article) => (
            <div key={article.articleID} className="flex flex-grow flex-col justify-start items-center mx-auto p-2">
              <Link to={`/article/${article.articleID}`}>
                <HeadlineSm
                  headline={article.title}
                  image={article.pictureURL}
                  cPercent={article.coverage.percentage.centric}
                  liberalPercent={article.coverage.percentage.progressive}
                  sources={article.nSources}
                  sentimentScore={article.metrics.sentiment}
                  subjScore={article.metrics.subjectivity}
                  region={article.region}
                  sector={article.sector}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>      
    </div>   
  );
}
  
  export default MainCol;
  