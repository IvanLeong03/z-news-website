import React, { useState, useEffect } from 'react';

const ALL_TOPICS = ['today', 'breakingr', 'politics', 'economy', 'finance', 'technology', 'sport', 'pop culture'];

const MyTopics = () => {
  const [followedTopics, setFollowedTopics] = useState(['today']); // Default topic
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState(ALL_TOPICS);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions(ALL_TOPICS);
    } else {
      setSuggestions(
        ALL_TOPICS.filter(topic => 
          topic.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  const handleFollow = (topic) => {
    if (!followedTopics.includes(topic)) {
      setFollowedTopics([...followedTopics, topic]);
    }
    setSearchTerm('');
  };

  const handleUnfollow = (topic) => {
    setFollowedTopics(followedTopics.filter(t => t !== topic));
  };

  return (
    <div className="max-w-[400px] mx-auto my-8 p-6 border border-[#ddd] rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Choose Topics to Follow</h2>
      <p className='text-xs text-gray-500 mb-4'>
        This influences the articles we recommend in your 'For You' tab.
      </p>

      {/* Search input with autocomplete */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setTimeout(() => setIsInputFocused(false), 200)}
          placeholder="Search topics..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-dark-turquoise)]"
        />
        
        {/* Autocomplete dropdown */}
        {(isInputFocused || searchTerm) && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto border border-gray-200 bg-white rounded-lg shadow-lg">
            {suggestions.map((topic) => (
              !followedTopics.includes(topic) && (
                <li 
                  key={topic}
                  onClick={() => handleFollow(topic)}
                  className="p-3 hover:bg-gray-100 cursor-pointer capitalize"
                >
                  {topic}
                </li>
              )
            ))}
          </ul>
        )}
      </div>

      {/* Followed topics section */}
      <div>
        <h3 className="font-medium mb-3">Following ({followedTopics.length})</h3>
        {followedTopics.length === 0 ? (
          <p className="text-sm text-gray-500">You're not following any topics yet</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {followedTopics.map((topic) => (
              <div 
                key={topic} 
                className="flex items-center bg-[var(--color-light-turquoise)] text-[var(--color-dark-turquoise)] px-3 py-2 rounded-full"
              >
                <span className="mr-1">✓</span>
                <span className="capitalize">{topic}</span>
                <button 
                  onClick={() => handleUnfollow(topic)}
                  className="ml-2 text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTopics;