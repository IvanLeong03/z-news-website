import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SentimentGauge from "../metric-components/SentimentGauge";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import SplitBar from "../metric-components/SplitBar";

function ArticleMetrics({article}) {
    const { language } = useLanguage();

    return (
        <div className="px-4 mb-8 flex flex-col justify-between border-b-2 border-[var(--color-line-darkgrey)]">
            <h2 className="text-xl font-semibold mb-2">Coverage Analysis</h2>
            <div className="w-full flex flex-col items-center py-8">
                <div className="w-full px-8 my-8 pb-16 rounded-xl border border-[var(--color-line-darkgrey)]">
                    <SentimentGauge sentiment={article.metrics.sentiment}/>            
                </div>
                <div className="w-full px-8 my-8 py-4 rounded-xl border border-[var(--color-line-darkgrey)]">
                    <SubjectivitySlider subjScore={article.metrics.subjectivity}/>              
                </div>
                <div className="w-full px-8 mt-8 mb-2 py-12 rounded-xl border border-[var(--color-line-darkgrey)]">
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