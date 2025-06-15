import React from 'react';
import styles from './Home.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Navigation from '../../components/Navigation/Navigation';

/**
 * Home page component
 * Displays welcome information and project details
 * @param {Object} props - Component props
 * @param {Object} props.user - The logged in user object
 * @returns {JSX.Element} The Home page component
 */
const Home = ({ user }) => {
  return (
    <div className={styles.homePage}>
      <Header />
      
      <div className={styles.headerContainer}>
        <Navigation />
        <div>Welcome, {user?.username || 'Guest'}</div>
      </div>
      
      <main className={styles.mainContent}>
        <section className={styles.welcomeSection}>
          <h1 className={styles.welcomeTitle}>Welcome to Book Club</h1>
          <p className={styles.welcomeText}>
            Book Club is a platform for book enthusiasts to discover, share, and discuss their favorite books.
            Browse our collection, add your own recommendations, and join the conversation about literature.
          </p>
        </section>
        
        <section className={styles.aboutSection}>
          <div className={styles.aboutCard}>
            <h2 className={styles.aboutTitle}>About the Project</h2>
            <p className={styles.aboutText}>
              This project was created as a final assignment for the Node.js course.
              It demonstrates a full-stack application with React frontend, Express backend, and MySQL database.
              Users can register, login, browse books, and manage their own book recommendations.
            </p>
          </div>
          
          <div className={styles.aboutCard}>
            <h2 className={styles.aboutTitle}>About the Developers</h2>
            <p className={styles.aboutText}>
              This project was developed by [Your Name] and [Partner's Name].
              We are passionate about web development and creating user-friendly applications.
              This project showcases our skills in React, Node.js, Express, and MySQL.
            </p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
