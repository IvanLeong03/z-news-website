import { useSearchParams } from "react-router-dom";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q"); // this will be 'tariff' if URL is /search?q=tariff

  return (
    <div className="p-4 w-[80dvw] mx-auto my-16">
      <h1 className="text-2xl mb-8">Search Results for: "{query}"</h1>
      {/* Render your search results here based on `query` */}
      <ul className="flex flex-col gap-8">
        <li>Search Result 1</li>
        <li>Search Result 2</li>
        <li>Search Result 3</li>
      </ul>
    </div>
  );
}

export default SearchResults;