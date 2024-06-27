//src/pages/HomePage.jsx
import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <main className="container mx-auto p-4">
        <SearchForm />
        

      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
