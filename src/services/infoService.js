export async function fetchAbout(language){
    const res = await fetch(`https://api.zonenews.io/dev/info/aboutus?lang=${language}`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error(`Detailed error:`, errorData); // Add this
        throw new Error(`Failed to fetch about: ${errorData.msg || res.statusText}`);
    }
    const data = await res.json();
    return data.data.content;
}