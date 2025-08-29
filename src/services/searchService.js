export async function fetchSearchResult(keyword) {
    const token = localStorage.getItem('jwt_token');

    const res = await fetch(`https://api.zonenews.io/dev/search?q=${keyword}`, {
        method: "GET",
        credentials: 'include',
        headers: {
        "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Search result not found ${keyword}: ${errorData.msg || res.statusText}`);
    }
    const data = await res.json();
    return data.data.articles;
}

export async function fetchFeed(category, language) {


}