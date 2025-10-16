import React, { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { AiOutlineInfoCircle } from "react-icons/ai"; // info icon


function SubjectivitySlider({ subjScore = 0 }) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);

  const labels = {
    highDesc: {
      "zh-Hant": "高度主觀",
      "zh-Hans": "高度主观",
      "en": "High Subjectivity"
    },
    medDesc: {
      "zh-Hant": "中度主觀",
      "zh-Hans": "中度主观",
      "en": "Medium Subjectivity"
    },
    lowDesc: {
      "zh-Hant": "低度主觀",
      "zh-Hans": "低度主观",
      "en": "Low Subjectivity" 
    },
    hoverDesc: {
      "en": "Measures how subjective media reporting on this event is, beased on text analysis of articles.",
      "zh-Hant": "根據文章的文本分析，衡量媒體對此事件報導的主觀性",
      "zh-Hans": "根据文章的文本分析，衡量媒体对此事件报道的主观性。",
    }
  };

  const subjScoreRounded = Math.round(subjScore * 100) / 100; // Round to two decimal places

  const boxColor = 
  subjScoreRounded < 0.2 
  ? "bg-[var(--color-secondary-3)] text-[var(--color-primary)] px-2" 
  : subjScoreRounded < 0.6 
  ? "bg-[#3d776c] text-[var(--color-secondary-3)] px-2"  
  : "bg-[#2e3d3a] text-[#879693] px-2";

  const timerRef = useRef(null);
  const handleMouseEnter = () => {
    // start a timer for 250ms
    timerRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 250);
  };

  const handleMouseLeave = () => {
    // clear the timer and hide immediately
    clearTimeout(timerRef.current);
    setIsHovered(false);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-sm xl:text-base">{language === "zh-Hant" ? "主觀性數值" : language === "zh-Hans" ? "主观性数值": "Subjectivity Score"}</h2>
        <div className="relative">
          <AiOutlineInfoCircle
            className="ml-2 text-gray-400 cursor-pointer z-20 h-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
          {isHovered && (
            <div
              className="absolute left-1/2 -translate-x-[90%] bottom-full mb-4 z-[999] w-56"
              style={{ pointerEvents: "none" }}
            >
              <div className="relative">
                <div className="bg-[var(--color-gs-black)] text-[var(--color-gs-white)] text-xs rounded-xl px-3 py-2 shadow-lg">
                  {labels.hoverDesc[language]}
                </div>
                {/* Speech bubble tail */}
                <div
                  className="absolute left-[90%] top-full -translate-x-1/2 w-0 h-0"
                  style={{
                    borderLeft: "8px solid transparent",
                    borderRight: "8px solid transparent",
                    borderTop: "8px solid var(--color-gs-black)",
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col 2xl:flex-row 2xl:justify-between gap-1 my-4 justify-between">
        <div className="flex items-end">
          <p className="text-5xl">{subjScoreRounded}</p>
          <div className="text-xs text-[#999999] ml-1">/1</div>
        </div>
        <div className="text-sm mt-2 2xl:mt-0">
          <div className={boxColor}>
            {subjScoreRounded < 0.2 ? labels.lowDesc[language] : subjScoreRounded < 0.6 ? labels.medDesc[language] : labels.highDesc[language] } 
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectivitySlider;