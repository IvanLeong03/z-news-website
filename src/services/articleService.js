// services/articleService.js
// Fetch a single article by ID

export async function fetchArticle(articleID, language) {
    const token = localStorage.getItem('jwt_token');
    //console.log('Token is:', token); 

    const res = await fetch(`https://api.zonenews.io/dev/article/${articleID}?lang=${language}`, {
        method: "GET",
        credentials: 'include',
        headers: {
        "Content-Type": "application/json"
        },
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error(`Detailed error for article ${articleID}:`, errorData); // Add this
        throw new Error(`Failed to fetch article ${articleID}: ${errorData.msg || res.statusText}`);
    }
    const data = await res.json();
    return data.data;
}
