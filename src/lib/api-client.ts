// lib/api-client.ts

export const API_BASE_URL = '/api/proxy';

export const apiClient = {
  baseURL: API_BASE_URL,
  
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    const data = await response.json();
    
    // Check both HTTP status and API response status
    if (!response.ok || data.status === 'error') {
      const error: any = new Error(data.message || 'API request failed');
      error.response = {
        status: response.status,
        data: data
      };
      throw error;
    }
    
    return data;
  },
  
  async post(endpoint: string, body: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    console.log('📦 API Response Data:', data); // Debug log
    console.log('🔍 Response status:', data.status); // Debug log
    console.log('❓ Is error?:', data.status === 'error'); // Debug log
    
    // Check both HTTP status and API response status
    if (!response.ok || data.status === 'error') {
      console.log('🚨 Throwing error with message:', data.message); // Debug log
      const error: any = new Error(data.message || 'API request failed');
      error.response = {
        status: response.status,
        data: data
      };
      throw error;
    }
    
    return data;
  },
  
  async put(endpoint: string, body: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    // Check both HTTP status and API response status
    if (!response.ok || data.status === 'error') {
      const error: any = new Error(data.message || 'API request failed');
      error.response = {
        status: response.status,
        data: data
      };
      throw error;
    }
    
    return data;
  },
  
  async delete(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    
    // Check both HTTP status and API response status
    if (!response.ok || data.status === 'error') {
      const error: any = new Error(data.message || 'API request failed');
      error.response = {
        status: response.status,
        data: data
      };
      throw error;
    }
    
    return data;
  },
};
