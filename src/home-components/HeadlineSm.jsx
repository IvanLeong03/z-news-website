import React from "react";
import SplitBar from "../metric-components/SplitBar";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import { useLanguage } from "../context/LanguageContext";

function HeadlineSm({headline = "default headline", image = "logos/logo_vertical_white_gradientbg.png", cPercent=50, pPercent=50, sources=3, sentScore, subjScore}) {
    const { language } = useLanguage();
    return (
        <article className="flex items-stretch w-full h-[25rem] mb-6">
            <div className="w-2/3 min-w-[22rem] flex flex-col h-full flex-shrink-0 border border-black">
                <div className="w-full aspect-[16/9]">
                    <img src={image} alt='HeadlineImage' className="w-full h-full object-cover" />
                </div> 
                                                                   
                <h1 className="w-full min-w-[22rem] bg-amber-200 text-lg lg:text-xl font-semibold my-2 text-left">{headline}</h1>
                <p className="text-xs text-left">{sources} {language === 'zh-Hant' ? "篇文章" : language === 'zh-Hans' ? "篇文章" : "source articles" }</p>
            </div>
            
            <div className="w-1/3 min-w-[11rem] h-full px-2 flex flex-col justify-start gap-4 border border-red-300">
                <div>
                    <SplitBar cPercent={cPercent} pPercent={pPercent}/>
                </div>
                <div className="pt-6">
                    <SentimentSlider sentScore={sentScore}/>
                </div>
                <div>
                    <SubjectivitySlider subjScore={subjScore}/>
                </div>
            </div>
        </article>
    )
}

export default HeadlineSm;

