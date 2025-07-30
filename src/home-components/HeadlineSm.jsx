import React from "react";
import SplitBar from "../metric-components/SplitBar";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import { useLanguage } from "../context/LanguageContext";

function HeadlineSm({headline = "default headline", image = "logos/logo_vertical_white_gradientbg.png", cPercent=50, liberalPercent=50, sources=3, sentimentScore, subjScore}) {
    const { language } = useLanguage();
    return (
        <article className="flex items-stretch w-full mb-6">
            <div className="w-3/5 flex flex-col h-full flex-shrink-0">
                <div className="w-full aspect-[16/9]">
                    <img src={image} alt='HeadlineImage' className="w-full h-full object-cover" />
                </div> 
                                                                   
                <h1 className="w-full text-lg lg:text-xl font-semibold my-2 text-left">{headline}</h1>
                <p className="text-xs text-left">{sources} {language === 'zh-Hant' ? "篇文章" : language === 'zh-Hans' ? "篇文章" : "source articles" }</p>
            </div>
            
            <div className="w-2/5 h-full px-2 flex flex-col justify-start gap-4">
                <div>
                    <SplitBar cPercent={cPercent} liberalPercent={liberalPercent}/>
                </div>
                <div className="pt-6">
                    <SentimentSlider sentiment={sentimentScore}/>
                </div>
                <div>
                    <SubjectivitySlider subjScore={subjScore}/>
                </div>
            </div>
        </article>
    )
}

export default HeadlineSm;

