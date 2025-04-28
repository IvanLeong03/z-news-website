import React from "react";
import SplitBar from "../metric-components/SplitBar";


function China() {
    const articles = [
        {
            title: "China's Economic Growth Slows",
            cPercent: 50,
            pPercent: 50,
            imageUrl: "image",
        },
        {
            title: "China's Tech Industry Faces New Regulations",
            cPercent: 40,
            pPercent: 60,
            imageUrl: "src/assets/university1.jpg",
        },
        {
            title: "Something that happened in China",
            cPercent: 62,
            pPercent: 38,
            imageUrl: "/src/assets/SampleImage.jpg",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 31,
            pPercent: 69,
            imageUrl: "image1.jpg",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 43,
            pPercent: 57,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 58,
            pPercent: 42,
            imageUrl: "src/assets/sea",
        },
    ];

    return (
        <div className="flex flex-col w-[80dvw] mx-auto my-16">
            <h1 className="text-5xl font-bold my-4 pl-5">China</h1>
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


export default China;