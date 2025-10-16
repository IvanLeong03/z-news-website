import React from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";

function HeadlineSm({article}) {
    const { language } = useLanguage();

    function getHoursAgo(dateString) {
        const articleDate = new Date(dateString);
        const now = new Date();
        const diffMs = now - articleDate;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        return diffHours;
    }

    return (
        <article className="flex flex-col items-stretch w-[95%] mx-auto pb-4 border-b border-[var(--color-line-verylightgrey)] hover:shadow-md">
            {/* region, sector, headline, nSources and time */}
            <div className="w-full flex flex-col">
                <div className="w-full aspect-[16/9] overflow-hidden">
                    <img src={article.pictureURL} alt='HeadlineImage' className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-in-out" />
                </div>
                <div className="flex text-[var(--color-primary)] my-2 text-sm">
                    <label>{article.region}</label>
                    <label className="mx-2">|</label>
                    <label>{article.sector}</label>
                </div>                                                                     
                <h1 className="w-full text-lg lg:text-xl font-semibold text-left hover:text-[var(--color-text-lightgrey)] line-clamp-2 h-[4rem]">{article.title}</h1>
                <div className="w-2/3 my-2">
                    <SentimentSlider sentiment={article.metrics.sentiment}/>
                </div> 
                <div className="flex items-center my-1">
                    <p className="text-xs whitespace-nowrap">
                        {article.nSources}
                        {language === 'zh-Hant' ? '篇文章' : language === 'zh-Hans' ? '篇文章' : ' articles'}
                    </p>
                    <label className="mx-2"> · </label>
                    <p className="text-xs whitespace-nowrap">
                        {getHoursAgo(article.date)}
                        {language === 'zh-Hant' ? '小時前' : language === 'zh-Hans' ? '小时前' : 'h ago'}
                    </p>
                </div>
            </div>
        </article>
    )
}

export default HeadlineSm;

