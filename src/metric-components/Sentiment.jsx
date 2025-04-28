import React from 'react';
import { useState } from 'react';

function Sentiment({sentiment="sentiment analysis"}) {


  return (
    <div className="flex w-full h-4 justify-center rounded overflow-hidden shadow-sm text-xs text-black bg-[theme(--color-bg-grey)]">
        <p className='text-xs'>[{sentiment}]</p>
      
    </div>
  );
}

export default Sentiment;

