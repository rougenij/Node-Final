import React from 'react';
import styles from './Header.module.css';

/**
 * Header component for the Book Club application
 * Displays the site logo and title
 * @returns {JSX.Element} The Header component
 */
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#" className={styles.logo}>
          <span className={styles.logoIcon}>📚</span>
          Book Club
        </a>
      </div>
    </header>
  );
};

export default Header;
