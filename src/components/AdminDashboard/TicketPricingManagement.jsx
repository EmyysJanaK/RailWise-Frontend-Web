import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketPricingManagement = () => {
  const [ticketPricings, setTicketPricings] = useState([]);
  const [newTicketPricing, setNewTicketPricing] = useState({
    route: '',
    class: '',
    price: '',
  });
  const [editingTicketPricing, setEditingTicketPricing] = useState(null);

  useEffect(() => {
    // Fetch ticket pricing details from backend API
    axios.get('/api/ticket-pricing')
      .then(response => setTicketPricings(response.data))
      .catch(error => console.error('Error fetching ticket pricing details:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTicketPricing({ ...newTicketPricing, [name]: value });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTicketPricing({ ...editingTicketPricing, [name]: value });
  };

  const handleAddTicketPricing = () => {
    axios.post('/api/ticket-pricing', newTicketPricing)
      .then(response => {
        setTicketPricings([...ticketPricings, response.data]);
        setNewTicketPricing({ route: '', class: '', price: '' });
      })
      .catch(error => console.error('Error adding ticket pricing:', error));
  };

  const handleEditTicketPricing = () => {
    axios.put(`/api/ticket-pricing/${editingTicketPricing.id}`, editingTicketPricing)
      .then(response => {
        setTicketPricings(ticketPricings.map(pricing => pricing.id === editingTicketPricing.id ? response.data : pricing));
        setEditingTicketPricing(null);
      })
      .catch(error => console.error('Error editing ticket pricing:', error));
  };

  const handleDeleteTicketPricing = (id) => {
    axios.delete(`/api/ticket-pricing/${id}`)
      .then(() => {
        setTicketPricings(ticketPricings.filter(pricing => pricing.id !== id));
      })
      .catch(error => console.error('Error deleting ticket pricing:', error));
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Ticket Pricing Management</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Add New Ticket Pricing</h2>
        <input
          type="text"
          name="route"
          value={newTicketPricing.route}
          onChange={handleInputChange}
          placeholder="Route"
          className="form-input mb-2"
        />
        <input
          type="text"
          name="class"
          value={newTicketPricing.class}
          onChange={handleInputChange}
          placeholder="Class"
          className="form-input mb-2"
        />
        <input
          type="number"
          name="price"
          value={newTicketPricing.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="form-input mb-2"
        />
        <button
          onClick={handleAddTicketPricing}
          className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Ticket Pricing
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Manage Ticket Pricing</h2>
        {ticketPricings.map(pricing => (
          <div key={pricing.id} className="mb-4 p-4 border rounded-md shadow-sm flex justify-between items-center">
            {editingTicketPricing && editingTicketPricing.id === pricing.id ? (
              <div className="flex-1">
                <input
                  type="text"
                  name="route"
                  value={editingTicketPricing.route}
                  onChange={handleEditChange}
                  placeholder="Route"
                  className="form-input mb-2 mr-2"
                />
                <input
                  type="text"
                  name="class"
                  value={editingTicketPricing.class}
                  onChange={handleEditChange}
                  placeholder="Class"
                  className="form-input mb-2 mr-2"
                />
                <input
                  type="number"
                  name="price"
                  value={editingTicketPricing.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                  className="form-input mb-2 mr-2"
                />
                <button
                  onClick={handleEditTicketPricing}
                  className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingTicketPricing(null)}
                  className="py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex-1">
                <p className="font-semibold">{pricing.route}</p>
                <p>{pricing.class}</p>
                <p className="text-gray-600">{pricing.price}</p>
              </div>
            )}
            {!editingTicketPricing && (
              <div>
                <button
                  onClick={() => setEditingTicketPricing(pricing)}
                  className="py-2 px-4 bg-yellow-600 text-white font-semibold rounded-md shadow hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTicketPricing(pricing.id)}
                  className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketPricingManagement;
