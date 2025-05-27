import React from "react";

function SentimentSlider({ sentScore = 0 }) {
  // Clamp the score to stay between -1 and 1
  const clampedScore = Math.max(-1, Math.min(sentScore, 1));

  // Convert to percentage (0% to 100%) with 0 at center
  const percentage = ((clampedScore + 1) / 2) * 100;

  return (
    <div className="w-full mb-4">
      <div className="relative h-4 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 -mt-1 w-0.5 h-5 bg-black"
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
        />
        {/* optional tick markers */}
        <div className="absolute left-0 top-full text-xs text-gray-600">-1</div>
        <div className="absolute left-1/2 top-full transform -translate-x-1/2 text-xs text-gray-600">0</div>
        <div className="absolute right-0 top-full text-xs text-gray-600">+1</div>
      </div>
      <p className="text-sm text-center mt-4">Sentiment: {sentScore.toFixed(2)}</p>
    </div>
  );
}

export default SentimentSlider;