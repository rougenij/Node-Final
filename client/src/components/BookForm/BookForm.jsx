import React, { useState, useEffect } from 'react';
import styles from './BookForm.module.css';

/**
 * BookForm component for adding or editing books
 * @param {Object} props - Component props
 * @param {Object} props.book - Book data for editing (null for new books)
 * @param {Function} props.onSubmit - Function to handle form submission
 * @param {Function} props.onCancel - Function to handle form cancellation
 * @returns {JSX.Element} The BookForm component
 */
const BookForm = ({ book = null, onSubmit, onCancel }) => {
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: ''
  });
  
  // Form validation errors
  const [validationErrors, setValidationErrors] = useState({
    title: '',
    author: '',
    description: ''
  });

  // Initialize form with book data if editing
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || ''
      });
    }
  }, [book]);

  /**
   * Validates the form input fields
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      author: '',
      description: ''
    };

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    // Author validation
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
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
      onSubmit({
        ...formData,
        id: book ? book.id : null
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>
        {book ? 'Edit Book' : 'Add New Book'}
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className={styles.input}
            value={formData.title}
            onChange={handleChange}
            required
          />
          {validationErrors.title && (
            <p className={styles.error}>{validationErrors.title}</p>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="author" className={styles.label}>Author</label>
          <input
            type="text"
            id="author"
            name="author"
            className={styles.input}
            value={formData.author}
            onChange={handleChange}
            required
          />
          {validationErrors.author && (
            <p className={styles.error}>{validationErrors.author}</p>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <textarea
            id="description"
            name="description"
            className={styles.textarea}
            value={formData.description}
            onChange={handleChange}
          />
          {validationErrors.description && (
            <p className={styles.error}>{validationErrors.description}</p>
          )}
        </div>
        
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            {book ? 'Update Book' : 'Add Book'}
          </button>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
