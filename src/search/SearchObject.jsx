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
        <div className="grid grid-cols-[3fr_1fr] w-full border-b border-[var(--color-line-verylightgrey)] items-center py-2">
            {/* left: date, title, metrics */}
            <div className="flex flex-col justify-center min-w-0">
                <Link to={`/article/${article.articleID}`}>
                    <p className="text-sm my-1 text-[var(--color-primary)]">{article.region}</p>
                    <p className="text-xs my-1">{article.date.slice(0,10)}</p>                    
                    <h2 className="text-2xl font-semibold mt-2 mb-8">{article.title}</h2>
                    <div className="w-full grid grid-cols-[1fr_1fr_1fr] items-center">                    
                        <div className="pr-8">
                            <SentimentSlider sentiment={article.metrics.sentiment}/>
                        </div>
                        <div className="px-12 2xl:px-20">
                            <SubjectivitySlider subjScore={Math.abs(article.metrics.subjectivity)}/>
                        </div>
                        <div className="pl-8">
                            <SplitBar cPercent={cp} pPercent={pp}/>
                        </div>
                    </div>
                </Link>
            </div>
            {/* right: image */}
            <div className="aspect-[3/2] overflow-hidden min-w-0 w-2/3 mx-auto">
                <Link to={`/article/${article.articleID}`}>
                    <img src={article.pictureURL} className="w-full h-full object-cover"/>
                </Link>
            </div>
        </div>        
    );

};

export default SearchObject;