export async function fetchHistory(language) {
    const token = localStorage.getItem('jwt_token');

    const res = await fetch(`https://api.zonenews.io/dev/profile/history?lang=${language}`, {
        method: "GET",
        credentials: 'include',
        headers: {
        "Content-Type": "application/json",
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


export async function fetchSaved(language) {
    const token = localStorage.getItem('jwt_token');

    const res = await fetch(`https://api.zonenews.io/dev/profile/saved?lang=${language}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error(`Detailed error for saved article ${articleID}:`, errorData); // Add this
        throw new Error(`Failed to fetch saved article ${articleID}: ${errorData.msg || res.statusText}`);
    }
    const data = await res.json();
    return data.data.articles;
}

