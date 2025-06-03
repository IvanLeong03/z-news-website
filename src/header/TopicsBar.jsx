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
        <>

        <div className="w-full h-[8vh] lg:h-[5vh] flex items-center border-t-2 border-b border-[#252525] mb-4">
            <div className="w-[90dvw] flex items-center mx-auto">

                {/* Center: Topics */}
                <div className="flex-grow flex justify-center px-1">
                    <p className="px-16 font-bold text-red-400">
                        {language === "zh-Hant"
                            ? "熱門"
                            : language === "zh-Hans"
                            ? "热门"
                            : "Trending"}
                    </p>
                {topics.map((topic, index) => (
                    <button
                    key={index}
                    onClick={() => handleTopicClick(topic)}
                    className="font-bold hover:cursor-grab px-12"
                    >
                    {topic}
                    </button>
                ))}
                </div>

                {/* Right: Language options */}
                <div className="flex-none flex items-center space-x-1">
                    <button onClick={() => setLanguage('en')} className={language === "en" ? "font-bold" : "hover:text-purple-500"}>
                        E
                    </button>
                    <p className="text-[#aaaaaa]">|</p>
                    <button onClick={() => setLanguage('zh-Hant')}  className={language === "zh-Hant" ? "font-bold" : "hover:text-purple-500"}>
                        繁
                    </button>

                    <p className="text-[#aaaaaa]">|</p>
                    <button onClick={() => setLanguage('zh-Hans')} className={language === "zh-Hans" ? "font-bold" : "hover:text-purple-500"}>
                        简
                    </button>
                    
                    
                </div>            
            </div>
        </div>
        </>
    )
}

export default TopicsBar;