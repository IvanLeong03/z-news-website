// services/articleService.js
const API_URL = "http://api.zonenews.io:8000";
//const API_URL = "http://localhost:5000";

export async function fetchArticles({ limit = 4 }) {
  const articles = [];
  for (let i = 1; i <= limit; i++) {
    const res = await fetch(`${API_URL}/dev/article/${i}`, {
      method: "GET",
      credentials: "include", // 💥 critical!
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch article ${i}`);
    }
    const data = await res.json();
    articles.push(data.data);
  }
  return articles;
}
