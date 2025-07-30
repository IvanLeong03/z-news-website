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
    <div className="w-full h-auto flex flex-grow flex-col justify-start items-center pt-6 px-2 border-r border-l border-[var(--color-line-lightgrey)]">
      { /* one large article, and 4 smaller ones? */}
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
            <div key={article.id} className="flex flex-grow flex-col justify-start items-center mx-auto">
              <Link to={`/article/${article.id}`}>
                <HeadlineSm
                  headline={article.title?.[language]}
                  image={article.image}
                  cPercent={article.cPercent}
                  liberalPercent={article.liberalPercent}
                  sources={article.sources}
                  sentimentScore={article.sentimentScore}
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
  