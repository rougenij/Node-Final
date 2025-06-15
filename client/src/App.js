import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Books from './pages/Books/Books';

/**
 * Main App component
 * Handles routing and authentication state using React Router
 * @returns {JSX.Element} The App component
 * 
 * Developed by: [Your Name] and [Partner's Name]
 */
function App() {
  // Authentication state
  const [user, setUser] = useState(null);
  // Loading state
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Try to get user data from session storage first
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Error checking auth status:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /**
   * Handles successful login
   * @param {Object} userData - The logged in user data
   */
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    // Store user data in session storage
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * Handles logout
   */
  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      // Clear user data from state and session storage
      setUser(null);
      sessionStorage.removeItem('user');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  // Show loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Create a protected route component
  const ProtectedRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/auth" replace />;
    return children;
  };

  // Render the app with React Router
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/auth" element={
            user ? <Navigate to="/" replace /> : <Auth onLoginSuccess={handleLoginSuccess} />
          } />
          
          <Route path="/" element={
            <ProtectedRoute>
              <Home user={user} />
            </ProtectedRoute>
          } />
          
          <Route path="/books" element={
            <ProtectedRoute>
              <Books user={user} />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {/* Logout button - only show when user is logged in */}
        {user && (
          <button 
            onClick={handleLogout}
            style={{
              position: 'fixed',
              top: '10px',
              right: '10px',
              background: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 12px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        )}
      </div>
    </Router>
  );
}

export default App;
