import React, { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { AiOutlineInfoCircle } from "react-icons/ai"; // info icon

function SentimentGauge({ sentiment = 0 }) {
  const { language } = useLanguage();
  const clampedScore = Math.max(-1, Math.min(sentiment, 1));
  const timerRef = useRef(null);
  const radius = 100;
  const halfCircumference = Math.PI * radius; // Half-circle circumference
  const fillLength = Math.abs(clampedScore) * (halfCircumference / 2);
  const arcColor = clampedScore >= 0 ? "var(--color-primary)" : "var(--color-secondary-1)";
  const [isHovered, setIsHovered] = useState(false);
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
    <div className="flex flex-col items-center">
      <div className="w-full flex justify-between items-center">
        <h2>{language === "zh-Hant" ? "情感數值" : language === "zh-Hans" ? "情感数值" : "Sentiment Score"}</h2>
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
                <div className="bg-[var(--color-gs-black)] text-[var(--color-gs-white)] text-xs rounded px-3 py-2 shadow-lg">
                  <p>+1 indicates the most positive sentiment, -1 indicates the most negative.</p>
                  <p>This event has received mostly{" "}
                    {clampedScore > 0
                      ? "positive"
                      : clampedScore < 0
                      ? "negative"
                      : "neutral"}{" "}
                    coverage.
                  </p>
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
      <svg width="200" height="165" viewBox="0 0 220 135">
      {/* Grey background arc */}
        <path
          d="M10 110 A100 100 0 0 1 210 110"
          fill="none"
          stroke="#e0e0e0"
          strokeWidth="8"
        />

        {/* Right side arc (positive) */}
        {clampedScore > 0 && (
          <path
            d="M110 10 A100 100 0 0 1 210 110"
            fill="none"
            stroke={arcColor}
            strokeWidth="8"
            strokeDasharray={`${fillLength} ${halfCircumference / 2}`}
            strokeDashoffset="0"
          />
        )}

        {/* Left side arc (negative) */}
        {clampedScore < 0 && (
          <path
            d="M110 10 A100 100 0 0 0 10 110"
            fill="none"
            stroke={arcColor}
            strokeWidth="8"
            strokeDasharray={`${fillLength} ${halfCircumference / 2}`}
            strokeDashoffset="0"
          />
        )}

        {/* Labels */}
        <text x="3" y="122" fontSize="12" fill="#999" textAnchor="start">
          -1
        </text>
        <text x="0" y="138" fontSize="12" fill="#999" textAnchor="start">
          {language === "zh-Hant" ? "悲觀" : language === "zh-Hans" ? "悲观" : "Pessimistic"}                                
        </text>
        <text x="110" y="4" fontSize="12" fill="#999" textAnchor="middle">
          0
        </text>
        <text x="217" y="122" fontSize="12" fill="#999" textAnchor="end">
          +1
        </text>
        <text x="220" y="138" fontSize="12" fill="#999" textAnchor="end">
          {language === "zh-Hant" ? "樂觀" : language === "zh-Hans" ? "乐观" : "Optimistic"}                                
        </text>
        <text x="110" y="115" fontSize="15" fill="#999" textAnchor="middle">
          {language === "zh-Hant" ? "情感" : language === "zh-Hans" ? "情感" : "Sentiment"}          
        </text>
        
      </svg>


      {/* Large score */}
      <div
        className="text-5xl font-bold -mt-25"
        style={{ color: arcColor }}
      >
        {clampedScore >= 0
          ? `+${clampedScore.toFixed(2)}`
          : clampedScore.toFixed(2)}
      </div>                    
    </div>     

  );
}

export default SentimentGauge;
