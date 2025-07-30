import React from "react";
import SplitBar from "../metric-components/SplitBar";
import { useLanguage } from "../context/LanguageContext";

function Today() {
    const { language } = useLanguage();
    const articles = [
        
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 45,
            liberalPercent: 55,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 52,
            liberalPercent: 48,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 65,
            liberalPercent: 35,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 56,
            liberalPercent: 44,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 40,
            liberalPercent: 60,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 28,
            liberalPercent: 72,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 80,
            liberalPercent: 20,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 50,
            liberalPercent: 50,
            imageUrl: "image",
        }
        
    ];


    return (
        <div className="flex flex-col w-[80%] mx-auto my-16">
            <h1 className="text-5xl font-bold my-4 pl-5">{language === "zh-Hant" ? "今日頭條" : language === "zh-Hans" ? "今日头条" : "TODAY"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articles.map((article, index) => (
                    <div
                        key={index}
                        className={
                            index === 0
                                ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-1 flex flex-col rounded-lg p-4 m-2 lg:h-[32rem]"
                                : "flex flex-col rounded-lg p-4 m-2"
                        }
                        style={index === 0 ? { minHeight: '20rem' } : {}}
                    >
                        <div className="w-full aspect-[16/9] overflow-hidden border border-[var(--color-line-grey)]">
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-1/2 my-4">
                            <SplitBar cPercent={article.cPercent} liberalPercent={article.liberalPercent} />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}   


export default Today;