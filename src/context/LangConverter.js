function mapFrontendLangToBackend(lang) {
  const langMap = {
    'zh-Hant': 'zh-HK', // Traditional Chinese → Hong Kong fallback
    'zh-Hans': 'zh-CN', // Simplified Chinese → Mainland China
    'en': 'en-UK',
  };
  return langMap[lang] || 'en-UK'; // Default fallback
}

export { mapFrontendLangToBackend };