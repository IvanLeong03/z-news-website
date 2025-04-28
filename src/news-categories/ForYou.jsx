import React from "react";
import SplitBar from "../metric-components/SplitBar";


function ForYou() {
    const articles = [
        
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


    return (
        <div className="flex flex-col w-[80dvw] mx-auto my-16">
            <h1 className="text-5xl font-bold my-4 pl-5">For You</h1>
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


export default ForYou;