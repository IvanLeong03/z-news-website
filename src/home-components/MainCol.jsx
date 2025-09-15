import React, { useState, useEffect } from "react";
import HeadlineLg from "./HeadlineLg";
import HeadlineSm from "./HeadlineSm";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchFeed } from "../services/feedService";
import { fetchArticle } from "../services/articleService";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

function MainCol() {
  const { language } = useLanguage();
  const [headlineArticles, setHeadlineArticles] = useState([]);
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
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
          mainArticlesArray.push(await fetchArticle(mainArticleResult[i].articleID, backEndLang));
        }
        // Set 'articles' as subArticles
        const subArticlesResults = results.articles;

        setHeadlineArticles(mainArticlesArray);
        setCurrentHeadlineIndex(0); // Start with the first headline
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
  
  useEffect(() => {
    if (headlineArticles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentHeadlineIndex((prevIndex) =>
        prevIndex < headlineArticles.length - 1 ? prevIndex + 1 : 0
      );
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [headlineArticles]);


  
  
  if (loading) return <div>Loading articles...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const handleNext = () => {
    setCurrentHeadlineIndex((prevIndex) =>
      prevIndex < headlineArticles.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentHeadlineIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : headlineArticles.length - 1
    );
  };

  return (
    <div className="w-full h-auto flex flex-grow flex-col justify-start items-center my-6 border-r border-l border-[var(--color-line-grey)]">
      { /* one large article, and the rest will be smaller ones */}
      {headlineArticles.length > 0 && (
        <div className="relative w-full">
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[var(--color-gs-black)] px-2 py-1 shadow-md z-10"
          >
            <FaArrowLeft color="white"/>
          </button>

          <Link to={`/article/${headlineArticles[currentHeadlineIndex].articleID}`}>
            <HeadlineLg article={headlineArticles[currentHeadlineIndex]} />
          </Link>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[var(--color-gs-black)] px-2 py-1 shadow-md z-10"
          >
            <FaArrowRight color="white"/>
          </button>
        </div>
      )}

     
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
        <div className="flex justify-center">
          <button className="relative my-6 px-2 rounded hover:border hover:border-[var(--color-primary)]">Load more ...</button>
        </div>
      </div>      
    </div>   
  );
}
  
export default MainCol;
  