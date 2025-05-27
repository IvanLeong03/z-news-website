import React from "react";
import SplitBar from "../metric-components/SplitBar";
import Sentiment from "../metric-components/Sentiment";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";

function HeadlineSm({headline = "Undefined Headline", image = "logos/logo_vertical_white_gradientbg.png", cPercent=50, pPercent=50, sources=3}) {
    return (
        <article className="flex flex-grow justify-center items-start min-h-[20dvh] mx-auto my-2">
            <div className="w-2/3 flex flex-col pr-2 ">
                <img src={image} alt='HeadlineImage' className="w-full"></img>
                <h1 className="w-full text-2xl font-semibold my-2 text-left">{headline}</h1>
                <p className="text-sm text-left">({sources} sources)</p>

            </div>
            
            <div className="w-1/3 h-full flex-col justify-evenly items-start">
                <div className="pb-4">
                    <SplitBar cPercent={cPercent} pPercent={pPercent}/>
                </div>
                <div className="py-2">
                    <SentimentSlider />
                </div>
                <div className="py-1">
                    <SubjectivitySlider />
                </div>
            </div>
        </article>
    )


}

export default HeadlineSm;

