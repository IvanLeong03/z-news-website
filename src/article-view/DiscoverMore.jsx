import React from "react";
import { Link } from "react-router-dom";

function DiscoverMore({article}) {

    return (
        <div className="flex flex-col justify-between">
            <div>
                <h1 className="text-2xl my-8 font-semibold">Discover more</h1>
                <h2 className="text-lg my-2">Related tags: </h2>
                <div className="flex flex-wrap gap-4">
                    {article.relatedTopics.map((t, index) => (
                        <button
                        key={index}
                        onClick={() => handleTopicClick(t)}
                        className="my-2 px-2 py-1 whitespace-nowrap shrink-0 rounded text-[var(--color-text-grey)] border border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-gs-white)]"
                        >
                            {t}
                        </button>
                    ))}
                </div>                    
            </div>
            <div className="px-2 my-16 flex flex-col items-start">                    
                <h2 className="text-lg my-2">Related articles: </h2>
                <ul>
                    {article.relatedArticles.map((a, index) => (
                        <li key={index} className="my-4 py-2 border-b border-[var(--color-line-verylightgrey)] hover:border-[var(--color-secondary-1)] ">                                        
                            <Link to={`/article/${a.articleID}`}>            
                                <div className="flex text-[var(--color-primary)] text-sm mt-1">
                                    <label>{a.region}</label>
                                    <label className="mx-2">|</label>
                                    <label>{a.sector}</label>
                                </div>
                                <div className="grid grid-cols-[3fr_2fr]">
                                    <h2 className="my-2 text-lg pr-2">{a.title}</h2>    
                                    <div className="w-full aspect-[16/9] overflow-hidden">
                                        <img src={a.pictureURL} alt='HeadlineImage' className="w-full h-full object-cover" />
                                    </div>      
                                </div>
                            </Link>
                        </li>                            
                    ))}
                </ul>
            </div>
        </div>   
    );
}

export default DiscoverMore;