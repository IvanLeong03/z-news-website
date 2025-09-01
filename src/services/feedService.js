export async function fetchFeed(tag, language) {
    const token = localStorage.getItem('jwt_token');

    const res = await fetch(`https://api.zonenews.io/dev/feed?tag=${tag}&lang=${language}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch article ${articleID}: ${errorData.msg || res.statusText}`);
    }
    const data = await res.json();
    return data.data;
}
