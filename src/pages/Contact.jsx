import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("HomePage");

  useEffect(() => {
    if (location.state && location.state.data) {
      setPrevLocation(location.state.data);
    }
  }, [location]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    alert('Thank you for your message!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Breadcrumbs title="Contact" prevLocation={prevLocation} />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Contact Us</h2>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:w-1/2 md:pr-8">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="mb-4">We'd love to hear from you! Please fill out the form below and we'll get in touch with you as soon as possible.</p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  rows="4"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300 focus:outline-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="mt-12 md:mt-0 md:w-1/2 md:pl-8">
            <h3 className="text-2xl font-bold mb-4">Customer Service</h3>
            <p className="mb-4">For immediate assistance, you can reach our customer service team through the following methods:</p>
            <div className="mb-4">
              <FaPhoneAlt className="inline mr-2 text-blue-500" /> <span>+123 456 7890</span>
            </div>
            <div className="mb-4">
              <FaEnvelope className="inline mr-2 text-blue-500" /> <span>support@trailwise.com</span>
            </div>
            <div className="mb-4">
              <FaMapMarkerAlt className="inline mr-2 text-blue-500" /> <span>123 Railway St, Colombo, Sri Lanka</span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-700">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-4">Feedback</h3>
          <p>We value your feedback and suggestions. Please let us know how we can improve our services to better meet your needs.</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
