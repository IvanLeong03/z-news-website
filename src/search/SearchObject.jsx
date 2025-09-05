import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";


function SearchObject({article}) {
    const { language } = useLanguage();

    return (
        //same object as the topic one
        <div className="grid grid-cols-[3fr_1fr] w-full my-12 min-h-[25dvh] border-b border-[var(--color-line-verylightgrey)]">
            {/* left: date, title, metrics */}
            <div className="flex flex-col pl-8 pr-16">
                <Link to={`/article/${article.articleID}`}>
                    <p className="text-xs">{article.date.slice(0,10)}</p>
                    <h2 className="text-2xl font-semibold mt-2 mb-6">{article.title}</h2>
                    <div className="w-full flex justify-between items-center gap-x-16 h-24 mb-4">                    
                        <div className="w-full">
                            <SentimentSlider sentiment={article.metrics.sentiment}/>
                        </div>
                        <div className="w-2/3">
                            <SubjectivitySlider subjScore={Math.abs(article.metrics.subjectivity)}/>
                        </div>
                    </div>
                </Link>
            </div>
            {/* right: image */}
            <div className="overflow-hidden pb-4">
                <Link to={`/article/${article.articleID}`}>
                    <img src={article.pictureURL} className="w-full h-full object-cover"/>
                </Link>
            </div>
        </div>        
    );

};

export default SearchObject;