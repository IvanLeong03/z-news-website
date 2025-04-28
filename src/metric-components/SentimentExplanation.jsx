import React from 'react';
import { useState } from 'react';

function SentimentExplanation({sentiment="sentiment explained"}) {


  return (
    <div className="flex w-full min-h-32 justify-start rounded overflow-hidden shadow-sm text-xs text-black bg-[theme(--color-bg-grey)]">
        <p className='text-xs'>[{sentiment}]</p>
      
    </div>
  );
}

export default SentimentExplanation;

