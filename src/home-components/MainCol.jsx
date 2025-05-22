import React from "react";
import HeadlineLg from "./HeadlineLg";
import HeadlineSm from "./HeadlineSm";
import { Link } from "react-router-dom";
import articles from "../article-view/articles";

function MainCol() {

  const mainArticle = articles.find((a) => a.id === "001");
  const subArticles = articles.filter((a) => a.id !== "001");

  const newsArticles = [  
    {headline: "‘Reverse Deng’: can Europe pull a role reversal and secure Chinese battery tech?", image: "src/assets/section-3-background-2.jpg", cPercent: 49, pPercent: 51, sources:22, id:"002"},
    {headline: "Amid Trump uncertainty, is this ‘best time’ for China to win friends in Southeast Asia?", image: "src/assets/university1.jpg", cPercent:60, pPercent:40, sources:16, id:"003"},     
    {headline: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua", id:"004"}, //for testing: no image
  ];

  return (
    <div className="w-full min-h-dvh flex-grow flex-col justify-center items-center mx-auto border-r border-l border-[var(--color-dark-turquoise)]">
      { /* one large article, and 4 smaller ones? */}
      {mainArticle && (
      <Link to={`/article/${mainArticle.id}`}>
        <HeadlineLg
          headline={mainArticle.title}
          image={mainArticle.image}
          cPercent={mainArticle.cPercent}
          pPercent={mainArticle.pPercent}
          sources = {mainArticle.sources}
        />
      </Link>
    )}
      <div className="w-9/10 mx-auto">
        <div className="grid grid-cols-2 gap-4 w-full">
          {Array.isArray(subArticles) && subArticles.map((article) => (
            <div key={article.id} className="flex-grow flex-col justify-center items-center mx-auto">
              <Link to={`/article/${article.id}`}>
                <HeadlineSm
                  headline={article.title}
                  image={article.image}
                  cPercent={article.cPercent}
                  pPercent={article.pPercent}
                  sources={article.sources}
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
  