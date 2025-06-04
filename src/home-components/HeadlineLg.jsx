import React from "react";
import SplitBar from "../metric-components/SplitBar";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import { useLanguage } from "../context/LanguageContext";

function HeadlineLg({headline = "default headline", image = "logos/logo_vertical_white_gradientbg.png", cPercent=50, pPercent=50, sources=3, sentScore, subjScore}) {
    const { language } = useLanguage();

    return (
        <article className="w-full flex flex-col items-stretch mb-8 max-w-full px-2">
            {/* Image */}
            <div className="w-full aspect-[16/9]">
                <img src={image} alt="Headline" className="w-full h-full object-cover" />
            </div>

            {/* Headline */}
            <div className="w-full min-h-[4rem] py-2 flex items-center">
                <h1 className="w-full min-w-[48rem] text-4xl font-bold text-left block">
                    {headline}
                </h1>
            </div>

            {/* Metrics */}
            <div className="w-full min-w-[48rem] xl:min-w-[72rem] flex flex-wrap justify-between items-start gap-4 px-4 py-2">
                <div className="flex-1">
                    <SplitBar cPercent={cPercent} pPercent={pPercent} />
                </div>
                <div className="flex-1">
                    <SentimentSlider sentScore={sentScore} />
                </div>
                <div className="flex-1">
                    <SubjectivitySlider subjScore={subjScore} />
                </div>
                <div className="text-sm text-right">
                    {sources} {language === 'zh-Hant' || language === 'zh-Hans' ? "篇文章" : "source articles"}
                </div>
            </div>
        </article>
    );
}

export default HeadlineLg;