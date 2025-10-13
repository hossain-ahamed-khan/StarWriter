// lib/api-client.ts

export const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API || 'http://10.10.7.85:9005/api';

// Internal helper to safely parse JSON
async function readJsonSafe(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return { _raw: text, status: 'error', message: 'Non-JSON response' };
  }
}

// Helper to build URL correctly
function buildUrl(endpoint: string): string {
  const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
}

// ✅ FIXED: Custom error class with proper TypeScript initialization
class APIError extends Error {
  public response!: {  // ✅ Added ! to tell TypeScript it will be initialized
    status: number;
    data: any;
  };

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = 'APIError';
    
    // ✅ Make response enumerable so it shows in console
    Object.defineProperty(this, 'response', {
      value: { status, data },
      writable: true,
      enumerable: true,
      configurable: true
    });
    
    // ✅ Maintain proper prototype chain
    Object.setPrototypeOf(this, APIError.prototype);
  }
}

export const apiClient = {
  baseURL: API_BASE_URL,

  async get(endpoint: string) {
    const url = buildUrl(endpoint);
    console.log('🔗 GET:', url);

    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    const data = await readJsonSafe(response);

    if (!response.ok) {
      console.error('❌ GET Error:', { status: response.status, data });
      const error = new APIError(
        data.message || data.user_message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
      throw error;
    }

    return data;
  },

  async post(endpoint: string, body: any) {
    const url = buildUrl(endpoint);
    console.log('🔗 POST:', url, 'Body:', body);

    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(body),
    });

    const data = await readJsonSafe(response);
    console.log('📦 POST Response:', { status: response.status, data });

    if (!response.ok) {
      console.error('❌ POST Error:', { status: response.status, data });
      const error = new APIError(
        data.message || data.user_message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
      throw error;
    }

    return data;
  },

  async put(endpoint: string, body: any) {
    const url = buildUrl(endpoint);
    console.log('🔗 PUT:', url, 'Body:', body);

    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(body),
    });

    const data = await readJsonSafe(response);

    if (!response.ok) {
      console.error('❌ PUT Error:', { status: response.status, data });
      const error = new APIError(
        data.message || data.user_message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
      throw error;
    }

    return data;
  },

  async delete(endpoint: string) {
    const url = buildUrl(endpoint);
    console.log('🔗 DELETE:', url);

    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    const data = await readJsonSafe(response);

    if (!response.ok) {
      console.error('❌ DELETE Error:', { status: response.status, data });
      const error = new APIError(
        data.message || data.user_message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
      throw error;
    }

    return data;
  },

  async patch(endpoint: string, body: any) {
    const url = buildUrl(endpoint);
    console.log('🔗 PATCH:', url, 'Body:', body);

    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(body),
    });

    const data = await readJsonSafe(response);

    if (!response.ok) {
      console.error('❌ PATCH Error:', { status: response.status, data });
      const error = new APIError(
        data.message || data.user_message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
      throw error;
    }

    return data;
  },
};
