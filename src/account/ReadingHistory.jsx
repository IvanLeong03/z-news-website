import React from "react";

function ReadingHistory() {
    return (
        <div className="w-1/2 mx-auto">
            <h1 className="text-2xl font-bold my-4">Reading History</h1>
            <p className="my-2">View your reading history.</p>
            <div className="my-12">
                {/* button to clear history */}
                {/* Placeholder for saved articles list */}
                <p className="my-2">No articles read</p>
                <button className="rounded-xl my-4 px-2 border border-[var(--color-line-grey)]">Go back to reading</button>
            </div>
        </div>
    );

}

export default ReadingHistory;