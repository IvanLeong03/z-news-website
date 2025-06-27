import React from "react";
import { useParams } from "react-router-dom";
import SplitBar from "../metric-components/SplitBar";
import { useLanguage } from "../context/LanguageContext";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";

const articles = [
    {
        id: "101",
        title: {
            en: "Article 1",
            "zh-Hant": "文章 1",
            "zh-Hans": "文章 1"
        },
        image: "src/assets/university1.jpg",
        date: "30-02-2025",
        cPercent: 49,
        pPercent: 51,
        sources: 22
    },
    {
        id: "102",
        title: {
            en: "Article 2",
            "zh-Hant": "文章 2",
            "zh-Hans": "文章 2"
        },
        image: "src/assets/university1.jpg",
        date: "30-02-2025",
        cPercent: 60,
        pPercent: 40,
        sources: 16
    },
    {
        id: "103",
        title: {
            en: "Article 3",
            "zh-Hant": "文章 3",
            "zh-Hans": "文章 3"
        },
        image: "src/assets/university1.jpg",
        date: "30-02-2025",
        cPercent: 40,
        pPercent: 60,
        sources: 18
    }
];

function Topic() {
    const { language } = useLanguage();
    const { topic } = useParams();

    // Determine heading based on language
    const headings = {
        en: `Spotlight: ${topic}`,
        "zh-Hant": `焦點：${topic}`,
        "zh-Hans": `聚焦：${topic}`
    };
    const heading = headings[language] || headings.en;

    return (
        <div className="w-[85dvw] min-h-dvh mx-auto my-8 p-2">
            <h1 className="text-4xl font-bold my-4 pl-5">{heading}</h1>
            {articles.map((article, index) => (
                <div key={index} className="grid grid-cols-1">
                    <div className="flex w-full my-6 min-h-[25dvh]">
                        {/* left: date, title, metrics */}
                        <div className="flex flex-col w-3/4 px-5">
                            <p className="text-xs">{article.date}</p>
                            <h2 className="text-2xl font-semibold mt-6 mb-12">{article.title[language] || article.title.en}</h2>
                            <div className="w-3/4 flex justify-between items-start">
                                <div className="p-2 w-1/4">
                                    <SplitBar cPercent={article.cPercent} pPercent={article.pPercent} />
                                </div>
                                <div className="p-2 w-1/4">
                                    <SentimentSlider />
                                </div>
                                <div className="p-2 w-1/4">
                                    <SubjectivitySlider />
                                </div>
                                <div className="p-2">
                                    <p className="text-sm">
                                        {article.sources} {language === "zh-Hant" || language === "zh-Hans" ? "篇文章" : "source articles"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* right: image */}
                        <div className="w-1/4 bg-pink-300"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Topic;