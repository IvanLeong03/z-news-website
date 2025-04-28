import React from "react";
import SplitBar from "../metric-components/SplitBar";


function HongKong() {
    const articles = [
        
        {
            title: "Hong Kong",
            cPercent: 62,
            pPercent: 38,
            imageUrl: "https://dam.mediacorp.sg/image/upload/s--E95kL9Gy--/c_fill,g_auto,h_468,w_830/fl_relative,g_south_east,l_one-cms:core:watermark:ap_data-1,w_0.1/f_auto,q_auto/v1/one-cms/core/hong_kong_library_books_88629.jpg?itok=I22XloSn",
        },
        {
            title: "something something hong kong",
            cPercent: 62,
            pPercent: 38,
            imageUrl: "/src/assets/university1.jpg",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 51,
            pPercent: 49,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 33,
            pPercent: 67,
            imageUrl: "image",
        },
        {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempor, purus vel.",
            cPercent: 41,
            pPercent: 59,
            imageUrl: "image",
        },
    ];


    return (
        <div className="flex flex-col w-[80dvw] mx-auto my-16">
            <h1 className="text-5xl font-bold my-4 pl-5">Hong Kong</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                    <div key={index} className="flex flex-col rounded-lg p-4 m-2">
                        { /* 
                        <div className="aspect-w-16 aspect-h-9 w-full">
                            <img 
                             src={article.imageUrl} 
                             className="w-full h-full object-cover border border-[theme(--color-line-grey)]"
                             alt={article.title}
                            />
                        </div>  */ }
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