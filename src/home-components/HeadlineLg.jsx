import React from "react";
import SplitBar from "../metric-components/SplitBar";
import Sentiment from "../metric-components/Sentiment";

function HeadlineLg({headline = "default headline", image = "logos/logo_vertical_white_gradientbg.png"}) {
    return (
        <article className="flex flex-grow flex-col justify-center items-center w-9/10 min-h-[40dvh] mx-auto mt-2 mb-12">
            <img src={image} alt='HeadlineImage' className="w-full"></img>
            <h1 className="w-full text-4xl font-bold my-4 text-left">{headline}</h1>
            <div className="w-full flex justify-between items-center">
                <div className="w-3/10 pr-2">
                    <SplitBar cPercent={33} pPercent={67}/>
                </div>
                <div className="w-3/10 pr-2">
                    <Sentiment />
                </div>
                <div className="w-3/10 pr-2">
                    <Sentiment sentiment="subjectivity analysis"/>
                </div>
                <div className="w-1/10 pr-2">
                    <p className="text-sm text-right">30 sources</p>
                </div>
            </div>
        </article>
    )


}

export default HeadlineLg;

