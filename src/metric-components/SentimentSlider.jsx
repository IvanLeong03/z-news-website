import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { AiOutlineInfoCircle } from "react-icons/ai"; // info icon

function SentimentSlider({ sentiment = 0}) {
  const { language } = useLanguage();

  // Clamp the score
  const clampedScore = Math.max(-1, Math.min(sentiment, 1));
  // Map -1..1 to 0..100%
  const percentage = ((clampedScore + 1) / 2) * 100;

  // Determine color based on score sign
  const barColor = clampedScore >= 0 ? "#239b98" : "#7f2538";

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full mb-4">
      {/* Title + Sentiment Value */}
      <div className="flex items-center text-sm text-[var(--color-text-grey)] mb-1 relative">
        <span className="mr-1">
          {language === "zh-Hant"
            ? "情感數值:"
            : language === "zh-Hans"
            ? "情感数值:"
            : "Sentiment:"}
        </span>
        <span className="ml-1 text-[1.25em]" style={{ color: barColor }}>
          {clampedScore >= 0
            ? `+${clampedScore.toFixed(2)}`
            : clampedScore.toFixed(2)}
        </span>
        <div className="relative">
          <AiOutlineInfoCircle
            className="ml-4 text-gray-400 cursor-pointer z-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          {isHovered && (
            <div
              className="absolute left-1/2 -translate-x-[66%] bottom-full mb-4 z-[999] w-56"
              style={{ pointerEvents: "none" }}
            >
              <div className="relative">
                <div className="bg-[var(--color-gs-black)] text-[var(--color-gs-white)] text-xs rounded px-3 py-2 shadow-lg">
                  +1 indicates the most positive sentiment, -1 indicates the most negative.
                </div>
                {/* Speech bubble tail */}
                <div
                  className="absolute left-[66%] top-full -translate-x-1/2 w-0 h-0"
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
      <div className="relative w-full h-2 border border-[var(--color-line-grey)] p-1 rounded-lg">
        <div
          className="absolute top-0 left-1/2 h-2"
          style={{
            width: `${Math.abs(percentage - 50)}%`,
            backgroundColor: barColor,
            transform:
              clampedScore >= 0
                ? "translateX(0)" // fill to right
                : "translateX(-100%)", // fill to left
          }}
        />
        {/* Midpoint indicator (0) */}
        <div className="absolute left-1/2 top-0 w-0.25 h-2 bg-[var(--color-line-grey)] transform -translate-x-1/2" />
      </div>
    </div>
  );
}

export default SentimentSlider;
