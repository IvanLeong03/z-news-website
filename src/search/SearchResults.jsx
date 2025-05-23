import { useSearchParams } from "react-router-dom";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // this will be 'tariff' if URL is /search?q=tariff

  return (
    <div className="p-4 w-[80dvw] mx-auto my-16">
      <h1 className="text-2xl mb-8">Search Results for: "{query}"</h1>
      {/* Render your search results here based on `query` */}
      

      <div className="mb-6">
        <label htmlFor="sort" className="mr-2 font-medium">
          Sort by:
        </label>
        <select id="sort" name="sort" className="border rounded px-2 py-1">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      <ul className="flex flex-col gap-16 text-lg">
        <li>Search Result 1</li>
        <li>Search Result 2</li>
        <li>Search Result 3</li>
      </ul>
    </div>
  );
}

export default SearchResults;