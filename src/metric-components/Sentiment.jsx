import React from 'react';
import { useState } from 'react';

function Sentiment({sentiment=0}) {

  return (
    <div className="flex w-full justify-center rounded overflow-hidden shadow-sm bg-[var(--color-bg-grey)]">
        <p className='text-[0.5rem]'>{sentiment}</p>      
    </div>
  );
}

export default Sentiment;

