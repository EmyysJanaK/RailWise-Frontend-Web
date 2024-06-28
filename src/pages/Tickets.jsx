import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Tickets = () => {
    return (
        <div>
            <Header />
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Ticket Issuing Page</h1>
            <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label htmlFor="name" style={{ marginBottom: '10px' }}>Name:</label>
                <input type="text" id="name" name="name" style={{ marginBottom: '10px', padding: '5px' }} />

                <label htmlFor="destination" style={{ marginBottom: '10px' }}>Destination:</label>
                <input type="text" id="destination" name="destination" style={{ marginBottom: '10px', padding: '5px' }} />

                <label htmlFor="date" style={{ marginBottom: '10px' }}>Date:</label>
                <input type="date" id="date" name="date" style={{ marginBottom: '10px', padding: '5px' }} />

                <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>Issue Ticket</button>
            </form>
            
            <Footer />
        </div>

    );
};

export default Tickets;