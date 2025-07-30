export async function fetchArticles({ limit = 4 }) {
  const articles = [];
  for (let i = 1; i <= limit; i++) {
    const res = await fetch(`/dev/article/${i}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch article ${i}`);
    }
    const data = await res.json();
    articles.push(data.data);
  }
  return articles;
}
