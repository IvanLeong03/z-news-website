import React from "react";
import { useLanguage } from "../context/LanguageContext";
import SplitBar from "../metric-components/SplitBar";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";


function SearchObject({index}) {
    const { language } = useLanguage();

    const result = {
        id: "101",
        title: {
            en: `Result ${index}`,  // Fixed string interpolation
            "zh-Hant": `文章 ${index}`,
            "zh-Hans": `文章 ${index}`
        },
        image: "src/assets/university1.jpg",
        date: "30-02-2025",
        cPercent: 49,
        pPercent: 51,
        sources: 22
    };

    return (

        <div className="grid grid-cols-1">
            <div className="flex w-full my-6 min-h-[25dvh]">
                {/* left: date, title, metrics */}
                <div className="flex flex-col w-3/4 px-5">
                    <p className="text-xs">{result.date}</p>
                    <h2 className="text-2xl font-semibold mt-6 mb-12">{result.title[language] || result.title.en}</h2>
                    <div className="w-3/4 flex justify-between items-start">
                        <div className="p-2 w-1/4">
                            <SplitBar cPercent={result.cPercent} pPercent={result.pPercent} />
                        </div>
                        <div className="p-2 w-1/4">
                            <SentimentSlider />
                        </div>
                        <div className="p-2 w-1/4">
                            <SubjectivitySlider />
                        </div>
                        <div className="p-2">
                            <p className="text-sm">
                                {result.sources} {language === "zh-Hant" || language === "zh-Hans" ? "篇文章" : "source results"}
                            </p>
                        </div>
                    </div>
                </div>
                {/* right: image */}
                <div className="w-1/4 bg-[var(--color-dark-turquoise)]"></div>
            </div>
        </div>
        
    );

};

export default SearchObject;