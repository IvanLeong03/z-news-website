import React from "react";
import SplitBar from "../metric-components/SplitBar";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import { useLanguage } from "../context/LanguageContext";

function HeadlineSm({headline = "default headline", image = "logos/logo_vertical_white_gradientbg.png", cPercent=50, pPercent=50, sources=3, sentimentScore, subjScore, region, sector}) {
    const { language } = useLanguage();
    return (
        <article className="flex flex-col items-stretch w-full mb-6">
            <div className="w-full flex">
                {/* image */}
                <div className="w-2/5 aspect-[16/9] overflow-hidden">
                    <img src={image} alt='HeadlineImage' className="w-full h-full object-cover" />
                </div>
                {/* sentiment score */}
                <div className="w-3/5 p-2">
                    <SentimentSlider sentiment={sentimentScore}/>
                </div>                
            </div>

            <div className="w-full flex flex-col">
                <div className="flex text-[var(--color-primary)] my-2 text-sm">
                    <label>{region}</label>
                    <label className="mx-2">|</label>
                    <label>{sector}</label>
                </div>                                                                     
                <h1 className="w-full text-lg lg:text-xl font-semibold text-left">{headline}</h1>
                <p className="text-xs text-left">{sources} {language === 'zh-Hant' ? "篇文章" : language === 'zh-Hans' ? "篇文章" : "source articles" }</p>
            </div>
        </article>
    )
}

export default HeadlineSm;

