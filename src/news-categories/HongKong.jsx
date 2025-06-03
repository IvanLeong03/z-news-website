import React from "react";
import SplitBar from "../metric-components/SplitBar";
import { useLanguage } from "../context/LanguageContext";


function HongKong() {

    const { language } = useLanguage();
    
    const articles_en = [   
        {
            title: "We will select articles that you may be interested in based on you activity",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "src/assets/sea.webp",
        },
        {
            title: "We will select articles that you may be interested in based on you activity",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "src/assets/sea.webp",
        },
        {
            title: "We will select articles that you may be interested in based on you activity",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "src/assets/sea.webp",
        },
        {
            title: "We will select articles that you may be interested in based on you activity",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "image",
        },
    ];

    const articles_zht = [
        {
            title: "我們會根據你的瀏覽紀錄選擇你可能感興趣的文章",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "src/assets/sea.webp",
        },
        {
            title: "我們會根據你的瀏覽紀錄選擇你可能感興趣的文章",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "src/assets/sea.webp",
        },
        {
            title: "我們會根據你的瀏覽紀錄選擇你可能感興趣的文章",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "src/assets/sea.webp",
        },
        {
            title: "我們會根據你的瀏覽紀錄選擇你可能感興趣的文章",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "image",
        },
    ];

    const articles_zhs = [
        {
            title: "我们会根据你的浏览记录选择你可能感兴趣的文章",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "src/assets/sea.webp",
        },
        {
            title: "我们会根据你的浏览记录选择你可能感兴趣的文章",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "src/assets/sea.webp",
        },
        {
            title: "我们会根据你的浏览记录选择你可能感兴趣的文章",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "src/assets/sea.webp",
        },
        {
            title: "我们会根据你的浏览记录选择你可能感兴趣的文章",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "image",
        },
    ];

    let articles;
    if (language === "zh-Hant") {
        articles = articles_zht;
    } else if (language === "zh-Hans") {
        articles = articles_zhs;
    } else {
        articles = articles_en;
    }

    return (
        <div className="flex flex-col w-[80dvw] mx-auto my-16">
            <h1 className="text-5xl font-bold my-4 pl-5">{language === "zh-Hant" ? "香港" : language === "zh-Hans" ? "香港" : "HONG KONG"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                    <div key={index} className="flex flex-col rounded-lg p-4 m-2">
                        <div className="w-full aspect-[16/9] overflow-hidden border border-[theme(--color-line-grey)]">
                            <img
                                src={article.imageUrl}
                                alt={article.title}                                
                                className="object-cover w-full h-full"
                            />
                        </div>
                        
                        <div className="w-1/2 my-4">
                            <SplitBar cPercent={article.cPercent} pPercent={article.pPercent} />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}   

export default HongKong;