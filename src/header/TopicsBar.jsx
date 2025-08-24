import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage} from "../context/LanguageContext";

function TopicsBar() {
    const navigate = useNavigate();
    const { language, setLanguage } = useLanguage();

    const topics_en = [
        "Financial Budget",
        "Two Sessions",
        "Trade War",
        "Tariff"
    ];

    const topics_zht = [
        "財政預算案",
        "兩會",
        "貿易戰",
        "關稅"
    ];

    const topics_zhs = [
        "财政预算案",
        "两会",
        "贸易战",
        "关税"
    ];
    
    let topics;
    if (language === "en") {
        topics = topics_en;
    } else if (language === "zh-Hant") {
        topics = topics_zht;
    } else if (language === "zh-Hans") {
        topics = topics_zhs;
    } else {
        topics = topics_en; // Default to English if no match
    }

    const handleTopicClick = (topic) => {
        navigate(`/topics/${encodeURIComponent(topic)}`);
    };
    
    return (
        <div className="w-9/10 mx-auto py-6 border-b border-[var(--color-line-lightgrey)] bg-[var(--color-gs-white)] transition-all duration-300 h-8 md:h-10">
            <div className="mx-auto flex justify-between items-center h-full">
                <div className="mx-auto flex justify-center items-center px-1">
                    <div className="font-semibold text-sm text-red-400">
                        {/*<MdKeyboardDoubleArrowUp size={24}/>*/}
                        {language === "en" ? "Trending" : language === "zh-Hant" ? "熱門" : language === "zh-Hans" ? "热门" : "Trending"}:
                    </div>
                    {topics.map((topic, index) => (
                        <button
                        key={index}
                        onClick={() => handleTopicClick(topic)}
                        className="font-bold hover:cursor-grab hover:underline hover:underline-offset-2 hover:decoration-[var(--color-primary)] px-12"
                        >
                        {topic}
                        </button>
                    ))}
                </div>
                <div className="flex items-center space-x-1">
                    <p className="text-sm">
                        {language === "en" ? "Language" : language === "zh-Hant" ? "語言" : language === "zh-Hans" ? "语言" : "Language"}:
                    </p>
                    <select
                        value={language}
                        onChange={e => setLanguage(e.target.value)}
                        className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <option value="en">English</option>
                        <option value="zh-Hant">繁體中文</option>
                        <option value="zh-Hans">简体中文</option>
                    </select>
                </div>            
            </div>
            
        </div>

    )
}

export default TopicsBar;