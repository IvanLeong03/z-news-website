import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SentimentGauge from "../metric-components/SentimentGauge";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import SplitBar from "../metric-components/SplitBar";

function ArticleMetrics({article}) {
    const { language } = useLanguage();

    return (
        <div className="mb-8 w-full flex flex-col justify-between border-b-2 border-[var(--color-line-darkgrey)]">
            <h2 className="text-xl font-semibold mb-2">Coverage Analysis</h2>
            <div className="w-full flex flex-col gap-8 items-center py-4">
                <div className="w-full px-8 pt-2 pb-12 rounded-xl border border-[var(--color-line-darkgrey)]">
                    <SentimentGauge sentiment={article.metrics.sentiment}/>            
                </div>
                <div className="w-full px-8 py-2 rounded-xl border border-[var(--color-line-darkgrey)] max-h-48">
                    <SubjectivitySlider subjScore={article.metrics.subjectivity}/>              
                </div>
                <div className="w-full px-8 py-2 rounded-xl border border-[var(--color-line-darkgrey)] max-h-48">
                    <h2 className="mb-4">{language === "zh-Hant" ? "立場分布" : language === "zh-Hans" ? "立场分布": "Leaning Distribution"}</h2>
                    <SplitBar cPercent={article.coverage.percentage.centric*100} pPercent={article.coverage.percentage.progressive*100}/>
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