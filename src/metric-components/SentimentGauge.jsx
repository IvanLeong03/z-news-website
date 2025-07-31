import React from "react";
import { useLanguage } from "../context/LanguageContext";

function SentimentGauge({ sentiment = 0 }) {
  const { language } = useLanguage();
  const clampedScore = Math.max(-1, Math.min(sentiment, 1));

  const radius = 100;
  const halfCircumference = Math.PI * radius; // Half-circle circumference
  const fillLength = Math.abs(clampedScore) * (halfCircumference / 2);

  const arcColor =
    clampedScore >= 0 ? "var(--color-primary)" : "var(--color-secondary-1)";

  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <div className="w-full text-start text-sm font-medium mb-1 -ml-8">
        {language === "zh-Hant"
          ? "情感指數"
          : language === "zh-Hans"
          ? "情感指数"
          : "Sentiment Index"}
      </div>

      <svg width="220" height="132" viewBox="0 0 228 125" >
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
        <text x="0" y="120" fontSize="12" fill="#999" textAnchor="start">
          -1
        </text>
        <text x="110" y="4" fontSize="12" fill="#999" textAnchor="middle">
          0
        </text>
        <text x="220" y="120" fontSize="12" fill="#999" textAnchor="end">
          +1
        </text>
      </svg>

      {/* Large score */}
      <div
        className="text-5xl font-bold -mt-16"
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
