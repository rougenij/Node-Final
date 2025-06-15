import React, { useState } from 'react';
import styles from './AuthForm.module.css';

/**
 * AuthForm component for handling user authentication
 * Supports both login and registration modes
 * @param {Object} props - Component props
 * @param {string} props.mode - 'login' or 'register'
 * @param {Function} props.onSubmit - Function to handle form submission
 * @param {Function} props.onSwitchMode - Function to switch between login and register modes
 * @param {string} props.error - Error message to display
 * @returns {JSX.Element} The AuthForm component
 */
const AuthForm = ({ mode = 'login', onSubmit, onSwitchMode, error }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    password: ''
  });

  /**
   * Validates the form input fields
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: ''
    };

    // Name validation - letters only, at least 2 characters
    if (!/^[a-zA-Z]{2,}$/.test(formData.name)) {
      newErrors.name = 'Name must contain only letters and be at least 2 characters long';
      isValid = false;
    }

    // Email validation (only for registration)
    if (mode === 'register' && formData.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    // Password validation - alphanumeric, 3-8 characters, at least 1 letter and 1 number
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{3,8}$/.test(formData.password)) {
      newErrors.password = 'Password must be 3-8 characters with at least one letter and one number';
      isValid = false;
    }

    setValidationErrors(newErrors);
    return isValid;
  };

  /**
   * Handles form input changes
   * @param {Event} e - The input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  /**
   * Handles form submission
   * @param {Event} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>
        {mode === 'login' ? 'Login to Book Club' : 'Create an Account'}
      </h2>
      
      {error && (
        <div className={`${styles.notification} ${styles.danger}`}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
          {validationErrors.name && (
            <p className={styles.error}>{validationErrors.name}</p>
          )}
        </div>
        
        {mode === 'register' && (
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {validationErrors.email && (
              <p className={styles.error}>{validationErrors.email}</p>
            )}
          </div>
        )}
        
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={formData.password}
            onChange={handleChange}
            required
          />
          {validationErrors.password && (
            <p className={styles.error}>{validationErrors.password}</p>
          )}
        </div>
        
        <button type="submit" className={styles.submitButton}>
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      
      <div className={styles.switchMode}>
        {mode === 'login' ? (
          <p>
            Don't have an account?{' '}
            <button 
              type="button"
              className={styles.switchModeLink}
              onClick={() => onSwitchMode('register')}
            >
              Register
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button 
              type="button"
              className={styles.switchModeLink}
              onClick={() => onSwitchMode('login')}
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
