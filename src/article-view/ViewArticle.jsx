import React, { useState, useEffect } from "react";
import Ads from "../home-components/Ads";
import { useParams, useNavigate } from "react-router-dom";
import SentimentGauge from "../metric-components/SentimentGauge";
import SubjectivitySlider from "../metric-components/SubjectivitySlider";
import SplitBar from "../metric-components/SplitBar";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { Link } from "react-router-dom";
import OutletDistribution from "../metric-components/OutletDistribution";
import { FaRegBookmark , FaBookmark} from "react-icons/fa";
import { fetchArticle } from "../services/articleService";
import { saveArticle } from "../services/profileService";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { TiMessages } from "react-icons/ti";
import SummarySettingsDropdown from "./SummarySettingsDropdown";
import TimelineScroller from "./TimelineScroller";
import FeedbackButton from "./FeedbackButton";

function ViewArticle() {
    const { id } = useParams();
    const { language} = useLanguage();
    const [summaryLanguage, setSummaryLanguage] = useState(language);
    const [tone, setTone] = useState("straightforward");
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookmarked, setBookmarked] = useState(false);
    const [sortOption, setSortOption] = useState("significance-desc"); //user preference should be fetched from backend
    const [showAllC, setShowAllC] = useState(false);
    const [showAllP, setShowAllP] = useState(false);
    const [selectedView, setSelectedView] = useState("progressive"); // or "conservative"
    const [isHovered, setIsHovered] = useState(false);
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
    const cp = (
        article.coverage?.centric !== undefined
            ? Math.round(article.coverage.centric * 100)
            : article.coverage?.percentage?.centric * 100
    );

    const pp = (
        article.coverage?.progressive !== undefined
            ? Math.round(article.coverage.progressive * 100)
            : article.coverage?.percentage?.progressive * 100
    );

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

    // Sorting logic for linked articles
    function sortPublisherArticles(articles) {
        // Split the compound sortOption into criteria and order
        const [criteria, order] = sortOption.split('-');
        
        // First, sort based on the criteria
        let sortedArticles;
        switch (criteria) {
            case "significance":
                sortedArticles = [...articles].sort((a, b) => b.mediaSignificance - a.mediaSignificance);
                break;
            case "publisherName":
                sortedArticles = [...articles].sort((a, b) => b.publisherName.localeCompare(a.publisherName));
                break;
            case "publisherRegion":
                sortedArticles = [...articles].sort((a, b) => (b.publisherRegion || "").localeCompare(a.publisherRegion || ""));
                break;
            case "stance":
                sortedArticles = [...articles].sort((a, b) => (b.publisherStance.tag || "").localeCompare(a.publisherStance.tag || ""));
                break;
            case "date":
                sortedArticles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case "title":
                sortedArticles = [...articles].sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                return articles;
        }
        
        // Then reverse if order is "asc" (ascending)
        if (order === "asc") {
            sortedArticles.reverse();
        }
        
        return sortedArticles;
    }

    const sortedPublisherArticles = article?.articles ? sortPublisherArticles(article.articles) : [];
    const sortedArticlesP = sortedPublisherArticles.filter(a => a.publisherStance.tag === "p");
    const sortedArticlesC = sortedPublisherArticles.filter(a => a.publisherStance.tag === "c");
    const visibleArticlesC = showAllC ? sortedArticlesC : sortedArticlesC.slice(0, 3);
    const visibleArticlesP = showAllP ? sortedArticlesP : sortedArticlesP.slice(0, 3);
    
    return (
        <article className="grid grid-cols-[4fr_1fr] overflow-hidden justify-center items-start w-9/10 h-full mx-auto">
            <div className="min-h-dvh px-1 py-4">
                <div className="flex-col flex-grow w-9/10 mx-auto">
                    {/* region, sector, date and time*/}
                    <div className="w-full flex justify-between items-center">
                        <div className="flex flex-col justify-between items-start my-1">
                            <div className="flex text-base text-[var(--color-gs-white)] gap-x-4">
                                <label className="px-2 rounded-r-lg rounded-l-lg bg-[var(--color-primary)]">{article.region}</label>                            
                                <label className="px-2 rounded-r-lg rounded-l-lg bg-[var(--color-secondary-1)]">{article.sector}</label>
                            </div>
                            <div className="text-[var(--color-text-lightgrey)] text-sm my-2">
                                <p>
                                    <label>{language === "zh-Hant" ? "發表日期" : language === "zh-Hans" ? "发表日期" : "Date published"}: </label>
                                    {article.date.slice(5, 10)}
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
                                                  
                    { /* article title, bookmark and share buttons */ }
                    <div className="w-full my-2 pb-2 pr-8 flex justify-between items-center">
                        <h1 className="text-4xl font-semibold">{article.title}</h1>                                                
                    </div>
                    {/* picture and metrics (Sentiment and subjectivity) */}
                    <div className="grid grid-cols-[3fr_1fr]">
                        <div className="aspect-[16/9] overflow-hidden px-4">
                            <img src={article.pictureURL} className="w-full h-full object-cover" />
                        </div>
                        <div className="px-4 rounded-xl flex flex-col justify-between">
                            <div className="flex flex-col flex-grow justify-between items-center py-8 mb-8 border border-dashed border-[var(--color-line-grey)]">
                                <div className="w-4/5">
                                    <SentimentGauge sentiment={article.metrics.sentiment}/>            
                                </div>
                                <div className="w-4/5">
                                    <SubjectivitySlider subjScore={article.metrics.subjectivity}/>              
                                </div>
                                <div className="w-4/5">
                                    <SplitBar cPercent={cp} pPercent={pp}/>
                                </div>
                            </div>
                            
                            <Link to="/user-guide" className="hover:underline">
                                <p className="text-sm 2xl:text-base relative bottom-0 my-2">
                                    Click here to for more details on how we calculate these metrics
                                </p>                                           
                            </Link>
                        </div>                            

                    </div>
                    
                </div>

                {/* summary */}
                <div className="flex flex-col w-9/10 mx-auto my-8 p-4 text-lg bg-[var(--color-light-turquoise)] rounded-xl">                                                                                                    
                    <div className="py-4">
                        {/*<h2 className="text-xl font-bold">{language === "zh-Hant" ? "摘要" : language === "zh-Hans" ? "摘要" : "What Happened"}</h2>*/}
                        <p className="py-2">{article.description.synopsis}</p>                      
                    </div>   
                    <div className="py-4">
                        {/*<h2 className="text-xl font-bold">{language === "zh-Hant" ? "影響" : language === "zh-Hans" ? "影响" : "Significance and Implications"}</h2>*/}
                        <p className="py-2">{article.description.implications}</p>                      
                    </div>                    
                    <div className="px-8 my-4 flex justify-between items-start">
                        <SummarySettingsDropdown
                            language={language}
                            summaryLanguage={summaryLanguage}
                            setSummaryLanguage={setSummaryLanguage}
                            tone={tone}
                            setTone={setTone}
                        />
                        <button className="px-4 h-8 w-80 bg-[var(--color-primary)] rounded-md flex justify-center">
                            <span className="flex items-center">
                                <TiMessages color="white"/>
                                <label className="mx-2 text-[var(--color-gs-white)] text-sm">
                                    {language === "zh-Hant" ? "補充相關背景" : language === "zh-Hans" ? "补充相关背景" : "Generate Context"}                                                
                                </label>
                            </span>
                        </button>
                        {/*
                        <button className="px-4 h-8 bg-[var(--color-bg-light)] border border-[var(--color-line-verylightgrey)]  rounded-md">
                            <span className="flex items-center">
                                <BiMessageError />
                                <label className="mx-2 text-[var(--color-gs-black)] text-sm">
                                    {language === "zh-Hant" ? "意見回饋" : language === "zh-Hans" ? "意见回馈" : "Provide Feedback"}                                                
                                </label>
                            </span>
                        </button>
                        */}
                        <FeedbackButton language={language} articleID={id} />
                    </div>
                                        
                    {/* disclaimer */}
                    <p className="text-[var(--color-text-lightgrey)] text-xs mt-8 py-2">
                        {language === "zh-Hant" ? "此摘要由 SearcherAI 生成。" 
                        : language === "zh-Hans" ? "此摘要由 SearcherAI 生成。" 
                        : "This summary is generated by SearcherAI."}
                    </p>                    
                </div>

                {/* leaning distribution */}
                <div className="grid grid-cols-[2fr_1fr] p-2 w-9/10 mx-auto">                                                                                                    
                    <div className="py-4 pr-8 flex flex-col">
                        <OutletDistribution cPercent={article.coverage.percentage.centric*100} pPercent={article.coverage.percentage.progressive*100} cIcons={article.coverage.icons.centric} pIcons={article.coverage.icons.progressive} />
                        <p className="text-sm whitespace-nowrap my-2 text-center">                            
                            {language === 'zh-Hant' ? '文章數:' : language === 'zh-Hans' ? '文章数:' : 'Number of reports: '}
                            {article.nSources}
                        </p> 
                        <p className="text-base my-4">{sizeDesc[language]}</p>
                        <p className="text-base my-4">{posDesc[language]}</p>
                    </div>                    
                    <div className="py-8 pl-2">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{language === "zh-Hant" ? "文章一覽" : language === "zh-Hans" ? "文章一览" : "Article List"}</h2>
                            <div className="flex items-center space-x-2 text-sm">
                                {/* Criteria dropdown */}
                                <select
                                    value={sortOption.split("-")[0]}
                                    onChange={e => {
                                        const order = sortOption.split("-")[1] || "desc";
                                        setSortOption(`${e.target.value}-${order}`);
                                    }}
                                    className="border rounded px-2 py-1 focus:outline-none"
                                >
                                    <option value="significance">
                                        {language === "zh-Hant" ? "媒體重要性" : language === "zh-Hans" ? "媒体重要性" : "Media significance"}
                                    </option>
                                    <option value="publisherName">
                                        {language === "zh-Hant" ? "發布者名稱" : language === "zh-Hans" ? "发布者名称" : "Publisher name"}
                                    </option>
                                    <option value="publisherRegion">
                                        {language === "zh-Hant" ? "發布者地區" : language === "zh-Hans" ? "发布者地区" : "Publisher region"}
                                    </option>
                                    {/*
                                    <option value="stance">
                                        {language === "zh-Hant" ? "媒體立場" : language === "zh-Hans" ? "媒体立场" : "Stance"}
                                    </option>
                                    */}
                                    <option value="date">
                                        {language === "zh-Hant" ? "日期" : language === "zh-Hans" ? "日期" : "Date"}
                                    </option>
                                </select>
                                {/* Order toggle button */}
                                <button
                                    onClick={() => {
                                        const criteria = sortOption.split("-")[0];
                                        const currentOrder = sortOption.split("-")[1] || "desc";
                                        const newOrder = currentOrder === "desc" ? "asc" : "desc";
                                        setSortOption(`${criteria}-${newOrder}`);
                                    }}
                                    className="border rounded focus:outline-none flex px-1 items-center justify-between w-12 h-7"
                                    title={sortOption.split("-")[1] === "asc" ? "ascending" : "descending"}
                                >
                                    {/* Up arrow */}
                                    <FaArrowUp 
                                        className={`text-xs ${
                                            sortOption.split("-")[1] === "asc" ? 
                                            "text-[var(--color-text-grey)]" : "text-[var(--color-line-verylightgrey)]"
                                        }`} 
                                        size={32}
                                    />
                                    {/* Down arrow */}
                                    <FaArrowDown 
                                        className={`text-xs ${
                                            sortOption.split("-")[1] === "desc" ? 
                                            "text-[var(--color-text-grey)]" : "text-[var(--color-line-verylightgrey)]"
                                        }`}
                                        size={32} 
                                    />
                                </button>
                            </div> 
                        </div>                                       

                        {/* Article list on the right */}
                        <div className="py-8 px-4">
                            {/* View toggle buttons */}
                            <div className="mb-4">
                                <div className="flex space-x-4 text-sm">
                                <button
                                    onClick={() => setSelectedView("conservative")}
                                    className={`px-3 py-1 rounded ${selectedView === "conservative" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-bg-grey)]"}`}
                                >
                                    {language === "zh-Hant" ? "保守派" : language === "zh-Hans" ? "保守派" : "Conservative"}
                                </button>
                                <button
                                    onClick={() => setSelectedView("progressive")}
                                    className={`px-3 py-1 rounded ${selectedView === "progressive" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-line-grey)]"}`}
                                >
                                    {language === "zh-Hant" ? "進步派" : language === "zh-Hans" ? "进步派" : "Progressive"}
                                </button>
                                </div>
                            </div>

                            <ul>
                            {(selectedView === "conservative" ? visibleArticlesC : visibleArticlesP).map((article, index) => (
                                <li key={index} className="flex flex-col justify-between items-start px-2 py-4">
                                    <div className="flex">
                                        <img src={article.publisherIcon} width={60} className="rounded-full" />
                                        <div className="mx-4 flex flex-col text-[var(--color-text-lightgrey)] text-sm">
                                            <div>
                                                <label>{article.publisherName}</label>
                                                <label className="mx-2">({article.publisherRegion || "Unknown Region"})</label>
                                            </div>
                                            <div className={`w-24 text-center rounded-xl mt-1 ${
                                            selectedView === "progressive"
                                                ? "bg-[var(--color-line-grey)] text-[var(--color-gs-white)]"
                                                : "bg-[var(--color-bg-grey)]"
                                            }`}>
                                                {article.publisherStance.displayName}
                                            </div>
                                        </div>                                
                                    </div>
                                    <div className="w-full">
                                        <a href={article.articleURL} target="_blank" rel="noopener noreferrer">
                                            <h2 className="my-2 text-lg hover:text-[var(--color-secondary-1)]">{article.title}</h2>
                                        </a>
                                    </div>
                                </li>
                            ))}
                            </ul>

                            {(selectedView === "conservative" ? sortedArticlesC.length : sortedArticlesP.length) > 3 && (
                            <button
                                onClick={() =>
                                selectedView === "conservative"
                                    ? setShowAllC(!showAllC)
                                    : setShowAllP(!showAllP)
                                }
                                className="text-sm text-blue-600 hover:underline mt-2"
                            >
                                {selectedView === "conservative"
                                ? showAllC ? "Show Less" : "Show More"
                                : showAllP ? "Show Less" : "Show More"}
                            </button>
                            )}
                        </div>                                            
                    </div>                                               
                </div>
                {/* timeline */}
                <div className="w-9/10 mx-auto rounded mt-12">
                    <h2 className="text-2xl font-semibold">Timeline</h2>
                    <p className="my-2 text-sm text-[var(--color-text-lightgrey)]">
                        The timeline shows the publication dates of articles related to this topic in chronological order.
                        Scroll to explore articles covering the development of this event over time.
                    </p>
                    <div className="w-4/5 mx-auto my-4 border border-blue-300">
                        < TimelineScroller events={timelineEvents} />
                    </div>
                </div>
                <Ads />                      
            </div>

            { /* 2nd column */}
            <div className="h-full py-6 px-1 border-l border-[var(--color-line-darkgrey)]">
                <div className="m-4 flex flex-col items-start">
                    <h1 className="text-2xl mb-8 font-semibold">Discover more</h1>
                    <h2 className="text-lg my-1">Related tags: </h2>
                    {article.relatedTopics.map((t, index) => (
                        <button
                        key={index}
                        onClick={() => handleTopicClick(t)}
                        className="my-1 px-2 rounded-r-lg rounded-l-lg text-[var(--color-text-grey)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-gs-white)]"
                        >
                            # {t}
                        </button>
                    ))}
                </div>
                <div className="mx-4 my-16 flex flex-col items-start">
                    <h2 className="text-lg my-1">Related articles: </h2>
                    <ul className="list-disc px-4">
                        {article.relatedArticles.map((a, index) => (
                            <li key={index} className="my-2 hover:text-[var(--color-primary)]">
                                <Link to={`/article/${a.articleID}`}> 
                                {a.title}
                                </Link>
                            </li>                            
                        ))}
                    </ul>
                </div>
                
                <div className="flex flex-col h-dvh">
                    <img src="/src/assets/customise-ads-button.svg" className="w-1/2 mx-auto" />
                    {/* make it a button */}
                    <Ads />                    
                </div>                
            </div>
        </article>                
    )        

}

export default ViewArticle