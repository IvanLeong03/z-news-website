import React from "react";
import SplitBar from "../metric-components/SplitBar";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";

function HeadlineLg({headline = "default headline", image = "logos/logo_vertical_white_gradientbg.png", cPercent=50, pPercent=50, sources=3}) {
    return (
        <article className="flex flex-grow flex-col justify-center items-center w-9/10 min-h-[40dvh] mx-auto mt-2 mb-12">
            <img src={image} alt='HeadlineImage' className="w-full"></img>
            <h1 className="w-full text-4xl font-bold my-4 text-left">{headline}</h1>
            <div className="w-full flex justify-between items-start mt-4">
                <div className="w-3/10 px-1">
                    <SplitBar cPercent={cPercent} pPercent={pPercent}/>
                </div>
                <div className="w-3/10 px-4">
                    <SentimentSlider />
                </div>
                <div className="w-3/10 px-4">
                    <SubjectivitySlider />
                </div>
                <div className="w-1/10 px-1">
                    <p className="text-sm text-right">{sources} sources</p>
                </div>
            </div>
        </article>
    )


}

export default HeadlineLg;

