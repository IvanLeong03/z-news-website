import React from 'react';
import SplitBar from '../metric-components/SplitBar';
import SentimentSlider from '../metric-components/SentimentSlider';
import SubjectivitySlider from '../metric-components/SubjectivitySlider';
import Sentiment from '../metric-components/Sentiment';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';


function Legend() {

  const { language } = useLanguage();

  return (
    <div className="relative w-9/10 mx-auto flex flex-col flex-grow justify-start items-start pt-2 pb-4 border-b-2 border-[rgba(37,37,37,0.75)] text-xs lg:text-base">
        <h2 className='font-bold text-xl mt-1 mb-5'>
          {language === "zh-Hant" ? "新聞指標" : language === "zh-Hans" ? "新闻指标" : "What are these?"}
        </h2>
        <div className='w-3/4 mx-auto'>
          < SplitBar />
        </div>
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
        <div className='flex flex-col text-[var(--color-text-grey)] py-2'>
            <div className='w-3/4 mx-auto mb-4'>
              <SentimentSlider />
              <Sentiment />
            </div>           
            <p className='mt-2 mb-8'>
              {language === "zh-Hant" ? "根據文中正面和負面用字的比例計算情緒，給予-1（最悲觀）至 1 （最樂觀）的評分" :
               language === "zh-Hans" ? "根据文中正面和负面用字的比例计算情绪，给予-1（最悲观）至 1 （最乐观）的评分" :
               "We assign a score from -1 (most negative) to 1 (most positive)."}
            </p>
        </div>
         <div className='flex flex-col text-[var(--color-text-grey)] py-2'>
            <div className='w-3/4 mx-auto'>
              <SubjectivitySlider />
            </div>            
            <p className='my-2'>
              {language === "zh-Hant" ? "根據文中形容詞和副詞的比例計算主觀性，給予0（最客觀）至 1 （最主觀）的評分" :
              language === "zh-Hans" ? "根据文中形容词和副词的比例计算主观性，给予0（最客观）至 1 （最主观）的评分" : 
              "We assign a score from 0 (most objective) to 1 (most subjective)."}
            </p>

            <p className='mt-8 mb-2 text-sm'>
              To learn more about how the metrics are calculated, view the <Link to="/user-guide" className="text-blue-700 hover:cursor-pointer"> user guide </Link>
            </p>

            
        </div>
    </div>
  );
}

export default Legend;

