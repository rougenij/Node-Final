import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

/**
 * Navigation component for the Book Club application
 * Provides navigation links for the application using React Router
 * @returns {JSX.Element} The Navigation component
 */
const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <NavLink
            to="/"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
            end
          >
            Home
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/books"
            className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
          >
            Books
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
