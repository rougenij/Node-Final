/**
 * API utility functions for making requests to the server
 * All API calls are centralized here for better maintainability
 */

/**
 * Base URL for API requests
 * In development, this will be proxied to the backend server
 */
const API_BASE_URL = '/api';

/**
 * Makes a fetch request with the appropriate headers and error handling
 * @param {string} endpoint - The API endpoint to fetch from
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} The response data
 * @throws {Error} If the request fails
 */
const fetchWithAuth = async (endpoint, options = {}) => {
  // Ensure credentials are included for authentication cookies
  const fetchOptions = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, fetchOptions);
  
  // Parse the JSON response
  const data = await response.json();
  
  // If the response is not ok, throw an error with the message from the server
  if (!response.ok) {
    throw new Error(data.message || 'An error occurred');
  }
  
  return data;
};

/**
 * API object with methods for different endpoints
 */
const api = {
  /**
   * Authentication API methods
   */
  auth: {
    /**
     * Login a user
     * @param {Object} credentials - User credentials
     * @returns {Promise<Object>} User data
     */
    login: (credentials) => fetchWithAuth('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    
    /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @returns {Promise<Object>} Registration result
     */
    register: (userData) => fetchWithAuth('/users/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
    
    /**
     * Logout the current user
     * @returns {Promise<Object>} Logout result
     */
    logout: () => fetchWithAuth('/users/logout', {
      method: 'POST',
    }),
  },
  
  /**
   * Books API methods
   */
  books: {
    /**
     * Get all books
     * @returns {Promise<Array>} Array of books
     */
    getAll: () => fetchWithAuth('/books'),
    
    /**
     * Get a book by ID
     * @param {number} id - Book ID
     * @returns {Promise<Object>} Book data
     */
    getById: (id) => fetchWithAuth(`/books/${id}`),
    
    /**
     * Create a new book
     * @param {Object} bookData - Book data
     * @returns {Promise<Object>} Created book
     */
    create: (bookData) => fetchWithAuth('/books', {
      method: 'POST',
      body: JSON.stringify(bookData),
    }),
    
    /**
     * Update a book
     * @param {number} id - Book ID
     * @param {Object} bookData - Updated book data
     * @returns {Promise<Object>} Updated book
     */
    update: (id, bookData) => fetchWithAuth(`/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookData),
    }),
    
    /**
     * Delete a book
     * @param {number} id - Book ID
     * @returns {Promise<Object>} Deletion result
     */
    delete: (id) => fetchWithAuth(`/books/${id}`, {
      method: 'DELETE',
    }),
  },
};

export default api;
