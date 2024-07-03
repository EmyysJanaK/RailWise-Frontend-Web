import axios from 'axios';

const API_URL = '/api/ticket-pricing';

export const getTicketPricings = () => axios.get(API_URL);
export const addTicketPricing = (pricing) => axios.post(API_URL, pricing);
export const updateTicketPricing = (id, pricing) => axios.put(`${API_URL}/${id}`, pricing);
export const deleteTicketPricing = (id) => axios.delete(`${API_URL}/${id}`);
