import React from "react";
import SplitBar from "../metric-components/SplitBar";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
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
        <article className="relative w-full min-w-[54vw] max-w-[90rem] flex flex-col mb-4">
            {/* Image */} 
            <div className="w-full aspect-[16/9]">
                <img src={article.pictureURL} alt="Headline" className="w-full h-full object-cover" />
            </div>
            {/* Region and sector */}
            <div className="flex text-[var(--color-primary)] mt-1 text-sm">
                <label>{article.region}</label>
                <label className="mx-2">|</label>
                <label>{article.sector}</label>
            </div>
            {/* Title */}
            <div className="w-full min-h-[4rem] flex items-center">
                <h1 className="w-full text-2xl lg:text-4xl font-bold text-left block">
                    {article.title}
                </h1>
            </div>
            {/* Metrics */}
            <div className="w-full grid grid-cols-[3fr_1fr]">
                <div className="w-3/4">
                    <SentimentSlider sentiment={article.metrics.sentiment} />
                </div>
                <div className="flex items-center px-2">
                    <p className="text-xs whitespace-nowrap">
                        {article.nSources}
                        {language === 'zh-Hant' ? '篇文章' : language === 'zh-Hans' ? '篇文章' : ' articles'}
                    </p>
                    <label className="mx-2"> · </label>
                    <p className="text-xs whitespace-nowrap">
                        {getHoursAgo(article.date)}
                        {language === 'zh-Hant' ? '小時前' : language === 'zh-Hans' ? '小时前' : ' hours ago'}
                    </p>
                </div>
            </div>            
        </article>
    );
}

export default HeadlineLg;