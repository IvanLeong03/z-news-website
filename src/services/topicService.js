export async function fetchTopic(language) {
    const token = localStorage.getItem('jwt_token');

    const res = await fetch(`https://api.zonenews.io/dev/feed/trending-topics?lang=${language}`, {
        method: "GET",
        credentials: 'include',
        headers: {
        "Content-Type": "application/json"
        },
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to fetch trending topics: ${errorData.msg || res.statusText}`);
    }
    const data = await res.json();
    return data.data.topics;
}
