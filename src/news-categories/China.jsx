import React from "react";
import SplitBar from "../metric-components/SplitBar";
import { useLanguage } from "../context/LanguageContext";
import articles from "../article-view/articles";

function China() {
    const { language } = useLanguage();
    // Find the Xiaomi article (id: 007)
    const xiaomiArticle = articles.find(a => a.id === "007");
    // Create an array of 7 identical Xiaomi articles for demo
    const articlesToShow = Array(8).fill(xiaomiArticle);

    return (
        <div className="flex flex-col w-[80dvw] mx-auto my-16">
            <h1 className="text-5xl font-bold my-4 pl-5">{language === "zh-Hant" ? "中國" : language === "zh-Hans" ? "中国" : "CHINA"}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {articlesToShow.map((article, index) => (
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
                                src={article.image}
                                alt={article.title[language] || article.title.en}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-1/2 my-4">
                            <SplitBar cPercent={article.cPercent} pPercent={article.pPercent} />
                        </div>
                        <h2 className="text-xl font-semibold mb-2">{article.title[language] || article.title.en}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default China;