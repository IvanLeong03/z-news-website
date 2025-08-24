import React from 'react';

function SplitBar({ cPercent = 50, pPercent = 50 }) {
  return (
    <div className="flex flex-col w-full text-xs text-[var(--color-gs-black)]">
      <p>Conservative</p>
      {/* bar */}
      <div className='relative flex w-full shadow-sm'>
        <div
        className="flex items-center justify-center bg-[var(--color-bg-grey)] py-1"
        style={{ width:`${cPercent}%`, fontSize: cPercent < 20 ? '0.40rem' : '0.75rem'}}
      >
          {cPercent}%
        </div>
        <div
          className="flex items-center justify-center bg-[var(--color-line-grey)] py-1"
          style={{ width:`${pPercent}%`, fontSize: pPercent < 20 ? '0.40rem' : '0.75rem' }}
        >
          {pPercent}%
        </div>
      </div>
      <div className='w-full flex justify-end'>
        <p>Progressive</p>
      </div>

    </div>
  );
}

export default SplitBar;

