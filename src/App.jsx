// src/App.jsx
import React from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import Tickets from './pages/Tickets';
import About from './pages/About'; // Import the About page component

import Contact from './pages/Contact'; // Import the Contact page component
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <div>
      <Header />
      <Footer />

    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
       
        <Route index element={<HomePage />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        </Route>

    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
    </div>
  );
}


export default App;
