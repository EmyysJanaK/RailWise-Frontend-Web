// src/components/SearchForm.jsx
import React, { useState } from 'react';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    departure: '',
    arrival: '',
    date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for trains:', searchParams);
    // asfgafga logic to fetch train data based on searchParamssvskjjnjnsjdvjsdn
  };

  return (
    <form className="search-form bg-gray-100 p-4 rounded-md shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="departure"
          placeholder="Departure Station"
          value={searchParams.departure}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="arrival"
          placeholder="Arrival Station"
          value={searchParams.arrival}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="date"
          name="date"
          value={searchParams.date}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
