import React from "react";

function SavedArticles() {
    return (
        <div className="w-1/2 mx-auto">
            <h1 className="text-2xl font-bold my-4">Saved Articles</h1>
            <p className="my-2">Here you can view all the articles you have saved for later reading.</p>
            <div className="my-12">
                {/* Placeholder for saved articles list */}
                <p className="my-2">No saved articles yet.</p>
                <button className="rounded-xl my-4 px-2 border border-[var(--color-line-grey)]">Go back to reading</button>
            </div>
        </div>
    );
}

export default SavedArticles;