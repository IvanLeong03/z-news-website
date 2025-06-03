import React from "react";
import SplitBar from "../metric-components/SplitBar";
import SentimentExplanation from "../metric-components/SentimentExplanation";
import Ads from "../home-components/Ads";
import { useParams } from "react-router-dom";
import articles from "./articles";
import SentimentSlider from "../metric-components/SentimentSlider";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import { useLanguage } from "../context/LanguageContext";

function Article() {
    
    const { id } = useParams(); 
    const article = articles.find((a) => a.id === id);
    if (!article) return <p>Article not found.</p>;
    const linked_articles = article.linked_articles;
    const { language } = useLanguage();
    const summaryEn = [
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

    const summaryTraditional = [
        [
            "習近平敦促全球CEO維護產業和供應鏈",
            "中國疫情後經濟復甦乏力引發持續擔憂",
            "美國關稅升溫加劇貿易緊張",
            "地緣政治問題及監管打壓影響外資企業",
            "企業信心與外國投資受到削弱"
        ],
        [
            "中國致力於安撫外國投資者",
            "尋求穩定並保障全球貿易",
            "美國關稅上升加大經濟關係壓力",
            "國內打壓行動令外資企業擔憂",
            "地緣政治緊張進一步複雜化投資者信心",
            "顯示中國對經濟穩定與供應鏈安全的關切"
        ]
    ];

    const summarySimplified = [
        [
            "习近平敦促全球CEO维护产业和供应链",
            "中国疫情后经济复苏乏力引发持续担忧",
            "美国关税升温加剧贸易紧张",
            "地缘政治问题及监管打压影响外资企业",
            "企业信心与外国投资受到削弱"
        ],
        [
            "中国致力于安抚外国投资者",
            "寻求稳定并保障全球贸易",
            "美国关税上升加大经济关系压力",
            "国内打压行动令外资企业担忧",
            "地缘政治紧张进一步复杂化投资者信心",
            "显示中国对经济稳定与供应链安全的关切"
        ]
    ];

    let summary;
    if (language === "zh-Hant") {
        summary = summaryTraditional;
    } else if (language === "zh-Hans") {            
        summary = summarySimplified;
    } else {
        summary = summaryEn;
    }
    // will have to move these to a separate file that matches summaries to article id, currently all articles have the same summaries

    return (
        <article className="flex justify-center items-start w-[90dvw] h-full mx-auto">
            { /* first column: article itself */}
            <div className="w-3/5 min-h-dvh py-6 px-1">
                { /* article title and image */ }
                <div className="flex-col flex-grow w-9/10 mx-auto">
                    <div className="flex text-[#252525] text-xs">
                        <p className="pr-4 border-r border-[theme(--color-line-verylightgrey)]">{article.location?.[language]}</p>
                        <p className="px-4 border-r border-[theme(--color-line-verylightgrey)]">{language === 'zh-Hant'? "首次報導" : language === 'zh-Hans' ? "首次报导" : "First reported"}: {article.firstReported}</p>
                        <p className="px-4">Published: {article.published}</p>
                        { /* is this needed? */}
                    </div>
                    <img src={article.image} className="w-full" />
                    <h1 className="text-3xl font-semibold my-2">{article.title?.[language]}</h1>
                </div>
                { /* summaries */}
                <div className="flex flex-col w-9/10 mx-auto my-8 ">
                    <div className="flex my-2 gap-4">                    
                        <label className="min-w-1/5 text-center p-2 rounded-xl border border-[theme(--color-line-grey)]"> Centric: {article.cPercent}% </label> 
                        <label className="min-w-1/5 text-center p-2 rounded-xl border border-[theme(--color-line-grey)]"> Progressive: {article.pPercent}% </label> 
                    </div>

                    <div className="grid grid-rows-2 bg-[theme(--color-summary-background)] min-h-[20rem] px-2">
                        <div className="border-b border-[theme(--color-line-grey)] py-4">
                            <h2 className="font-bold">{language === "zh-Hant" ? "事件摘要" : language === "zh-Hans" ? "事件摘要" : "What happened"}</h2>
                            <ul className="list-disc list-inside">
                                {summary[0].map((event, index) => (
                                    <li key={index} className="text-lg px-6 my-1">{event}</li>
                                ))}
                            </ul>                        
                        </div>
                        
                        <div className="py-4">
                            <h2 className="font-bold">{language === "zh-Hant" ? "影響" : language === "zh-Hans" ? "影响" :  "What it means"}</h2>
                            <ul className="list-disc list-inside">
                                {summary[1].map((implication, index) => (
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
                    <ul className="my-4">
                        {linked_articles.map((linked_article, index) => (
                            <li className="py-2">{linked_article}</li>

                        ))}
                    </ul>    
                </div>                               
            </div>

            { /* second column: distribution, sentiment, subjectivity */}
            <div className="flex-col flex-grow justify-center w-1/5 min-h-dvh border-l border-black py-6 px-1">
                <div className="w-4/5 mx-auto border-b border-[theme(--color-line-grey)]">
                    <h1 className="font-bold text-xl">Leaning distribution</h1>
                    <div className="mt-4 my-2">
                        <SplitBar cPercent={article.cPercent} pPercent={article.pPercent} />
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
                        <SentimentSlider />
                    </div>
                    <div className="my-4">
                        <SentimentExplanation sentiment={"Elaboration"} />
                    </div>
                
                </div>   
                <div className="w-4/5 mx-auto">
                    <div className="mt-4 mb-2">
                        <SubjectivitySlider />
                    </div>
                    <div className="my-4">
                        <SentimentExplanation sentiment={"Elaboration"} />
                    </div>
                
                </div>              
                
            </div>
            { /* third column: ads */}
            <div className="w-1/5 min-h-dvh border-l border-black py-6 px-1">
                <div className="flex flex-col flex-grow">
                    <img src="/src/assets/customise-ads-button.svg" className="w-1/2 mx-auto" />
                    {/* make it a button */}
                    <Ads />
                    <Ads />
                </div>
                
            </div>

        </article>                

    )        
}

export default Article;