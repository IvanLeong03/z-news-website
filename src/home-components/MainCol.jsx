import React, { useState, useEffect } from "react";
import HeadlineLg from "./HeadlineLg";
import HeadlineSm from "./HeadlineSm";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchFeed } from "../services/feedService";
import { fetchArticle } from "../services/articleService";

function MainCol() {
  const { language } = useLanguage();
  const [mainArticle, setMainArticle] = useState();
  const [subArticles, setSubArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const loadArticles = async () => {
      try {
        const backEndLang = mapFrontendLangToBackend(language);
        const results = await fetchFeed('today', backEndLang);
        // use 'headlines' to fetch the main articles
        const mainArticleResult = results.headlines; 
        const mainArticlesArray = []; //fetch detailed info for each main article
        for (let i = 0; i < mainArticleResult.length; i++) {
          mainArticlesArray.push(await fetchArticle(mainArticleResult[i].articleID));
        }
        // Set 'articles' as subArticles
        const subArticlesResults = results.articles;

        setMainArticle(mainArticlesArray[0]); //only one main article for now
        setSubArticles(subArticlesResults);
      } catch (error) {
        console.error("Failed to load articles:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadArticles();
  }, [language]);
  
  if (loading) return <div>Loading articles...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="w-full h-auto flex flex-grow flex-col justify-start items-center pt-6 px-2 border-r border-l border-[var(--color-line-lightgrey)]">
      { /* one large article, and the rest will be smaller ones */}
      <Link to={`/article/${mainArticle.articleID}`} >
        <HeadlineLg
          article = {mainArticle}
        />
      </Link>
     
      <div className="mb-8 px-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full items-stretch">
          {Array.isArray(subArticles) && subArticles.map((article) => (
            <div key={article.articleID} className="flex flex-grow flex-col justify-start items-center mx-auto p-2">
              <Link to={`/article/${article.articleID}`}>
                <HeadlineSm
                  article = {article}
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
  