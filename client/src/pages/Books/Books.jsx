import React, { useState, useEffect } from 'react';
import styles from './Books.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';
import BookList from '../../components/BookList/BookList';
import BookForm from '../../components/BookForm/BookForm';

/**
 * Books page component
 * Manages the book list and book form
 * @param {Object} props - Component props
 * @param {Object} props.user - The logged in user object
 * @returns {JSX.Element} The Books page component
 */
const Books = ({ user }) => {
  // State for books list
  const [books, setBooks] = useState([]);
  // State for showing/hiding the book form
  const [showForm, setShowForm] = useState(false);
  // State for the book being edited (null for new books)
  const [editingBook, setEditingBook] = useState(null);
  // State for notification messages
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Fetch books from the server when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  /**
   * Fetches the list of books from the server
   */
  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      
      const data = await response.json();
      // Sort books by title
      const sortedBooks = data.sort((a, b) => a.title.localeCompare(b.title));
      setBooks(sortedBooks);
    } catch (err) {
      console.error('Error fetching books:', err);
      showNotification('Failed to load books. Please try again later.', 'danger');
    }
  };

  /**
   * Handles adding or updating a book
   * @param {Object} bookData - The book data to add or update
   */
  const handleBookSubmit = async (bookData) => {
    try {
      const isEditing = !!bookData.id;
      const url = isEditing ? `/api/books/${bookData.id}` : '/api/books';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to save book');
      }
      
      // Refresh the book list
      fetchBooks();
      
      // Reset the form
      setShowForm(false);
      setEditingBook(null);
      
      // Show success message
      showNotification(
        isEditing ? 'Book updated successfully!' : 'Book added successfully!',
        'success'
      );
    } catch (err) {
      console.error('Error saving book:', err);
      showNotification('Failed to save book. Please try again.', 'danger');
    }
  };

  /**
   * Handles deleting a book
   * @param {number} bookId - The ID of the book to delete
   */
  const handleDeleteBook = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      
      // Refresh the book list
      fetchBooks();
      
      // Show success message
      showNotification('Book deleted successfully!', 'success');
    } catch (err) {
      console.error('Error deleting book:', err);
      showNotification('Failed to delete book. Please try again.', 'danger');
    }
  };

  /**
   * Handles editing a book
   * @param {Object} book - The book to edit
   */
  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  /**
   * Displays a notification message
   * @param {string} message - The message to display
   * @param {string} type - The type of notification ('success' or 'danger')
   */
  const showNotification = (message, type) => {
    setNotification({ message, type });
    
    // Clear notification after 5 seconds
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 5000);
  };

  return (
    <div className={styles.booksPage}>
      <Header />
      
      <div className={styles.headerContainer}>
        <Navigation />
        <div>Welcome, {user?.username || 'Guest'}</div>
      </div>
      
      <main className={styles.mainContent}>
        <h1 className={styles.pageTitle}>Book Management</h1>
        
        {notification.message && (
          <div className={`${styles.notification} ${styles[notification.type]}`}>
            {notification.message}
          </div>
        )}
        
        {showForm ? (
          <BookForm 
            book={editingBook}
            onSubmit={handleBookSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingBook(null);
            }}
          />
        ) : (
          <button 
            className={styles.addBookButton}
            onClick={() => setShowForm(true)}
          >
            Add New Book
          </button>
        )}
        
        <div className={styles.bookListContainer}>
          <BookList 
            books={books}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Books;
