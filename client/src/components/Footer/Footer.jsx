import React from 'react';
import styles from './Footer.module.css';

/**
 * Footer component for the Book Club application
 * Displays copyright information and credits
 * @returns {JSX.Element} The Footer component
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.text}>Book Club - Your place for literary discussions</p>
        <p className={styles.copyright}>© {currentYear} Book Club. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
