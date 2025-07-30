import { api } from './api'; // Import your base api.js

export const fetchArticles = async (options = {}) => {
  // Default parameters
  const defaults = {
    limit: 10,       // Default number of articles
    excludeId: null, // Article ID to exclude
    sort: 'newest'   // Default sorting
  };

  // Merge options with defaults
  const params = { ...defaults, ...options };

  // Build query string
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      query.append(key, value);
    }
  });

  try {
    const response = await api.get(`/article?${query.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};



{/*}
import { api } from './api';

export const fetchFeaturedArticle = async () => {
  return api.get('/article/featured');
};

export const fetchArticles = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return api.get(`/article?${query}`);
};

export const fetchArticleById = async (id) => {
  return api.get(`/article/${id}`);
};

export const submitArticleFeedback = async (articleId, feedback) => {
  return api.post(`/article/${articleId}/feedback`, feedback);
};
*/}