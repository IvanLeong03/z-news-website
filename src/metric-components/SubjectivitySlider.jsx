import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { AiOutlineInfoCircle } from "react-icons/ai"; // info icon


function SubjectivitySlider({ subjScore = 0 }) {
  const { language } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const highDesc = {
    "zh-Hant": "高客觀性",
    "zh-Hans": "高客观性",
    "en": "High objectivity"
  };
  const medDesc = {
    "zh-Hant": "中等客觀性",
    "zh-Hans": "中等客观性",
    "en": "Medium objectivity"
  };
  const lowDesc = {
    "zh-Hant": "低客觀性",
    "zh-Hans": "低客观性",
    "en": "Low objectivity" 
  }

  const subjScoreRounded = Math.round(subjScore * 100) / 100; // Round to two decimal places

  const boxColor = 
  subjScoreRounded < 0.2 
  ? "bg-[var(--color-secondary-3)] text-[var(--color-primary)] px-2" 
  : subjScoreRounded < 0.6 
  ? "bg-[#3d776c] text-[var(--color-secondary-3)] px-2"  
  : "bg-[#2e3d3a] text-[#879693] px-2";
  

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <h2 className="text-sm">{language === "zh-Hant" ? "主觀性數值" : language === "zh-Hans" ? "主观性数值": "Subjectivity Score"}</h2>
        <div className="relative">
          <AiOutlineInfoCircle
            className="ml-2 text-gray-400 cursor-pointer z-20 h-4"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          {isHovered && (
            <div
              className="absolute left-1/2 -translate-x-[90%] bottom-full mb-4 z-[999] w-56"
              style={{ pointerEvents: "none" }}
            >
              <div className="relative">
                <div className="bg-[var(--color-gs-black)] text-[var(--color-gs-white)] text-xs rounded px-3 py-2 shadow-lg">
                  0 represents completely objective content, while 1 represents completely subjective content.
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
      <div className="flex justify-between my-4">
        <div className="flex items-end pr-2">
          <p className="text-5xl">{subjScoreRounded}</p>
          <div className="ml-2 text-[var(--color-line-lightgrey)]">/1</div>
        </div>
        <div className="text-xs text-center">
          <div className={boxColor}>
            {subjScoreRounded < 0.2 ? highDesc[language] : subjScoreRounded < 0.6 ? medDesc[language] : lowDesc[language] } 
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubjectivitySlider;