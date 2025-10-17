import React, { useState, useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import { mapFrontendLangToBackend } from "../context/LangConverter";
import { fetchFeed } from "../services/feedService";
import { fetchArticle } from "../services/articleService";
import { fetchPersonalTopics, fetchAllTopics, editTopic } from "../services/profileService";
import Select from "react-select";
import ArticleCluster from "./ArticleCluster.jsx";

// helper to build [headline, 5 articles] groups
function buildHeadlineArticleClusters(headlines = [], articles = []) {
  const groups = [];
  let hi = 0;
  let ai = 0;

  while (hi < headlines.length && ai < articles.length) {
    const headline = headlines[hi++];
    const six = articles.slice(ai, ai + 6);
    ai += 6;
    groups.push([headline, ...six]);
  }

  while (hi < headlines.length) {
    groups.push([headlines[hi++], ...articles.slice(0, 3)]);
    //push another 3 articles too
  }

  return groups;
}

function Personal() {
    const { language } = useLanguage();
    const toOption = (t) => ({ value: t.tag, label: t.displayName });

    const [articles, setArticles] = useState([]);
    const [headlineArticles, setHeadlineArticles] = useState([]);

    const [allOptions, setAllOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [originalSelectedOptions, setOriginalSelectedOptions] = useState([]);

    const [loadingArticles, setLoadingArticles] = useState(true);
    const [loadingTopics, setLoadingTopics]   = useState(true);
    const [errorArticles, setErrorArticles]   = useState(null);
    const [errorTopics, setErrorTopics]     = useState(null);
    const [saving, setSaving]          = useState(false);

    const isLoading = loadingArticles || loadingTopics;

    // ARTICLES
    useEffect(() => {
        let cancelled = false;
        const loadArticles = async () => {
        setLoadingArticles(true);
        setErrorArticles(null);
        try {
            const backendLang = mapFrontendLangToBackend(language);
            const results = await fetchFeed("personal", backendLang);
            const headlines = results?.headlines ?? [];
            const detailed = await Promise.all(
                headlines.map((h) => fetchArticle(h.articleID, backendLang))
            );
            if (cancelled) return;
            setHeadlineArticles(detailed);
            setArticles(results?.articles ?? []);
        } catch (err) {
            if (!cancelled) setErrorArticles(err?.message || "Failed to load articles");
        } finally {
            if (!cancelled) setLoadingArticles(false);
        }
        };
        loadArticles();
        return () => { cancelled = true; };
    }, [language]);

    // TOPICS
    useEffect(() => {
        let cancelled = false;
        const loadTopics = async () => {
        setLoadingTopics(true);
        setErrorTopics(null);
        try {
            const lang = mapFrontendLangToBackend(language);
            const [followed, all] = await Promise.all([
            fetchPersonalTopics(lang),
            fetchAllTopics(lang),
            ]);
            if (cancelled) return;
            const allOpts = (all || []).map(toOption);
            const selOpts = (followed || []).map(toOption);
            setAllOptions(allOpts);
            setSelectedOptions(selOpts);
            setOriginalSelectedOptions(selOpts); // snapshot for diff
        } catch (err) {
            if (!cancelled) setErrorTopics(err?.message || "Failed to load topics");
        } finally {
            if (!cancelled) setLoadingTopics(false);
        }
        };
        loadTopics();
        return () => { cancelled = true; };
    }, [language]);

    // DIRTY CHECK
    const isDirty = useMemo(() => {
        const a = new Set(originalSelectedOptions.map((o) => o.value));
        const b = new Set(selectedOptions.map((o) => o.value));
        if (a.size !== b.size) return true;
        for (const x of a) if (!b.has(x)) return true;
        return false;
    }, [originalSelectedOptions, selectedOptions]);

    // SAVE
    const handleSaveChanges = async () => {
        try {
        setSaving(true);
        const lang = mapFrontendLangToBackend(language);
        const original = originalSelectedOptions.map((o) => o.value);
        const current  = selectedOptions.map((o) => o.value);
        const toAdd    = current.filter((t) => !original.includes(t));
        const toRemove = original.filter((t) => !current.includes(t));
        await Promise.all([
            ...toAdd.map((tag) => editTopic("ADD", tag, lang)),
            ...toRemove.map((tag) => editTopic("DELETE", tag, lang)),
        ]);
        setOriginalSelectedOptions(selectedOptions); // synced snapshot
        } catch (err) {
        setErrorTopics(err?.message || "Failed to save changes");
        } finally {
        setSaving(false);
        }
    };

    const clusters = useMemo(
        () => buildHeadlineArticleClusters(headlineArticles, articles),
        [headlineArticles, articles]
    );

    //sorting not implemented yet
    //wait until popularity and relevance are included in backend

    return (
        <main className="w-3/4 mx-auto max-w-[1920px] p-4">
            <h1 className="text-3xl font-bold mt-8">Personal</h1>
            <label className="italic my-1">
                Curated articles based on your followed topics and reading history.
            </label>

            <div className="flex flex-wrap items-center my-4 gap-4 lg:gap-16">
                <div className="flex items-center gap-2">
                <label>Sort by:</label>
                <select className="rounded-md border border-[var(--color-line-grey)] px-2 py-1">
                    <option value="latest">Latest</option>
                    <option value="popularity">Most popular</option>
                    <option value="relevance">Most relevant</option>
                </select>
                </div>

                <div className="flex items-center gap-2">
                <label>Active tags:</label>
                <div className="w-[40dvw] max-w-[960px] mx-2">
                    <Select
                    isMulti
                    options={allOptions}
                    value={selectedOptions}
                    onChange={(opts) => setSelectedOptions(opts || [])}
                    classNamePrefix="rs"
                    menuPortalTarget={typeof document !== "undefined" ? document.body : undefined}
                    styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                    placeholder="Select topics…"
                    isDisabled={loadingTopics}
                    />
                </div>
                <button
                    onClick={handleSaveChanges}
                    disabled={!isDirty || saving || loadingTopics}
                    className={`rounded-md px-3 py-2 text-sm text-white transition
                    ${!isDirty || saving || loadingTopics
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[var(--color-dark-turquoise)] hover:brightness-90"}`}
                >
                    {saving ? "Saving…" : "Save changes"}
                </button>
                </div>
            </div>

            {/* Optional status messages */}
            {errorTopics && (
                <div className="mt-2 text-sm text-red-600">{errorTopics}</div>
            )}
            {errorArticles && (
                <div className="mt-2 text-sm text-red-600">{errorArticles}</div>
            )}

            <section>
                <div className="space-y-[15dvh] p-8">
                    {clusters.map((group, i) => {
                        const [headline, ...rest] = group;
                        return (
                        <ArticleCluster
                            key={headline?.articleID ?? `cluster-${i}`}
                            headline={headline}
                            articles={rest}
                        />
                        );
                    })}
                </div>

                
            </section>
        </main>
    );
}

export default Personal;
