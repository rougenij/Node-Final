import React from 'react';
import styles from './BookList.module.css';

/**
 * BookList component for displaying a list of books
 * @param {Object} props - Component props
 * @param {Array} props.books - Array of book objects
 * @param {Function} props.onEdit - Function to handle book editing
 * @param {Function} props.onDelete - Function to handle book deletion
 * @returns {JSX.Element} The BookList component
 */
const BookList = ({ books = [], onEdit, onDelete }) => {
  // If no books are available
  if (books.length === 0) {
    return (
      <div className={styles.emptyMessage}>
        No books available. Add a new book to get started!
      </div>
    );
  }

  return (
    <div className={styles.bookList}>
      <div className={styles.bookListHeader}>
        <div>Title</div>
        <div>Author</div>
        <div>Actions</div>
      </div>
      
      {books.map((book) => (
        <div key={book.id} className={styles.bookItem}>
          <div className={styles.bookTitle}>{book.title}</div>
          <div className={styles.bookAuthor}>{book.author}</div>
          <div className={styles.actionsContainer}>
            <button 
              className={`${styles.actionButton} ${styles.editButton}`}
              onClick={() => onEdit(book)}
              aria-label={`Edit ${book.title}`}
            >
              Edit
            </button>
            <button 
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={() => onDelete(book.id)}
              aria-label={`Delete ${book.title}`}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
