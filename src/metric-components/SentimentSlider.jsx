import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { AiOutlineInfoCircle } from "react-icons/ai"; // info icon

function SentimentSlider({ sentiment = 0}) {
  const { language } = useLanguage();
  const labels = {
    veryPos: {
      "en": "Very positive",
      "zh-Hant": "非常正面",
      "zh-Hans": "非常正面",
    },
    pos: {
      "en": "Positive",
      "zh-Hant": "正面",
      "zh-Hans": "正面",
    },
    slightlyPos: {
      "en": "Slightly positive",
      "zh-Hant": "略為正面",
      "zh-Hans": "略为正面",
    },
    neutral: {
      "en": "Neutral",
      "zh-Hant": "中性",
      "zh-Hans": "中性",
    },
    veryNeg: {
      "en": "Very negative",
      "zh-Hant": "非常負面",
      "zh-Hans": "非常负面",
    },
    neg: {
      "en": "Negative",
      "zh-Hant": "負面",
      "zh-Hans": "负面",
    },
    slightlyNeg: {
      "en": "Slightly negative",
      "zh-Hant": "略為負面",
      "zh-Hans": "略为负面",
    },
    hoverDesc: {
      "en": "The overall tone of reporting on this event, based on text analysis of articles.",
      "zh-Hant": "通過對文章進行文本分析，得出此詞事件報導的總體基調。",
      "zh-Hans": "通过对文章的文本分析，得出此次事件报道的总体基调。",
    }
  }

  // Clamp the score
  const clampedScore = Math.max(-1, Math.min(sentiment, 1));
  // Map -1..1 to 0..100%
  const percentage = ((clampedScore + 1) / 2) * 100;

  // Determine color based on score sign
  const barColor = clampedScore >= 0.05 ? "#239b98" : clampedScore >= -0.05 ? "#808080" : "#7f2538";

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full">
      {/* Title + Sentiment Value */}
      <div className="flex gap-8 items-center text-sm text-[var(--color-text-grey)] mb-1 relative">
        <span className="text-base" style={{ color: barColor }}>
          {clampedScore >= 0.6 ? labels.veryPos[language] : 
          clampedScore >= 0.3 ? labels.pos[language] :
          clampedScore > 0.05 ? labels.slightlyPos[language] :
          clampedScore >= -0.05 ? labels.neutral[language] :
          clampedScore >= -0.3 ? labels.slightlyNeg[language] :
          clampedScore >= -0.6 ? labels.neg[language] :
          labels.veryNeg[language]}
        </span>
        <div className="relative">
          <AiOutlineInfoCircle
            className="ml-4 text-gray-400 cursor-pointer z-20"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          {isHovered && (
            <div
              className="absolute left-1/2 -translate-x-[50%] bottom-full mb-4 z-[999] w-56"
              style={{ pointerEvents: "none" }}
            >
              <div className="relative">
                <div className="bg-[var(--color-gs-black)] text-[var(--color-gs-white)] text-xs rounded-xl px-3 py-2 shadow-lg">
                  <p>{labels.hoverDesc[language]}</p>
                </div>
                {/* Speech bubble tail */}
                <div
                  className="absolute left-[50%] top-full w-0 h-0"
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
