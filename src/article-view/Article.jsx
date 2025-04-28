import React from "react";
import SplitBar from "../metric-components/SplitBar";
import Sentiment from "../metric-components/Sentiment";
import SentimentExplanation from "../metric-components/SentimentExplanation";
import Ads from "../home-components/Ads";
import { useParams } from "react-router-dom";
import articles from "./articles";


function Article() {
    
    const { id } = useParams(); 
    const article = articles.find((a) => a.id === id);
    if (!article) return <p>Article not found.</p>;

    const summaryCentric = [
        //summaries for centric 
        [
            "Xi Jinping urged global CEOs to safeguard industrial and supply chains",
            "Concerns persist over China’s weak post-pandemic economic recovery",
            "Looming US tariffs heighten trade tensions",
            "Geopolitical issues and regulatory crackdowns affect foreign firms",
            "Business confidence and foreign investment are being undermined"
        ], 
        [
            "China is aiming to reassure foreign investors",
            "Seeks to stabilise and secure global trade",
            "Rising US tariffs add pressure on economic relations",
            "Domestic crackdowns raise concerns among foreign firms",
            "Geopolitical tensions further complicate investor confidence",
            "Indicates China's concerns over economic stability and supply chain security",
        ]
    ];
    // will have to move these to a separate file that matches summaries to article id, currently all articles have the same summaries


    return (
        <>
        <article className="flex justify-center items-start w-dvw h-full mx-auto">
            { /* first column: article itself */}
            <div className="w-3/5 min-h-dvh py-6 px-1">
                { /* article title and image */ }
                <div className="flex-col flex-grow w-9/10 mx-auto">
                    <div className="flex text-[#252525] text-xs">
                        <p className="pr-4 border-r border-[theme(--color-line-verylightgrey)]">{article.location}</p>
                        <p className="px-4 border-r border-[theme(--color-line-verylightgrey)]">First reported: {article.firstReported}</p>
                        <p className="px-4">Published: {article.published}</p>
                    </div>
                    <img src={article.image} className="w-full" />
                    <h1 className="text-3xl font-semibold my-2">{article.title}</h1>
                </div>
                { /* summaries */}
                <div className="flex flex-col w-9/10 mx-auto my-8 ">
                    <div className="flex w-1/3 my-2 gap-1">
                        <button className="px-4 rounded-xl border border-[theme(--color-line-grey)]">Centric</button>
                        <button className="px-4 rounded-xl border border-[theme(--color-line-grey)]">Progressive</button>
                    </div>

                    <div className="grid grid-rows-2 bg-[theme(--color-summary-background)] min-h-[20rem] px-2">
                        <div className="border-b border-[theme(--color-line-grey)] py-4">
                            <h2 className="font-bold">What happened</h2>
                            <ul className="list-disc list-inside">
                                {summaryCentric[0].map((event, index) => (
                                    <li key={index} className="text-lg px-6 my-1">{event}</li>
                                ))}
                            </ul>                        
                        </div>
                        
                        <div className="py-4">
                            <h2 className="font-bold">What it means</h2>
                            <ul className="list-disc list-inside">
                                {summaryCentric[1].map((implication, index) => (
                                    <li key={index} className="text-lg px-6 my-1">{implication}</li>
                                ))}
                            </ul>      
                            
                        </div>
                        
                        <p className="text-[theme(--color-text-lightgrey)] text-xs px-4">by ZimuthAI | report if you think something is wrong here</p>
                    </div>

                </div>
                { /* reported articles */}
                <div className="flex flex-col w-9/10 mx-auto my-4">
                    <h1 className="font-bold text-xl">Reported articles</h1>
                    <ul className="p-2">
                        <li>Article 1</li>
                        <li>Article 2</li>
                        <li>Article 3</li>
                    </ul>

                </div>
                
               
            </div>
            { /* second column: distribution, sentiment, subjectivity */}
            <div className="flex-col flex-grow justify-center w-1/5 min-h-dvh border-l border-black py-6 px-1">
                <div className="w-4/5 mx-auto border-b border-[theme(--color-line-grey)]">
                    <h1 className="font-bold text-xl">Leaning distribution</h1>
                    <div className="mt-4 my-2">
                        <SplitBar cPercent={50} pPercent={50} />
                    </div>
                    <div className="flex justify-between w-9/10 mx-auto text-xs">
                        <p>Centric: 50%</p>
                        <p>Progressive: 50%</p>
                        { /* change these to be imported from the article */ }
                    </div>
                    <div className="my-4">
                        <SentimentExplanation sentiment={"Outlet listings"} />
                    </div>
                    <div className="my-4">
                        <SentimentExplanation sentiment={"Stats for distribution"} />
                    </div>

                </div>    
                <div className="w-4/5 mx-auto border-b border-[theme(--color-line-grey)]">
                    <div className="mt-4 mb-2">
                        <Sentiment />
                    </div>
                    <div className="my-4">
                        <SentimentExplanation sentiment={"Elaboration"} />
                    </div>
                
                </div>   
                <div className="w-4/5 mx-auto">
                    <div className="mt-4 mb-2">
                        <Sentiment sentiment={"subjectivity analysis"} />
                    </div>
                    <div className="my-4">
                        <SentimentExplanation sentiment={"Elaboration"} />
                    </div>
                
                </div>              
                
            </div>
            { /* third column: ads */}
            <div className="flex-col flex-grow w-1/5 min-h-dvh border-l border-r border-black py-6 px-1">
                <img src="src/assets/customise-ads-button.svg" className="w-1/3 mx-auto" />
                {/* make it a button */}
                <Ads />

            </div>


        </article>
        
        
        </>
    
    )
        

}


export default Article;