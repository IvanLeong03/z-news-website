import React from 'react';
import SplitBar from '../metric-components/SplitBar';
import SentimentSlider from '../metric-components/SentimentSlider';
import SubjectivitySlider from '../metric-components/SubjectivitySlider';


function Legend() {
  return (
    <div className="relative w-full flex-col flex-grow justify-start items-start mx-auto px-2 py-4 border-b-2 border-[rgba(37,37,37,0.75)] text-sm">
        <h2 className='font-bold mt-1 mb-4'>What are these?</h2>
        < SplitBar />
        <div className='flex flex-col justify-between py-4 my-2 text-[theme(--color-text-grey)]'>
            <div className='mb-2'>
              <p>Centric:</p>
              <p>[Supports the government and the One Country Two Systems principle]</p>
            </div>
            <div className='mt-2 mb-6'>
              <p>Progressive:</p>
              <p>[Does not believe the government is acting for the best interests]</p>
            </div>            
        </div>
        <div className='flex flex-col text-[theme(--color-text-grey)] pt-4'>
            <SentimentSlider />
            <p className='mt-2 mb-8'>[We analyse the article by identifying words with positive or negative connotations, and generate
              a score from -1 to 1 based on the ratio, with -1 representing the most negative and +1 representing
              the most positive attitude in the report. ]</p>
        </div>
         <div className='flex flex-col text-[theme(--color-text-grey)] pt-8'>
            <SubjectivitySlider />
            <p className='mt-2 mb-8'>[We identify adverbs used in the article, with a higher score given to articles that 
              feature them prominently.]</p>
        </div>
    </div>
  );
}

export default Legend;

