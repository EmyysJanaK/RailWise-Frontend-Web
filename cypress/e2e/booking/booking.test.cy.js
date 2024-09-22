describe('Train Booking Flow with Seat Selection', () => {
    it('Should successfully book a seat and pay', () => {
      // Step 1: Visit the home page
      cy.visit('http://localhost:5173');
  
      // Step 2: Fill out the form on the home page
      cy.get('input[name="departure"]').type('Beliaththa');
      cy.get('input[name="arrival"]').type('Maradana');
      cy.get('input[name="seat"]').clear().type('1');
      cy.get('input[name="date"]').type('2024-09-23');

  
      // Step 3: Click the "Search" button to navigate to the results page
      cy.get('.searchButton').click();
  
      // Step 4: Select the "Galu Kumari" option on the results page
      cy.contains('Galu Kumari').click();
  
      // Step 5: On the options page, choose a class and click "Next"
      cy.contains('SECOND').click(); // Selecting second class as an example
      cy.get('button').contains('Next').click();
  
      // Step 6: On the seat selection page, choose allowed seats
      cy.get('.bg-white.cursor-pointer').first().click(); 
  
      // Step 7: Enter email and enable the "Proceed to payment" button
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('button').contains('Proceed to payment').click();
  
      // Step 8: On the payment page, fill out card information
      cy.get('input[id="cardHolderName"]').type('Test User');
      cy.get('input[id="cardNumber"]').type('4111111111111111'); // Dummy card number
      cy.get('input[id="expiryDate"]').type('12/24'); // Expiry date
      cy.get('input[id="cvv"]').type('123'); // CVV
  
      // Step 9: Click "Pay Now" to complete the process
      cy.get('button').contains('Pay Now').click();
  
      // Step 10: Assert that we are on the success page
      cy.contains('Payment Successful', { timeout: 10000 }).should('be.visible');
  
      // Step 11: Wait for redirection back to the home page
      cy.wait(6000); // Wait for the page to redirect automatically
      cy.url().should('eq', 'http://localhost:5173/');
    });
  });
  