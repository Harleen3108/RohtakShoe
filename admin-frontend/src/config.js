// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://rohtakshoe.onrender.com/api' 
    : 'http://localhost:5000/api');

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    API_URL,
    ENV: import.meta.env.MODE,
    VITE_API_URL: import.meta.env.VITE_API_URL
  });
}

// Validate API URL
if (!API_URL) {
  console.error('❌ API_URL is not configured!');
}

export { API_URL };
