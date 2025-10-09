import React, { useState, useEffect } from "react";
import Ads from "../home-components/Ads";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import OutletDistribution from "../metric-components/OutletDistribution";
import { FaRegBookmark , FaBookmark} from "react-icons/fa";
import { fetchArticle, fetchSummary } from "../services/articleService";
import { saveArticle } from "../services/profileService";
import { CiShare2 } from "react-icons/ci";
import TimelineCarousel from "./TimelineCarousel";
import ArticleMetrics from "./ArticleMetrics";
import SummaryBlock from "./SummaryBlock";
import PublisherArticlesList from "./PublisherArticlesList";
import DiscoverMore from "./DiscoverMore";


function ViewArticle() {
    const { id } = useParams();
    const { language} = useLanguage();
    const [summaryLanguage, setSummaryLanguage] = useState(language);
    const [tone, setTone] = useState("straightforward");
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [summary, setSummary] = useState({"synopsis": "", "implications": ""});
    const [error, setError] = useState(null);
    const [summaryError, setSummaryError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [summaryLoading, setSummaryLoading] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);
    const [showChartDesc, setShowChartDesc] = useState(false);
    const sizeDesc = {
        "en": "The size of the icon represents the media significance. The more significant the source, the larger the icon.",
        "zh-Hant": "圖標的大小代表該媒體的重要性。來源越重要，圖標就越大。",
        "zh-Hans": "图标的大小代表媒体的重要性。来源越重要，图标就越大。",
    };
    const posDesc = {
        "en": "The position of the icon represents the (bias of the source?) The more biased towards either stance the source is, the further away from the divide the icon lies.",
        "zh-Hant": "圖標的位置反映媒體來源的偏見。來源越偏向任一方立場，圖標距離分界線就越遠。",
        "zh-Hans": "图标的位置代表了媒體来源的偏见。来源越偏向任一立场，图标距离分界线就越远。"
    };
    const showMoreText = {
        "en": "Show More",
        "zh-Hant": "顯示更多",
        "zh-Hans": "显示更多",
    };
    const showLessText = {
        "en": "Show Less",
        "zh-Hant": "顯示更少",
        "zh-Hans": "显示更少",
    };
    const timelineEvents = [
        { date: "02-01-2025", description: "Initial rumors surface about trade negotiations." },
        { date: "15-01-2025", description: "Vietnamese officials confirm preliminary talks with the U.S." },
        { date: "28-01-2025", description: "U.S. Commerce Secretary visits Hanoi for closed-door meetings." },
        { date: "05-02-2025", description: "Draft agreement leaked, sparking debate over tech sector terms." },
        { date: "12-02-2025", description: "Trump announces progress on trade deal during press briefing." },
        { date: "20-02-2025", description: "Vietnamese parliament reviews proposed trade framework." },
        { date: "01-03-2025", description: "Final trade agreement signed in Washington D.C." },
        { date: "10-03-2025", description: "Joint statement released outlining key sectors impacted." },
        { date: "18-03-2025", description: "First wave of U.S.–Vietnam tech partnerships announced." },
        { date: "25-03-2025", description: "Public sentiment analysis shows mixed reactions to deal." }
    ];

    useEffect(() => {
        const loadArticle = async () => {
            try {
                const backendLang = mapFrontendLangToBackend(language);
                const result = await fetchArticle(id, backendLang);
                setArticle(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadArticle();
    }, [id, language]);
    
    useEffect(() => {
        const loadSummary = async () => {
            if (!id || !summaryLanguage) return;
            const summaryBackendLang = mapFrontendLangToBackend(summaryLanguage);
            try {
                const result = await fetchSummary(id, summaryBackendLang);
                setSummary(result);
            } catch (err) {
                console.error("Failed to fetch summary:", err);
                setSummaryError(err.message);
            } finally {
                setSummaryLoading(false);
            }
        };

        loadSummary();
    }, [id, summaryLanguage, language]);
    

    const handleBookmark = async () => {
        const newState = !bookmarked;
        setBookmarked(newState);
        if (newState) {
            try {
                await saveArticle(id);
                //console.log("Article saved:", id);
            } catch (err) {
                setBookmarked(false); // Revert if failed
                setError("Failed to save article.");
            }
        } else {
            
        }
    };

    if (loading) return <div className="text-center py-8">Loading article...</div>;
    if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;
    if (!article) return <div className="text-center py-8">Article not found.</div>;

    function getHoursAgo(dateString) {
        const articleDate = new Date(dateString);
        const now = new Date();
        const diffMs = now - articleDate;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        return diffHours;
    }

    const handleTopicClick = (tag) => {
        navigate(`/topics/${encodeURIComponent(tag)}`);
    };
    
    return (
        <article className="overflow-hidden justify-center items-start w-2/3 h-full mx-auto">
            <div className="px-1 py-4 min-w-0">
                <div className="flex flex-col">
                    {/* region, sector, date and time*/}
                    <div className="w-full flex justify-between items-center">
                        <div className="flex flex-col justify-between items-start my-1">
                            <div className="flex items-center space-x-2 text-lg text-[var(--color-primary)]">
                                <label className="py-2 ">{article.region.toUpperCase()}</label>         
                                <label> | </label>                   
                                <button 
                                className="hover:underline"
                                onClick={() => handleTopicClick(article.sector)}
                                >
                                    {article.sector}
                                </button>
                            </div>
                            <div className="text-[var(--color-text-lightgrey)] text-sm my-2 italic">
                                <p>
                                    <label>{language === "zh-Hant" ? "發表日期" : language === "zh-Hans" ? "发表日期" : "Date published"}: </label>
                                    {article.date.slice(8, 10)}
                                    <span>-</span>
                                    {article.date.slice(5, 7)}
                                    <span>-</span>
                                    {article.date.slice(0, 4)}
                                </p>
                                <label>{language === "zh-Hant" ? "最後更新時間" : language === "zh-Hans" ? "最后更新时间" : "Last updated"}: </label>
                                {article.date.slice(11,16)}                            
                            </div>
                        </div>          

                        <div>
                            <button className="px-2" aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"} onClick={handleBookmark}>
                                {bookmarked ? (
                                    <FaBookmark className="text-2xl text-[var(--color-accent)] fill-current" />  ) : (
                                    <FaRegBookmark className="text-2xl text-[var(--color-text-lightgrey)] hover:text-[var(--color-text-darkgrey)]" />
                                )}
                            </button>   
                            <button>
                                <CiShare2 className="text-2xl text-[var(--color-accent)]"/>
                            </button>    
                        </div>           
                    </div>
                                                  
                    { /* article title */ }
                    <div className="w-full mt-2 mb-6 flex justify-between items-center">
                        <h1 className="text-4xl font-semibold">{article.title}</h1>                                                
                    </div>
                    {/* picture, summary and metrics */}
                    <div className="grid grid-cols-[3fr_1fr] gap-8">
                        { /* main grid: image, summary, timeline */}
                        <div>
                            <div className="aspect-[16/9] overflow-hidden">
                                <img src={article.pictureURL} className="w-full h-full object-cover" />
                            </div>
                            <SummaryBlock 
                            summary={summary} 
                            summaryLoading={summaryLoading} 
                            summaryError={summaryError} 
                            id={id}
                            summaryLanguage={summaryLanguage}
                            setSummaryLanguage={setSummaryLanguage}
                            tone={tone}
                            setTone={setTone}
                            /> 
                            <PublisherArticlesList articles={article?.articles || []} language={language} />
                            {/* timeline */}
                            <div className="w-full py-2 px-4 rounded border-b border-[var(--color-primary)]">
                                <h2 className="text-2xl font-semibold">{language === "zh-Hant" ? "時間線" : language === "zh-Hans" ? "时间线" : "Timeline"}</h2>
                                <p className="my-2 text-sm text-[var(--color-text-lightgrey)]">                        
                                    {language === "zh-Hant" ? "時間線按時間順序顯示相關文章。按下左右按鈕可瀏覽事件發生前後的相關報導。" 
                                    : language === "zh-Hans" ? "时间线按时间顺序显示相关文章。按下左右按钮可浏览事件发生前后的相关报导。" 
                                    : "The timeline shows related events in chronological order. Use the navigation buttons to explore articles covering the development of this event over time."}
                                </p>
                                {/* tiimeline component */}
                                <div className="w-[85%] mx-auto my-4 max-w-[800px] 2xl:max-w-[1200px]">
                                    <TimelineCarousel events={timelineEvents} />
                                </div>
                            </div>
                        </div>
                           
                        {/* second grid: metrics */}
                        <div className="px-2">
                            <ArticleMetrics article={article} />
                            {/* outlet distribution: expand to open? */}
                            <div className="py-4 flex flex-col">
                                <OutletDistribution cPercent={article.coverage.percentage.centric*100} pPercent={article.coverage.percentage.progressive*100} cIcons={article.coverage.icons.centric} pIcons={article.coverage.icons.progressive} />
                                {/*
                                <p className="text-base whitespace-nowrap my-2 text-center">                            
                                    {language === 'zh-Hant' ? '以上分佈來自: ' : language === 'zh-Hans' ? '以上分布来自: ' : 'We obtained this distribution from '}
                                    {article.nSources}
                                    {language === 'zh-Hant' ? ' 篇文章' : language === 'zh-Hans' ? ' 篇文章' : ' sources'}
                                </p> 
                                */}
                                <h3
                                    className="text-sm mt-6 mb-2 cursor-pointer 
                                    hover:text-[var(--color-primary)]"
                                    onClick={() => setShowChartDesc(true)}
                                >
                                    {language === "zh-Hant" ? "點擊此處了解上述圖表" 
                                        : language === "zh-Hans" ? "点击此处了解上述图表" 
                                        : "Click here to for more details about the chart"}
                                </h3>
                                {showChartDesc && (
                                    <div>
                                        <p className="text-base my-4">{sizeDesc[language]}</p>
                                        <p className="text-base my-4">{posDesc[language]}</p>
                                        <button
                                            className="text-sm text-blue-600 hover:underline mb-2"
                                            onClick={() => setShowChartDesc(false)}
                                        >
                                        {language === "zh-Hant" ? "隱藏" : language === "zh-Hans" ? "隐藏" : "Hide"}
                                        </button>
                                    </div>
                                )}
                            </div> 
                            {/* discover more section */}
                            < DiscoverMore article={article}/> 
                        </div>                                                                  
                    </div>                                    
                </div>                     
            </div>            
        </article>                
    )        

}

export default ViewArticle