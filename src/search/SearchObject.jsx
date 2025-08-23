import React from "react";
import { useLanguage } from "../context/LanguageContext";
import SplitBar from "../metric-components/SplitBar";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";


function SearchObject({article}) {
    const { language } = useLanguage();

    return (

        <div className="grid grid-cols-[3fr_1fr] w-full my-6 min-h-[25dvh]">
            {/* left: date, title, metrics */}
            <div className="flex flex-col px-5">
                <p className="text-xs">{article.date.slice(0, 10)}</p>
                <h2 className="text-2xl font-semibold my-8">{article.title}</h2>
                <div className="w-full flex justify-between items-center">                    
                    <div className="w-full p-4">
                        <SentimentSlider sentiment={article.metrics.sentiment}/>
                    </div>
                    <div className="w-full p-4">
                        <SubjectivitySlider subjScore={Math.abs(article.metrics.subjectivity)}/>
                    </div>
                </div>
            </div>
            {/* right: image */}
            <div className="aspect-[16/9] overflow-hidden">
                <img src={article.pictureURL} className="w-full h-full object-cover"/>
            </div>
            
        </div>

        
    );

};

export default SearchObject;