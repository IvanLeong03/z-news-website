import React from 'react';
import SplitBar from '../metric-components/SplitBar';
import SentimentSlider from '../metric-components/SentimentSlider';
import SubjectivitySlider from '../metric-components/SubjectivitySlider';
import SentimentGauge from '../metric-components/SentimentGauge';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

function Legend() {

  const { language } = useLanguage();

  return (
    <div className="relative w-9/10 mx-auto flex flex-col flex-grow justify-start items-start py-4 border-b border-[var(--color-line-grey)] text-xs lg:text-base">
        <h2 className='font-bold text-xl my-4 2xl:my-8'>
          {language === "zh-Hant"
            ? "新聞指標"
            : language === "zh-Hans"
            ? "新闻指标"
            : "What are these?"}
        </h2>
        
        <div className='flex flex-col justify-between text-[var(--color-gs-black)] border-b border-[var(--color-line-verylightgrey)] w-full'>
            <h3 className='text-center underline'>{language === 'zh-Hant' ? '立場分布' : language === 'zh-Hans' ? '立场分布' : 'Leaning distribution'}</h3>
            <div className='w-full mx-auto my-8'>
              <SplitBar />
            </div>
            <div className='mb-4'>
              <p className='text-lg my-2'>
                {language === "zh-Hant"
                  ? "保守"
                  : language === "zh-Hans"
                  ? "保守"
                  : "Conservative"}
              </p>
              <p className='text-sm'>
                {language === "zh-Hant"
                  ? "文章採取較保守的立場"
                  : language === "zh-Hans"
                  ? "文章采取较保守的立场"
                  : "The article comes from a source that leans towards a Conservative stance."}
              </p>
            </div>
            <div className='my-4'>
              <p className='text-lg my-2'>
                {language === "zh-Hant"
                  ? "進步"
                  : language === "zh-Hans"
                  ? "进步"
                  : "Progressive"}
              </p>
              <p className='text-sm'>
                {language === "zh-Hant"
                  ? "文章採取較進步的立場"
                  : language === "zh-Hans"
                  ? "文章采取较进步的立场"
                  : "The article's source takes a Progressive stance."}
              </p>
            </div>
        </div>
        <div className='flex flex-col items-center text-[var(--color-gs-black)] py-2 border-b border-[var(--color-line-verylightgrey)] w-full'>
            <h3 className='text-center underline mb-4'>{language === 'zh-Hant' ? '情感分析' : language === 'zh-Hans' ? '情感分析' : 'Sentiment analysis'}</h3>
            <div className='w-full my-4'>
              <SentimentSlider />
              <p className='text-center my-6'>{language === "zh-Hant" ? "或" : language === "zh-Hans" ? "或" : "or"}</p>
              <SentimentGauge />
            </div>
            <p className='my-8 text-base'>
              {language === "zh-Hant"
                ? "根據文中正面和負面用字的比例計算情緒，給予-1（最悲觀）至 1 （最樂觀）的評分"
                : language === "zh-Hans"
                ? "根据文中正面和负面用字的比例计算情绪，给予-1（最悲观）至 1 （最乐观）的评分"
                : "The Sentiment Score measures the emotional tone of the article. An articles receives a score from -1 (most pessimistic) to +1 (most optimistic)."}
            </p>
        </div>
        <div className='flex flex-col text-[var(--color-gs-black)] py-2 w-full'>
            <h3 className='text-center underline my-4'>{language === 'zh-Hant' ? '主觀性分析' : language === 'zh-Hans' ? '主观性分析' : 'Subjectivity analysis'}</h3>            
            <div className='w-full mx-auto my-4'>
              <SubjectivitySlider />
            </div>
            <p className='my-4'>
              {language === "zh-Hant"
                ? "根據文中形容詞和副詞的比例計算主觀性，給予0（最客觀）至 1 （最主觀）的評分"
                : language === "zh-Hans"
                ? "根据文中形容词和副词的比例计算主观性，给予0（最客观）至 1 （最主观）的评分"
                : "We assign a score from 0 (most objective) to 1 (most subjective)."}
            </p>
            <p className='my-4 text-sm'>
              {language === "zh-Hant"
                ? <>想了解更多指標計算方法，請參閱<Link to="/user-guide" className="text-blue-700 hover:cursor-pointer"> 使用指南 </Link></>
                : language === "zh-Hans"
                ? <>想了解更多指标计算方法，请参阅<Link to="/user-guide" className="text-blue-700 hover:cursor-pointer"> 使用指南 </Link></>
                : <>To learn more about how the metrics are calculated, view the <Link to="/user-guide" className="text-blue-400 hover:text-[var(--color-primary)] hover:cursor-pointer text-base"> user guide </Link></>
              }
            </p>
        </div>
    </div>
  );
}

export default Legend;

