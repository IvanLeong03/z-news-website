import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SentimentGauge from "../metric-components/SentimentGauge";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import SplitBar from "../metric-components/SplitBar";

function ArticleMetrics({article}) {
    const { language } = useLanguage();

    return (
        <div className="px-4 rounded-xl flex flex-col justify-between border border-dashed border-[var(--color-line-grey)]">
            <h2 className="font-semibold text-2xl my-2">Article in numbers</h2>
            <div className="w-full grid grid-cols-[1fr] lg:grid-cols-[1fr_1fr_1fr] items-center py-8 xl:py-16 ">
                <div className="px-8 mx-4">
                    <SentimentGauge sentiment={article.metrics.sentiment}/>            
                </div>
                <div className="px-8 mx-4">
                    <SubjectivitySlider subjScore={article.metrics.subjectivity}/>              
                </div>
                <div className="px-8 mx-4">
                    <SplitBar cPercent={article.coverage.percentage.centric*100} pPercent={article.coverage.percentage.progressive*100}/>
                </div>
            </div>
            
            <Link to="/user-guide" className="hover:underline">
                <p className="text-sm 2xl:text-base mt-2">
                    {language === "zh-Hant" ? "點擊此處了解我們如何計算這些指標" 
                    : language === "zh-Hans" ? "点击此处了解我们如何计算这些指标" 
                    : "Click here to for more details on how we calculate these metrics"}
                </p>                                           
            </Link>
        </div>       
    );

}

export default ArticleMetrics;