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
    return data.data.articles;
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

export async function saveArticle(articleID) {
    const token = localStorage.getItem('jwt_token');

    const res = await fetch(`https://api.zonenews.io/dev/profile/saveadd?articleID=${articleID}`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Failed to save article ${articleID}: ${errorData.msg || res.statusText}`);
    }

    return true; // or return await res.json() if backend sends confirmation
}

export async function deleteSavedArticle(articleID) {
    const token = localStorage.getItem('jwt_token');
    const res = await fetch(`https://api.zonenews.io/dev/profile/saved/delete?articleID=${articleID}`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error(`Detailed error for deleting saved article ${articleID}:`, errorData); // Add this
        throw new Error(`Failed to delete saved article ${articleID}: ${errorData.msg || res.statusText}`);
    }

    return true;
}

export async function deleteHistoryArticle(articleID) {
    const token = localStorage.getItem('jwt_token');
    const res = await fetch(`https://api.zonenews.io/dev/profile/history/delete?articleID=${articleID}`, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error(`Detailed error for deleting article from reading history ${articleID}:`, errorData); // Add this
        throw new Error(`Failed to delete article ${articleID} from history: ${errorData.msg || res.statusText}`);
    }

    return true;
}





