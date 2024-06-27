//src/pages/HomePage.jsx
import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Footer from '../components/Footer';
import trainImage from '../assets/trainImage.png';

const HomePage = () => {
  return (
    <div className="relative max-w-container mx-auto px-4 py-8">
        <img src={trainImage} alt="Train Background" className="absolute inset-0 w-full h-full object-cover opacity-10 z-0" />

      <div className="home-page">
        <Header />
        <main className="container mx-auto p-4">
          <SearchForm />
          

        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
