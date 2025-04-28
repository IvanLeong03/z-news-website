import React from 'react';
import SplitBar from '../metric-components/SplitBar';
import Sentiment from '../metric-components/Sentiment';


function Legend() {
  return (
    <div className="relative w-9/10 flex-grow flex-col justify-start items-start mx-auto px-2 pt-2 pb-8 border-b-2 border-[rgba(37,37,37,0.75)]">
        <h2 className='font-bold mt-1 mb-6'>What are these?</h2>
        < SplitBar />
        <div className='flex flex-col justify-between my-4 text-[theme(--color-text-grey)]'>
            <p>Centric: pro Chinese stance</p>
            <p>[維護一國兩制]</p>
            <br />
            <p >Progressive: opposition</p>
            { /* <p>[If I say what I want to I'll be in trouble]</p> */ }
            <p>[Does not believe the government is acting for the best interests]</p>
        </div>
        <div className='flex flex-col text-[theme(--color-text-grey)]'>
            < Sentiment sentiment="sentiment analysis" />
            <p className='my-4'>[As a real hater our AI is trained to hate on everything on the planet]</p>
        </div>
    </div>
  );
}

export default Legend;

