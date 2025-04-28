import React from "react";
import SplitBar from "../metric-components/SplitBar";
import Sentiment from "../metric-components/Sentiment";

function MostRead() {

    const mostReadArticles = [
    {title: 'Article title Article Title Article Title', cPercent: 50, pPercent: 50, sentiment: 'positive', sources: 'xy sources'},
    {title: 'Amid Trump uncertainty, is this ‘best time’ for China to win friends in Southeast Asia?', cPercent: 35, pPercent: 65, sentiment: 'default', sources: '21 sources'},
    {title: 'Hong Kong tourism minister floats e-ticketing idea after mix-ups at mega-events', cPercent: 49, pPercent: 51, sentiment: 'default', sources: '16 sources'},
    {title: 'Tech war: China’s top foundry SMIC reports revenue growth in 2024, but net profits plunge', cPercent: 70, pPercent: 30, sentiment: 'default', sources: '19 sources'},
    {title: 'ISU sorry for displaying Taiwan rather than Chinese Taipei flag at World Championships', cPercent: 42, pPercent: 58, sentiment: 'default', sources: '21 sources'},            
    ];


    return (
      <>
      <div className="relative w-9/10 flex-grow flex-col justify-start items-start mx-auto px-2 pt-2 pb-8">
        <h2 className="font-bold mt-2 mb-6">Most Read</h2>

        
        {mostReadArticles.map((article, index) => (
            <div key={index} className="flex-grow flex-col justify-between items-start mt-4 pb-6 border-b border-[theme(--color-line-grey)]">
                <p className="mt-2 my-4">{article.title}</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                    <div className="w-full">
                        <SplitBar cPercent={article.cPercent} pPercent={article.pPercent} />
                    </div>
                    <div className="w-full">
                        <Sentiment sentiment={article.sentiment} />
                    </div>
                </div>
                <div className="flex my-2">
                    <p className="text-xs whitespace-nowrap">{article.sources}</p>
                </div> 
            </div>   
            ))}  
      </div>
        
       
      </>
    )
  }
  
  export default MostRead;
  