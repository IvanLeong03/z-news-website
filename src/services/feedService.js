export async function fetchFeed(tag) {
    const token = localStorage.getItem('jwt_token');

    const res = await fetch(`https://api.zonenews.io/dev/feed?tag=${tag}`, {
        method: "GET",
        credentials: 'include',
        headers: {
        "Content-Type": "application/json"
        },
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch article ${articleID}: ${errorData.msg || res.statusText}`);
    }
    const data = await res.json();
    return data.data.articles;
}
