import React from 'react';
import SplitBar from '../metric-components/SplitBar';
import SentimentSlider from '../metric-components/SentimentSlider';
import SubjectivitySlider from '../metric-components/SubjectivitySlider';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';


function Legend() {

  const { language } = useLanguage();

  return (
    <div className="relative w-9/10 flex-col flex-grow justify-start items-start mx-auto px-2 py-4 border-b-2 border-[rgba(37,37,37,0.75)] text-sm">
        <h2 className='font-bold mt-1 mb-4'>
          {language === "zh-Hant" ? "新聞指標" : language === "zh-Hans" ? "新闻指标" : "What are these?"}
        </h2>
        < SplitBar />
        <div className='flex flex-col justify-between py-4 my-2 text-[var(--color-text-grey)]'>
            <div className='mb-2'>
              <p>Centric:</p>
              <p>{language === "zh-Hant" ? "沿途望出車外" : language === "zh-Hans" ? "沿途望出车外" : "[Looking out of the car window]"}</p>
            </div>
            <div className='mt-2 mb-6'>
              <p>Progressive:</p>
              <p>{language === "zh-Hant" ? "是盛放的戀愛" : language === "zh-Hans" ? "是盛放的恋爱" : "[Love is blooming]"}</p>
            </div>            
        </div>
        <div className='flex flex-col text-[var(--color-text-grey)] pt-4'>
            <SentimentSlider />
            <p className='mt-2 mb-8'>
              {language === "zh-Hant" ? "根據文中正面和負面用字的比例計算情緒，給予-1（最悲觀）至 1 （最樂觀）的評分" :
               language === "zh-Hans" ? "根据文中正面和负面用字的比例计算情绪，给予-1（最悲观）至 1 （最乐观）的评分" :
               "We analyse the article by identifying words with positive or negative connotations, and generate a score from -1 (most negative) to 1 (most positive) based on the ratio"}
            </p>
        </div>
         <div className='flex flex-col text-[var(--color-text-grey)] pt-8'>
            <SubjectivitySlider />
            <p className='mt-2 mb-8'>
              {language === "zh-Hant" ? "根據文中形容詞和副詞的比例計算主觀性，給予0（最客觀）至 1 （最主觀）的評分" :
              language === "zh-Hans" ? "根据文中形容词和副词的比例计算主观性，给予0（最客观）至 1 （最主观）的评分" : 
              "[We identify adverbs (and adjectives?) used in the article, with a higher score given to articles that feature them prominently.]"}
            </p>

            <p>To learn more, view the <Link to="/user-guide" className="text-blue-600 hover:cursor-pointer"> user guide </Link>
            </p>

            
        </div>
    </div>
  );
}

export default Legend;

