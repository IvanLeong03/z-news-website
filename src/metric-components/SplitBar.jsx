import React from 'react';

function SplitBar({ cPercent = 50, pPercent = 50 }) {
  return (
    <div className="flex w-full overflow-auto whitespace-nowrap shadow-sm text-[0.5rem] text-black">

      <div
        className="flex items-center justify-center bg-[var(--color-secondary-1)] px-1"
        style={{ width:`${cPercent}%` }}
      >
        Conservative: {cPercent}%
      </div>

      <div
        className="flex items-center justify-center bg-[var(--color-secondary-3)] px-1"
        style={{ width:`${pPercent}%` }}
      >
        Progressive: {pPercent}%
      </div>
      
    </div>
  );
}

export default SplitBar;

