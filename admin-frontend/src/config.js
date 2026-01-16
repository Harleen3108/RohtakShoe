// API Configuration
// Force production URL when not in development mode
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:5000/api'
  : (import.meta.env.VITE_API_URL || 'https://rohtakshoe.onrender.com/api');

// Log configuration
console.log('🔧 API Configuration:', {
  API_URL,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  VITE_API_URL: import.meta.env.VITE_API_URL
});

export { API_URL };
