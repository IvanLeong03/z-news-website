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
        <article className="flex flex-col items-stretch w-9/10 mx-auto pb-4 border-b border-[var(--color-line-verylightgrey)]">
            <div className="w-full flex">
                {/* image */}
                <div className="w-2/5 aspect-[16/9] overflow-hidden">
                    <img src={article.pictureURL} alt='HeadlineImage' className="w-full h-full object-cover" />
                </div>
                {/* sentiment score */}
                <div className="w-3/5 px-4">
                    <SentimentSlider sentiment={article.metrics.sentiment}/>
                </div>                
            </div>
            {/* region, sector, headline, nSources and time */}
            <div className="w-full flex flex-col">
                <div className="flex text-[var(--color-primary)] my-2 text-sm">
                    <label>{article.region}</label>
                    <label className="mx-2">|</label>
                    <label>{article.sector}</label>
                </div>                                                                     
                <h1 className="w-full text-lg lg:text-xl font-semibold text-left">{article.title}</h1>
                <div className="flex items-center my-1">
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
    )
}

export default HeadlineSm;

