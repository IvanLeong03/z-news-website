// Base API configuration
const API_BASE_URL = 'http://127.0.0.1:5000';
const API_PREFIX = '/dev'; // Matches your Flask PATH_PREFIX

// Generic fetch wrapper with auth handling
export const fetchWithAuth = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${API_PREFIX}${endpoint}`;
  const authToken = localStorage.getItem('authToken'); // Or your token storage

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const config = {
    ...options,
    headers,
    credentials: 'include', // For JWT cookies
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    
    // Handle specific error cases
    if (error.message.includes('401')) {
      // Trigger logout flow
      window.dispatchEvent(new Event('unauthorized'));
    }
    
    throw error;
  }
};

// HTTP method shortcuts
export const api = {
  get: (endpoint) => fetchWithAuth(endpoint),
  post: (endpoint, body) => fetchWithAuth(endpoint, { 
    method: 'POST', 
    body: JSON.stringify(body) 
  }),
  put: (endpoint, body) => fetchWithAuth(endpoint, { 
    method: 'PUT', 
    body: JSON.stringify(body) 
  }),
  delete: (endpoint) => fetchWithAuth(endpoint, { method: 'DELETE' }),
};

// JWT helpers
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const clearAuthToken = () => {
  localStorage.removeItem('authToken');
};