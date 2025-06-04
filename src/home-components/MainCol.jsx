import React from "react";
import HeadlineLg from "./HeadlineLg";
import HeadlineSm from "./HeadlineSm";
import { Link } from "react-router-dom";
import articles from "../article-view/articles";
import { useLanguage } from "../context/LanguageContext";

function MainCol() {
  const { language } = useLanguage();
  const mainArticle = articles.find((a) => a.id === "001");
  const subArticles = articles.filter((a) => a.id !== "001");

  return (
    <div className="w-full h-auto flex-grow flex-col justify-center items-center mx-auto border-r-2 border-l-2 border-[rgba(37,37,37,0.75)]">
      { /* one large article, and 4 smaller ones? */}
      {mainArticle && (
      <Link to={`/article/${mainArticle.id}`}>
        <HeadlineLg
          headline={mainArticle.title?.[language]}
          image={mainArticle.image}
          cPercent={mainArticle.cPercent}
          pPercent={mainArticle.pPercent}
          sources = {mainArticle.sources}
          sentScore={mainArticle.sentimentScore}
          subjScore={mainArticle.subjectivityScore}
        />
      </Link>
    )}
      <div className="w-9/10 mx-auto pb-8">
        <div className="grid grid-cols-2 gap-4 w-full">
          {Array.isArray(subArticles) && subArticles.map((article) => (
            <div key={article.id} className="flex flex-grow flex-col justify-center items-center mx-auto">
              <Link to={`/article/${article.id}`}>
                <HeadlineSm
                  headline={article.title?.[language]}
                  image={article.image}
                  cPercent={article.cPercent}
                  pPercent={article.pPercent}
                  sources={article.sources}
                  sentScore={article.sentimentScore}
                  subjScore={article.subjectivityScore}
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
  