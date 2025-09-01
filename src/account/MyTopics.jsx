import React, { useState, useEffect } from 'react';
import { fetchPersonalTopics, fetchAllTopics, editTopic } from '../services/profileService';
import { useLanguage } from '../context/LanguageContext';
import { mapFrontendLangToBackend } from '../context/LangConverter';

const MyTopics = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followedTopics, setFollowedTopics] = useState([]); // Default topic
  const [allTopics, setAllTopics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState(allTopics);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Fetch user's followed topics
  useEffect(() => {
    const loadFollowedTopics = async () => {
      try {
          const backendLang = mapFrontendLangToBackend(language);
          const followedTopics = await fetchPersonalTopics(backendLang);
          setFollowedTopics(followedTopics);
      } catch (error) {
          console.error("Failed to load topics:", error);
          setError(error.message);
      } finally {
          setLoading(false);
      }
    };        
    loadFollowedTopics();
  }, [language]);

  useEffect(() => {
    const loadAllTopics = async () => {
      try {
          const backendLang = mapFrontendLangToBackend(language);
          const AllTopics = await fetchAllTopics(backendLang);
          setAllTopics(AllTopics);
      } catch (error) {
          console.error("Failed to load topics:", error);
          setError(error.message);
      } finally {
          setLoading(false);
      }
    };        
    loadAllTopics();
  }, [language]);

  // Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions(allTopics);
    } else {
      setSuggestions(
        allTopics.filter(topic => 
          topic.tag.includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);

  const handleFollow = async (topicObj) => {
    try {
      const backendLang = mapFrontendLangToBackend(language);
      await editTopic('ADD', topicObj.tag, backendLang);
      if (!followedTopics.some(t => t.tag === topicObj.tag)) {
        setFollowedTopics([...followedTopics, topicObj]);
      }
      setSearchTerm('');
    } catch (err) {
      console.error(`Failed to follow topic ${topicObj.tag}:`, err);
      setError(`Could not follow topic: ${topicObj.displayName}`);
    }
  };

  const handleUnfollow = async (topicObj) => {
    try {
      const backendLang = mapFrontendLangToBackend(language);
      await editTopic('DELETE', topicObj.tag, backendLang);
      setFollowedTopics(followedTopics.filter(t => t.tag !== topicObj.tag));
    } catch (err) {
      console.error(`Failed to unfollow topic ${topicObj.tag}:`, err);
      setError(`Could not unfollow topic: ${topicObj.displayName}`);
    }
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
                  key={topic.tag}
                  onClick={() => handleFollow(topic)}
                  className="p-3 hover:bg-gray-100 cursor-pointer capitalize"
                >
                  {topic.displayName}
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
                key={topic.tag} 
                className="flex items-center bg-[var(--color-light-turquoise)] text-[var(--color-dark-turquoise)] px-3 py-2 rounded-full"
              >
                <span className="mr-1">✓</span>
                <span className="capitalize">{topic.displayName}</span>
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