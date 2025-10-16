import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import SearchObject from "./SearchObject";
import { fetchSearchResult } from '../services/searchService';

function SearchResults() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [sort, setSort] = useState("newest");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const articles = await fetchSearchResult(query || '');
        setResults(articles);
      } catch (err) {
        setError(err.message);
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  // Sort results whenever sort or results change
  const sortedResults = [...results].sort((a, b) => {
    if (sort === "newest") {
      // Assuming article.date is ISO string
      return new Date(b.date) - new Date(a.date);
    } else if (sort === "oldest") {
      return new Date(a.date) - new Date(b.date);
    } else if (sort === "alphabetical") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });


  const handleSortChange = (e) => {
    setSort(e.target.value);
    // Note: Your current backend doesn't support sort parameter
    // You'll need to implement this in your Flask route
  };

  if (loading) return <div className="p-4 w-4/5 mx-auto my-16">Loading...</div>;
  if (error) return <div className="p-4 w-4/5 mx-auto my-16">Error: {error}</div>;

  return (
    <div className="p-4 w-3/5 mx-auto max-w-[1536px]">
      <div className='w-full flex justify-between items-center my-8'>
        <div className='flex flex-col mr-8'>
          <h2 className='text-[var(--color-text-lightgrey)] text-base 2xl:text-lg'>
            {language === "zh-Hant" ? "搜尋結果" : 
            language === 'zh-Hans' ? "搜寻结果" : "Search Results"}:
          </h2>
          <h1 className="text-xl 2xl:text-2xl mb-4">
              {query}
          </h1>
        </div>
        

        <div className="mb-4 text-sm">
          <label htmlFor="sort" className="mr-2">
            {language === 'zh-Hant' ? "優先展示" : 
            language === 'zh-Hans' ? "优先展示" : "Sort by"}:
          </label>
          <select 
            id="sort" 
            name="sort" 
            className="border rounded px-2 py-1"
            value={sort}
            onChange={handleSortChange}                     
          >
            <option value="newest">
              {language === 'zh-Hant' ? "最新" : 
              language === 'zh-Hans' ? "最新" : "Newest"}
            </option>
            <option value="oldest">
              {language === 'zh-Hant' ? "最舊" : 
              language === 'zh-Hans' ? "最旧" : "Oldest"}
            </option>
            <option value="alphabetical">
              {language === 'zh-Hant' ? "字母排序" : 
              language === 'zh-Hans' ? "字母排序" : "Alphabetical"}
            </option>
          </select>
        </div>

      </div>
      

      <ul className="flex flex-col text-lg">
        {sortedResults.length > 0 ? (
          sortedResults.map((article) => (
            <li key={article.articleID}>
              <SearchObject 
                article={article} 
              />
            </li>
          ))
        ) : (
          <p>{language === 'zh-Hant' ? "沒有找到結果" : 
              language === 'zh-Hans' ? "没有找到结果" : "No results found"}</p>
        )}
      </ul>
    </div>
  );
}

export default SearchResults;