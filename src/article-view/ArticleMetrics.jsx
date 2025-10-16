import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SentimentGauge from "../metric-components/SentimentGauge";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";

function ArticleMetrics({article}) {
    const { language } = useLanguage();

    return (
        <div className="w-full flex flex-col justify-between">
            <div className="w-full flex flex-col gap-8 items-center pb-4">
                <div className="w-full px-4 pt-2 pb-12 rounded-xl border border-[var(--color-line-darkgrey)]">
                    <SentimentGauge sentiment={article.metrics.sentiment}/>            
                </div>
                <div className="w-full px-4 py-4 rounded-xl border border-[var(--color-line-darkgrey)]">
                    <SubjectivitySlider subjScore={article.metrics.subjectivity}/>              
                </div>
            </div>
            
            <Link to="/user-guide" className="hover:underline">
                <p className="text-sm mb-8">
                    {language === "zh-Hant" ? "點擊此處了解我們如何計算這些指標" 
                    : language === "zh-Hans" ? "点击此处了解我们如何计算这些指标" 
                    : "Click here to for more details on how we calculate these metrics"}
                </p>                                           
            </Link>
        </div>       
    );

}

export default ArticleMetrics;