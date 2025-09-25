import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import SplitBar from "../metric-components/SplitBar";


function SearchObject({article}) {
    const { language } = useLanguage();
    const cp = (
        article.coverage?.centric !== undefined
            ? Math.round(article.coverage.centric * 100)
            : article.coverage?.percentage?.centric * 100
    );

    const pp = (
        article.coverage?.progressive !== undefined
            ? Math.round(article.coverage.progressive * 100)
            : article.coverage?.percentage?.progressive * 100
    );

    return (
        //same object as the topic one
        <div className="grid grid-cols-[3fr_1fr] w-full border-b border-[var(--color-line-verylightgrey)] py-2">
            {/* left: date, title, metrics */}
            <div className="flex flex-col justify-center pl-8 pr-16">
                <Link to={`/article/${article.articleID}`}>
                    <p className="text-xs my-2">{article.date.slice(0,10)}</p>
                    <p className="text-sm my-2 text-[var(--color-primary)]">{article.region}</p>
                    <h2 className="text-2xl font-semibold mt-4 mb-6">{article.title}</h2>
                    <div className="w-full flex justify-between items-center mb-4">                    
                        <div className="w-1/2">
                            <SentimentSlider sentiment={article.metrics.sentiment}/>
                        </div>
                        <div className="w-1/2 px-36">
                            <SubjectivitySlider subjScore={Math.abs(article.metrics.subjectivity)}/>
                        </div>
                        <div className="w-1/3">
                            <SplitBar cPercent={cp} pPercent={pp}/>
                        </div>
                    </div>
                </Link>
            </div>
            {/* right: image */}
            <div className="aspect-[16/9] overflow-hidden">
                <Link to={`/article/${article.articleID}`}>
                    <img src={article.pictureURL} className="w-full h-full object-cover"/>
                </Link>
            </div>
        </div>        
    );

};

export default SearchObject;