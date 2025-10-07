import React from "react";
import SentimentSlider from "../metric-components/SentimentSlider";
import { useLanguage } from "../context/LanguageContext";

function HeadlineLg({article}) {
    const { language } = useLanguage();

    function getHoursAgo(dateString) {
        const articleDate = new Date(dateString);
        const now = new Date();
        const diffMs = now - articleDate;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        return diffHours;
    }

    return (
        <article className="relative w-9/10 mx-auto flex flex-col mb-8">
            {/* Image */} 
            <div className="aspect-[16/9] w-full max-w-full h-full">
                <img src={article.pictureURL} alt="Headline" className="max-w-full w-full h-full object-cover" />
            </div>
            {/* Region and sector */}            
            <div className="flex text-[var(--color-primary)] my-2 text-sm">
                <label>{article.region}</label>
                <label className="mx-2">|</label>
                <label>{article.sector}</label>
            </div>
            {/* Title */}
            <h1 className="my-1 text-2xl lg:text-4xl font-bold text-left">
                {article.title}
            </h1>
            <p className="text-sm text-[var(--color-text-lightgrey)] mt-2 mb-4 line-clamp-2">
                {article.description.synopsis}
            </p>
            {/* Metrics */}
            <div className="w-full px-2 grid grid-cols-[2fr_1fr]">
                <div>
                    <SentimentSlider sentiment={article.metrics.sentiment} />
                </div>
                <div className="flex justify-center items-center px-2">
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
    );
}

export default HeadlineLg;