import React, { useState, useEffect } from 'react';
import { fetchPersonalTopics, fetchAllTopics, editTopic } from '../services/profileService';
import { useLanguage } from '../context/LanguageContext';
import { mapFrontendLangToBackend } from '../context/LangConverter';

const MyTopics = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followedTopics, setFollowedTopics] = useState([]);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [allTopics, setAllTopics] = useState([]);

  useEffect(() => {
    const loadTopics = async () => {
      try {
        const backendLang = mapFrontendLangToBackend(language);
        const [followed, all] = await Promise.all([
          fetchPersonalTopics(backendLang),
          fetchAllTopics(backendLang),
        ]);
        setFollowedTopics(followed);
        setSelectedTopics(followed);
        setAllTopics(all);
      } catch (error) {
        console.error("Failed to load topics:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadTopics();
  }, [language]);

  const isSelected = (tag) => selectedTopics.some(t => t.tag === tag);

  const toggleLocalSelection = (topicObj) => {    
    setSelectedTopics(prev =>
      isSelected(topicObj.tag)
        ? prev.filter(t => t.tag !== topicObj.tag)
        : [...prev, topicObj]
    );
  };

  const handleSaveChanges = async () => {
    const backendLang = mapFrontendLangToBackend(language);
    const originalTags = followedTopics.map(t => t.tag);
    const newTags = selectedTopics.map(t => t.tag);

    const toAdd = selectedTopics.filter(t => !originalTags.includes(t.tag));
    const toRemove = followedTopics.filter(t => !newTags.includes(t.tag));

    try {
      await Promise.all([
        ...toAdd.map(t => editTopic('ADD', t.tag, backendLang)),
        ...toRemove.map(t => editTopic('DELETE', t.tag, backendLang)),
      ]);
      setFollowedTopics(selectedTopics); // sync state
    } catch (err) {
      setError("Failed to save changes.");
    }
  };

  return (
    <div className='min-h-[80dvh]'>
      <div className="max-w-[500px] mx-auto my-8 p-6 border border-[#ddd] rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          {language === "zh-Hant" ? "選擇追蹤主題" : language === "zh-Hans" ? "选择追踪主题" : "Choose topics to follow"}
        </h2>
        <p className='text-xs text-gray-500 mb-4'>
          {language === "zh-Hant"
            ? "決定個人推薦頁面中出現的文章"
            : language === "zh-Hans"
            ? "决定个人推荐页面中出现的文章"
            : "This influences the articles we recommend in your ‘For You’ tab."}
        </p>

        {loading ? (
          <p className="text-sm text-gray-500">{language === "zh-Hant" ? "載入中..." : language === "zh-Hans" ? "加载中..." : "Loading..."}</p>
        ) : (
          <div className="space-y-3">
            {allTopics.map((topic) => (
              <label
                key={topic.tag}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <span className="capitalize text-sm">{topic.displayName}</span>
                <input
                  type="checkbox"
                  checked={isSelected(topic.tag)}
                  onChange={() => toggleLocalSelection(topic)}
                  className="accent-[var(--color-dark-turquoise)] w-4 h-4"
                />
              </label>
            ))}
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <button
          onClick={handleSaveChanges}
          className="mt-6 w-full bg-[var(--color-dark-turquoise)] hover:brightness-75 text-white py-2 rounded-lg"
        >
          {language === "zh-Hant" ? "儲存變更" : language === "zh-Hans" ? "保存更改" : "Save Changes"}
        </button>

      </div>
    </div>
  );
};

export default MyTopics;
