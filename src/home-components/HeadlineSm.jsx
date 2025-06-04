import React from "react";
import SplitBar from "../metric-components/SplitBar";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import { useLanguage } from "../context/LanguageContext";

function HeadlineSm({headline = "Undefined Headline", image = "logos/logo_vertical_white_gradientbg.png", cPercent=50, pPercent=50, sources=3, sentScore=0, subjScore=0}) {
    const { language } = useLanguage();
    return (
        <article className="flex items-stretch w-full justify-center min-h-[15rem] mx-auto my-2">
            <div className="w-2/3 flex flex-col h-full pr-2 flex-shrink-0 ">
                <div className="w-full aspect-[16/9] overflow-hidden flex-shrink-0 min-h-[10rem]">
                    <img src={image} alt='HeadlineImage' className="object-cover w-full h-full" />
                </div>                
                <h1 className="w-full text-2xl font-semibold my-2 text-left">{headline}</h1>
                <p className="text-sm text-left">{sources} {language === 'zh-Hant' ? "篇文章" : language === 'zh-Hans' ? "篇文章" : "source articles" }</p>
            </div>
            
            <div className="w-1/3 h-full flex flex-col justify-evenly gap-4">
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

