// components/ArticleCluster.jsx
import { Link } from "react-router-dom";
import SentimentSlider from "../metric-components/SentimentSlider";

// You can replace these with your existing components
function HeadlineCard({ article }) {
    if (!article) return null;
    return (
        <Link to={`/article/${article.articleID}`} className="block h-full">
        <div className="flex flex-col border border-[var(--color-line-grey)] rounded-lg overflow-hidden">
            <div className="w-full mx-auto aspect-[16/9] overflow-hidden">
                <img src={article.pictureURL} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
                <div className="text-sm text-[var(--color-primary)] mb-2">
                    <label>{article.region}</label>
                    <label className="mx-1">|</label>
                    <label>{article.sector}</label>
                </div>
                <h3 className="text-2xl font-bold line-clamp-2">{article.title}</h3>
                <p className="mt-2 text-sm text-[var(--color-text-lightgrey)] line-clamp-3">
                {article.description.synopsis}
                </p>
                <label className="text-sm my-2">{article.date.slice(11, 16)}</label>
            </div>
        </div>
        </Link>
    );
    }

function ArticleCard({ article }) {
    if (!article) return null;
    return (
        <Link to={`/article/${article.articleID}`} className="block h-full">
        <div className="h-full rounded-lg overflow-hidden hover:shadow-sm p-2">            
            <div className="grid grid-cols-[2fr_3fr]">
                <div className="px-2 flex flex-col">
                    <div className="text-sm text-[var(--color-primary)] mb-2">
                        <label>{article.region}</label>
                        <label className="mx-1">|</label>
                        <label>{article.sector}</label>
                    </div>
                    <h4 className="text-lg mb-4">{article.title}</h4>
                    <SentimentSlider sentiment={article.metrics.sentiment}/>
                    <label className="text-sm mt-8">{article.date.slice(11, 16)}</label>
                </div>
                <div className="w-full aspect-[16/10] overflow-hidden">
                    <img src={article.pictureURL} alt={article.title} className="w-full h-full object-cover hover:scale-105 transition duration-700 ease-in-out" />
                </div>
            </div>

            
        </div>
        </Link>
    );
    }

export default function ArticleCluster({ headline, articles = [] }) {
    // Expect up to 6 smalls; pad with nulls to keep layout stable
    const smalls = [...articles].slice(0, 6);
    while (smalls.length < 6) smalls.push(null);

    return (
        <section className="w-full">
        <div className="grid grid-cols-3 grid-rows-4 gap-4">
            {/* 2x2 headline in top-left */}
            <div className="col-span-2 row-span-3">
            <HeadlineCard article={headline} />
            </div>

            {/* Remaining cells in reading order (top-right, middle-right, bottom-left/middle/bottom) */}
            <div className="col-span-1 row-span-1">
            <ArticleCard article={smalls[0]} />
            </div>
            <div className="col-span-1 row-span-1">
            <ArticleCard article={smalls[1]} />
            </div>
            <div className="col-span-1 row-span-1">
            <ArticleCard article={smalls[2]} />
            </div>
            <div className="col-span-1 row-span-1">
            <ArticleCard article={smalls[3]} />
            </div>
            <div className="col-span-1 row-span-1">
            <ArticleCard article={smalls[4]} />
            </div>
            <div className="col-span-1 row-span-1">
            <ArticleCard article={smalls[5]} />
            </div>
            
        </div>
        </section>
    );
}
