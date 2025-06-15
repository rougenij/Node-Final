import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import Footer from '../../components/Footer/Footer';

/**
 * Auth page component for handling user authentication
 * Includes both login and registration functionality
 * @param {Object} props - Component props
 * @param {Function} props.onLoginSuccess - Function to call when login is successful
 * @returns {JSX.Element} The Auth page component
 */
const Auth = ({ onLoginSuccess }) => {
  // Current authentication mode (login or register)
  const [mode, setMode] = useState('login');
  // Error message from server
  const [error, setError] = useState('');
  // React Router navigation hook
  const navigate = useNavigate();

  /**
   * Handles form submission for both login and registration
   * @param {Object} formData - The form data submitted
   */
  const handleSubmit = async (formData) => {
    try {
      // Use absolute URL with correct port
      const baseUrl = 'http://localhost:5000';
      const endpoint = mode === 'login' ? `${baseUrl}/api/users/login` : `${baseUrl}/api/users/register`;
      
      console.log(`Attempting ${mode} with:`, formData);
      
      // Simplify the request to avoid header size issues
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      console.log(`${mode} response status:`, response.status);
      
      // Handle potential empty response
      const text = await response.text();
      let data = {};
      
      try {
        if (text) {
          data = JSON.parse(text);
        }
        console.log(`${mode} response data:`, data);
      } catch (parseError) {
        console.error('Error parsing JSON response:', parseError);
      }
      
      if (!response.ok) {
        setError(data.message || 'An error occurred');
        console.error(`${mode} error:`, data.message);
        return;
      }
      
      if (mode === 'login') {
        // If login was successful, call the onLoginSuccess function
        console.log('Login successful, user data:', data.user);
        onLoginSuccess(data.user);
        
        // Navigate to the home page after successful login
        navigate('/');
      } else {
        // If registration was successful, switch to login mode
        console.log('Registration successful, switching to login mode');
        setError('');
        // Show a success message before switching to login mode
        setError(data.message || 'Registration successful! You can now log in.');
        setTimeout(() => {
          setMode('login');
          setError('');
        }, 1500);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      console.error('Auth error:', err);
    }
  };

  /**
   * Switches between login and register modes
   * @param {string} newMode - The new mode to switch to
   */
  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setError('');
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        <div>
          <h1 className={styles.appTitle}>Book Club</h1>
          <p className={styles.appDescription}>
            Join our community of book lovers to discover, share, and discuss your favorite books.
          </p>
          
          <AuthForm
            mode={mode}
            onSubmit={handleSubmit}
            onSwitchMode={handleSwitchMode}
            error={error}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;
