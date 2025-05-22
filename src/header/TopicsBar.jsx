import React from "react";
import { useNavigate } from "react-router-dom";

function TopicsBar() {
    const navigate = useNavigate();

    const topics = [
        "Financial Budget",
        "Two Sessions",
        "Trade War",
        "Tariff",
        //"Topic 5"
    ];

    const handleTopicClick = (topic) => {
        navigate(`/topics/${encodeURIComponent(topic)}`);
    };
    

    return (
        <>

        <div className="w-full h-[8vh] lg:h-[5vh] flex items-center border-t-2 border-b border-[#252525] mb-4">
            <div className="w-[90dvw] flex items-center mx-auto">
                
                

                {/* Center: Topics */}
                <div className="flex-grow flex justify-center px-1">
                    <p className="px-16 font-bold text-red-400">Trending: </p>
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
                    <button className="hover:text-purple-500">E</button>
                    <p className="text-[#aaaaaa]">|</p>
                    <button className="hover:text-purple-500">繁</button>
                    <p className="text-[#aaaaaa]">|</p>
                    <button className="hover:text-purple-500">简</button>
                </div>
                
            </div>
        </div>
        </>
    )
}

export default TopicsBar;