import React, { useState } from 'react';

const ALL_TOPICS = ['today', 'economy', 'politics', 'sport', 'finance'];

const MyTopics = () => {
    // 'today' is followed by default for new accounts
    const [followedTopics, setFollowedTopics] = useState(['today']);

    const handleToggle = (topic) => {
        setFollowedTopics((prev) =>
            prev.includes(topic)
                ? prev.filter((t) => t !== topic)
                : [...prev, topic]
        );
    };

    return (
        <div className="max-w-[400px] mx-auto my-8 p-6 border border-[#ddd] rounded-lg">
            <h2>Choose Topics to Follow</h2>
            <ul className="list-none p-0">
                {ALL_TOPICS.map((topic) => (
                    <li key={topic} className="my-3 flex items-center">
                        <input
                            type="checkbox"
                            checked={followedTopics.includes(topic)}
                            onChange={() => handleToggle(topic)}
                            id={`topic-${topic}`}
                        />
                        <label htmlFor={`topic-${topic}`} className="ml-2 capitalize">
                            {topic} 
                        </label>
                    </li>
                ))}
            </ul>
            <button className='mt-24 py-4 px-8 rounded-lg bg-[var(--color-dark-turquoise)]'                
                onClick={() => alert('Topics updated!')}
            >
                Update
            </button>
        </div>
    );
};

export default MyTopics;
