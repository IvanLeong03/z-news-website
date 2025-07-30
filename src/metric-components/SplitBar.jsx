import React from 'react';

function SplitBar({ cPercent = 50, liberalPercent = 50 }) {
  return (
    <div className="flex flex-col w-full overflow-auto whitespace-nowrap text-xs text-[var(--color-gs-black)]">

      <p>Conservative</p>
      {/* bar */}
      <div className='w-full flex text-sm shadow-sm font-semibold'>
        <div
        className="flex items-center justify-center bg-[var(--color-bg-grey)] px-1"
        style={{ width:`${cPercent}%` }}
      >
          {cPercent}%
        </div>

        <div
          className="flex items-center justify-center bg-[var(--color-secondary-3)] px-1"
          style={{ width:`${liberalPercent}%` }}
        >
          {liberalPercent}%
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <p>Liberal</p>
      </div>

    </div>
  );
}

export default SplitBar;

