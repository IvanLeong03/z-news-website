import React from 'react';

function SplitBar({ cPercent = 50, pPercent = 50 }) {
  return (
    <div className="flex w-full h-4 rounded overflow-auto whitespace-nowrap shadow-sm text-[0.6rem] text-black">
      <div
        className="flex items-center justify-center bg-[theme(--color-light-turquoise)] px-1"
        style={{ width:`${cPercent}%` }}
      >
        C: {cPercent}%
      </div>
      <div
        className="flex items-center justify-center bg-[theme(--color-dark-turquoise)] px-1"
        style={{ width:`${pPercent}%` }}
      >
        P: {pPercent}%
      </div>
    </div>
  );
}

export default SplitBar;

