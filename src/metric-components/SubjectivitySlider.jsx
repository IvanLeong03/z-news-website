import React from "react";
import { useLanguage } from "../context/LanguageContext";

function SubjectivitySlider({ subjScore = 0 }) {
  const { language } = useLanguage();

  const subjScoreRounded = Math.round(subjScore * 100) / 100; // Round to two decimal places

  const boxColor = 
  subjScoreRounded < 0.2 
  ? "bg-[var(--color-secondary-3)] text-[var(--color-primary)] px-2" 
  : subjScoreRounded < 0.6 
  ? "bg-[#3d776c] text-[var(--color-secondary-3)] px-2"  
  : "bg-[#2e3d3a] text-[#879693] px-2";
  

  return (
    <div className="w-full mb-4">
      <h2 className="text-lg">{language === "zh-Hant" ? "主觀性數值" : language === "zh-Hans" ? "主观性数值": "Subjectivity Score"}</h2>
      <div className="flex justify-between my-4">
        <div className="flex items-end">
          <p className="text-5xl">{subjScoreRounded}</p>
          <div className="ml-2 text-[var(--color-line-lightgrey)]">/1</div>
        </div>
        <div className="text-xs text-center">
          <div className={boxColor}>
            {subjScoreRounded < 0.2 ? "High" : subjScoreRounded < 0.6 ? "Medium" : "Low" } objectivity
          </div>

        </div>
        


      </div>
    </div>
  );
}

export default SubjectivitySlider;