import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function SplitBar({ cPercent = 50, pPercent = 50 }) {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col w-full text-xs text-[var(--color-gs-black)]">
      <div className='flex justify-between'>
        <p>
          {language === "zh-Hant" ? "保守" : language === "zh-Hans" ? "保守" : "Conservative"}
        </p>
        <p>
          {language === "zh-Hant" ? "進步" : language === "zh-Hans" ? "进步" : "Progressive"}
        </p>

      </div>
      
      {/* bar */}
      <div className='relative flex w-full'>
        <div
        className="flex items-center justify-center bg-[var(--color-bg-grey)] py-1 rounded-l-lg"
        style={{ width:`${cPercent}%`, fontSize: cPercent < 20 ? '0.50rem' : '0.75rem'}}
      >
          {cPercent}%
        </div>
        <div
          className="flex items-center justify-center bg-[var(--color-line-grey)] py-1 rounded-r-lg"
          style={{ width:`${pPercent}%`, fontSize: pPercent < 20 ? '0.50rem' : '0.75rem' }}
        >
          {pPercent}%
        </div>
      </div>
      

    </div>
  );
}

export default SplitBar;

