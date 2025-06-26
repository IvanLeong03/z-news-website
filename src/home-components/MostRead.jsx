import React, { use } from "react";
import SplitBar from "../metric-components/SplitBar";
import Sentiment from "../metric-components/Sentiment";
import { useLanguage } from "../context/LanguageContext";

function MostRead() {

    const { language } = useLanguage();

    const mostReadArticles_en = [
    {title: 'Article title Article Title Article Title', cPercent: 50, pPercent: 50, sentiment: 'positive', sources: '10 sources'},
    {title: 'Amid Trump uncertainty, is this ‘best time’ for China to win friends in Southeast Asia?', cPercent: 35, pPercent: 65, sentiment: 'default', sources: '21 sources'},
    {title: 'Hong Kong tourism minister floats e-ticketing idea after mix-ups at mega-events', cPercent: 49, pPercent: 51, sentiment: 'default', sources: '16 sources'},
    {title: 'Tech war: China’s top foundry SMIC reports revenue growth in 2024, but net profits plunge', cPercent: 70, pPercent: 30, sentiment: 'default', sources: '19 sources'},
    {title: 'ISU sorry for displaying Taiwan rather than Chinese Taipei flag at World Championships', cPercent: 42, pPercent: 58, sentiment: 'default', sources: '21 sources'},            
    ];

    const mostReadArticles_zht = [
    {title: '文章標題 文章標題 文章標題', cPercent: 50, pPercent: 50, sentiment: 'positive', sources: '10篇文章'}, 
    {title: '特朗普不確定性中，中國贏得東南亞朋友的「最佳時機」？', cPercent: 35, pPercent: 65, sentiment: 'default', sources: '21篇文章'},
    {title: '香港旅遊事務署長在大型活動中出現混亂後提出電子票務想法', cPercent: 49, pPercent: 51, sentiment: 'default', sources: '16篇文章'},
    {title: '科技戰：中國頂級晶圓代工廠中芯國際2024年收入增長，但淨利潤大幅下降', cPercent: 70, pPercent: 30, sentiment: 'default', sources: '19篇文章'},
    {title: '國際滑冰聯盟對世界錦標賽上展示台灣而非中華台北旗表示歉意', cPercent: 42, pPercent: 58, sentiment: 'default', sources: '21篇文章'}
    ];

    const mostReadArticles_zhs = [
    {title: '文章标题 文章标题 文章标题', cPercent: 50, pPercent: 50, sentiment: 'positive', sources: '10篇文章'},         
    {title: '川普不确定性中，中国赢得东南亚朋友的「最佳时机」？', cPercent: 35, pPercent: 65, sentiment: 'default', sources: '21篇文章'},
    {title: '香港旅游事务署长在大型活动中出现混乱后提出电子票务想法', cPercent: 49, pPercent: 51, sentiment: 'default', sources: '16篇文章'},
    {title: '科技战：中国顶级晶圆代工厂中芯国际2024年收入增长，但净利润大幅下降', cPercent: 70, pPercent: 30, sentiment: 'default', sources: '19篇文章'},  
    {title: '国际滑冰联盟对世界锦标赛上展示台湾而非中华台北旗表示歉意', cPercent: 42, pPercent: 58, sentiment: 'default', sources: '21篇文章'}
    ];

    let mostReadArticles;
    if (language === 'en') {
        mostReadArticles = mostReadArticles_en;
    } else if (language === 'zh-Hant') {
        mostReadArticles = mostReadArticles_zht;
    } else if (language === 'zh-Hans') {
        mostReadArticles = mostReadArticles_zhs; 
    } else {
        mostReadArticles = mostReadArticles_en; // Default to English if no match
    }

    return (
      <div className="relative w-9/10 flex-grow flex-col justify-start items-start mx-auto px-2 pb-8">
        <h2 className="font-bold text-xl mt-2 mb-6">
            {language === 'zh-Hant' ? '熱門新聞' : language === 'zh-Hans' ? '热门新闻' : 'Most Read'}
        </h2>

        {mostReadArticles.map((article, index) => (
            <div key={index} className="flex-grow flex-col justify-between items-start mt-4 pb-6 border-b border-[var(--color-line-grey)]">
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
    )
  }
  
  export default MostRead;
  