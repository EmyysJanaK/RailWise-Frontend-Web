import React from 'react';

const Contact = () => {
    return (
        <div>
            <h1 style={{ fontSize: '3rem', color: 'blue', textShadow: '2px 2px 4px #000000' }}>Contact Us</h1>
            <form>
                <label htmlFor="name" style={{ fontSize: '1.5rem', color: 'purple' }}>Name:</label>
                <input type="text" id="name" name="name" style={{ fontSize: '1.2rem', backgroundColor: 'lightgray', borderRadius: '5px' }} />

                <label htmlFor="email" style={{ fontSize: '1.5rem', color: 'purple' }}>Email:</label>
                <input type="email" id="email" name="email" style={{ fontSize: '1.2rem', backgroundColor: 'lightgray', borderRadius: '5px' }} />

                <label htmlFor="message" style={{ fontSize: '1.5rem', color: 'purple' }}>Message:</label>
                <textarea id="message" name="message" rows="4" style={{ fontSize: '1.2rem', backgroundColor: 'lightgray', borderRadius: '5px' }} />

                <button type="submit" style={{ fontSize: '1.5rem', backgroundColor: 'green', color: 'white', borderRadius: '5px', padding: '10px 20px', boxShadow: '2px 2px 4px #000000' }}>Submit</button>
            </form>

            <h2 style={{ fontSize: '2rem', color: 'purple', textShadow: '2px 2px 4px #000000' }}>FAQ</h2>
            <ul>
                <li style={{ fontSize: '1.5rem', color: 'orange', backgroundColor: 'lightyellow', borderRadius: '5px', padding: '5px', boxShadow: '2px 2px 4px #000000' }}>Question 1: Lorem ipsum dolor sit amet?</li>
                <li style={{ fontSize: '1.5rem', color: 'orange', backgroundColor: 'lightyellow', borderRadius: '5px', padding: '5px', boxShadow: '2px 2px 4px #000000' }}>Question 2: Consectetur adipiscing elit?</li>
                <li style={{ fontSize: '1.5rem', color: 'orange', backgroundColor: 'lightyellow', borderRadius: '5px', padding: '5px', boxShadow: '2px 2px 4px #000000' }}>Question 3: Sed do eiusmod tempor incididunt?</li>
            </ul>

            <h2 style={{ fontSize: '2rem', color: 'orange', textShadow: '2px 2px 4px #000000' }}>Opinion Box</h2>
            <textarea id="opinion" name="opinion" rows="4" style={{ fontSize: '1.2rem', backgroundColor: 'lightgray', borderRadius: '5px' }} />
            <button type="submit" style={{ fontSize: '1.5rem', backgroundColor: 'blue', color: 'white', borderRadius: '5px', padding: '10px 20px', boxShadow: '2px 2px 4px #000000' }}>Submit Opinion</button>
        </div>
    );
};

export default Contact;