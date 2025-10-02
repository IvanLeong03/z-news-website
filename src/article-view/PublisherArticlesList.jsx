// src/components/PublisherArticlesList.jsx
import React, { useMemo, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function PublisherArticlesList({ articles = [], language = "en" }) {
    const labels = {
        title: {
        "en": "Article List",
        "zh-Hant": "文章一覽",
        "zh-Hans": "文章一览",
        },
        cons: {
        "en": "Conservative",
        "zh-Hant": "保守派",
        "zh-Hans": "保守派",
        },
        prog: {
        "en": "Progressive",
        "zh-Hant": "進步派",
        "zh-Hans": "进步派",
        },
        sort: {
        significance: {
            "en": "Media significance",
            "zh-Hant": "媒體重要性",
            "zh-Hans": "媒体重要性",
        },
        publisherName: {
            "en": "Publisher name",
            "zh-Hant": "發布者名稱",
            "zh-Hans": "发布者名称",
        },
        publisherRegion: {
            "en": "Publisher region",
            "zh-Hant": "發布者地區",
            "zh-Hans": "发布者地区",
        },
        date: {
            "en": "Date",
            "zh-Hant": "日期",
            "zh-Hans": "日期",
        },
        // keep stance/title ready if you want later
        },
        showMore: {
        "en": "Show More",
        "zh-Hant": "顯示更多",
        "zh-Hans": "显示更多",
        },
        showLess: {
        "en": "Show Less",
        "zh-Hant": "顯示更少",
        "zh-Hans": "显示更少",
        },
    };

    // Local UI state (component-owned)
    const [sortOption, setSortOption] = useState("significance-desc");
    const [selectedView, setSelectedView] = useState("progressive"); // "progressive" | "conservative"
    const [showAllP, setShowAllP] = useState(false);
    const [showAllC, setShowAllC] = useState(false);

    // Sorting logic
    const sortPublisherArticles = (list, option) => {
        const [criteria, order] = option.split("-");
        let sorted = [...list];

        switch (criteria) {
        case "significance":
            sorted.sort((a, b) => b.mediaSignificance - a.mediaSignificance);
            break;
        case "publisherName":
            sorted.sort((a, b) => b.publisherName.localeCompare(a.publisherName));
            break;
        case "publisherRegion":
            sorted.sort((a, b) =>
            (b.publisherRegion || "").localeCompare(a.publisherRegion || "")
            );
            break;
        case "date":
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case "title":
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
        default:
            break;
        }

        if ((order || "desc") === "asc") sorted.reverse();
        return sorted;
    };

    // Derived data (memoized)
    const { sortedArticlesP, sortedArticlesC } = useMemo(() => {
        const sortedAll = sortPublisherArticles(articles || [], sortOption);
        return {
        sortedArticlesP: sortedAll.filter(a => a?.publisherStance?.tag === "p"),
        sortedArticlesC: sortedAll.filter(a => a?.publisherStance?.tag === "c"),
        };
    }, [articles, sortOption]);

    const displayedArticles =
        selectedView === "conservative" ? sortedArticlesC : sortedArticlesP;

    const handleToggleOrder = () => {
        const [criteria, order = "desc"] = sortOption.split("-");
        const newOrder = order === "desc" ? "asc" : "desc";
        setSortOption(`${criteria}-${newOrder}`);
    };

    const totalCurrent =
        selectedView === "conservative" ? sortedArticlesC.length : sortedArticlesP.length;

    return (
        <div className="py-8 pl-2">
        {/* Header + sort controls */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{labels.title[language]}</h2>
            <div className="flex items-center space-x-2 text-sm">
            {/* Criteria dropdown */}
            <select
                value={sortOption.split("-")[0]}
                onChange={(e) => {
                const order = sortOption.split("-")[1] || "desc";
                setSortOption(`${e.target.value}-${order}`);
                }}
                className="border rounded px-2 py-1 focus:outline-none"
            >
                <option value="significance">{labels.sort.significance[language]}</option>
                <option value="publisherName">{labels.sort.publisherName[language]}</option>
                <option value="publisherRegion">{labels.sort.publisherRegion[language]}</option>
                <option value="date">{labels.sort.date[language]}</option>
                {/* Add more criteria if you re-enable them */}
            </select>

            {/* Order toggle button */}
            <button
                onClick={handleToggleOrder}
                className="border rounded focus:outline-none flex px-1 items-center justify-between w-12 h-7"
                title={sortOption.split("-")[1] === "asc" ? "ascending" : "descending"}
            >
                <FaArrowUp
                className={`text-xs ${
                    (sortOption.split("-")[1] || "desc") === "asc"
                    ? "text-[var(--color-text-grey)]"
                    : "text-[var(--color-line-verylightgrey)]"
                }`}
                size={32}
                />
                <FaArrowDown
                className={`text-xs ${
                    (sortOption.split("-")[1] || "desc") === "desc"
                    ? "text-[var(--color-text-grey)]"
                    : "text-[var(--color-line-verylightgrey)]"
                }`}
                size={32}
                />
            </button>
            </div>
        </div>

        {/* View toggle */}
        <div className="mb-4">
            <div className="flex space-x-4 text-sm">
            <button
                onClick={() => setSelectedView("conservative")}
                className={`px-3 py-1 rounded ${
                selectedView === "conservative"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-bg-grey)]"
                }`}
            >
                {labels.cons[language]}
            </button>
            <button
                onClick={() => setSelectedView("progressive")}
                className={`px-3 py-1 rounded ${
                selectedView === "progressive"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-line-grey)]"
                }`}
            >
                {labels.prog[language]}
            </button>
            </div>
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto pr-2"> 
            <ul>
                {displayedArticles.map((a, index) => (
                <li
                    key={`${a.articleURL}-${index}`}
                    className="flex flex-col justify-between items-start px-2 py-4 border-b border-dotted border-[var(--color-line-verylightgrey)]"
                >
                    <div className="flex">
                    <div className="w-16 h-16">
                        <img
                        src={a.publisherIcon}
                        alt={a.publisherName}
                        className="rounded-full w-16 h-16 object-cover"
                        />
                    </div>

                    <div className="mx-4 flex flex-col text-[var(--color-text-lightgrey)] text-sm">
                        <div>
                        <label>{a.publisherName}</label>
                        <label className="mx-2">
                            ({a.publisherRegion || "Unknown Region"})
                        </label>
                        </div>
                        <div
                        className={`w-24 text-center rounded-xl mt-1 ${
                            selectedView === "progressive"
                            ? "bg-[var(--color-line-grey)] text-[var(--color-gs-white)]"
                            : "bg-[var(--color-bg-grey)]"
                        }`}
                        >
                        {a.publisherStance?.displayName}
                        </div>
                    </div>
                    </div>

                    <div className="w-full">
                    <a href={a.articleURL} target="_blank" rel="noopener noreferrer">
                        <h2 className="my-2 text-base 2xl:text-lg hover:text-[var(--color-secondary-1)]">
                        {a.title}
                        </h2>
                    </a>
                    </div>
                </li>
                ))}
            </ul>
        </div>

        </div>
    );
}

export default PublisherArticlesList;
