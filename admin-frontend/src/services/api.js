const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

const getAuthHeadersMultipart = () => {
  const token = localStorage.getItem('token');
  return {
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }
  
  return response.json();
};

export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`, {
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

export const addProduct = async (formData) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: getAuthHeadersMultipart(),
    body: formData // FormData object with images
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to add product');
  }
  
  return response.json();
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete product');
  }
  
  return response.json();
};

export const reduceStock = async (id, quantity) => {
  const response = await fetch(`${API_URL}/products/${id}/reduce-stock`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to reduce stock');
  }
  
  return response.json();
};
