import React from 'react';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';
import Footer from '../components/Footer';
import trainImage from '../assets/trainImage.png';

const HomePage = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <img 
        src={trainImage} 
        alt="Train Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0" 
      />

      <div className="relative z-10 flex-1">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex flex-col items-center justify-center flex-1 p-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">Welcome to TrailWise</h1>
            <p className="text-lg text-gray-700 mt-2">Book your train tickets easily and quickly with our platform.</p>
          </div>
          <SearchForm />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
