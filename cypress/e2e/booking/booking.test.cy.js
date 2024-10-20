import 'cypress-iframe';
describe('Train Booking Flow with Seat Selection', () => {
    it('Should successfully book a seat and pay', () => {
      // Step 1: Visit the home page
      cy.visit('http://localhost:5173');
  
      // Step 2: Fill out the form on the home page

      // Calculate the next Monday
      const today = new Date();
      const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, etc.
      const daysUntilNextMonday = (8 - dayOfWeek) % 7; // Days until the next Monday
      const nextMonday = new Date(today);
      nextMonday.setDate(today.getDate() + daysUntilNextMonday);

      // Format the date to "YYYY-MM-DD"
      const formattedNextMonday = nextMonday.toISOString().split('T')[0];


      cy.get('input[name="departure"]').type('Beliaththa');
      cy.get('input[name="arrival"]').type('Maradana');
      cy.wait(600);
      cy.get('input[name="seat"]').clear().type('1');
      cy.get('input[name="date"]').type(formattedNextMonday);

  
      // Step 3: Click the "Search" button to navigate to the results page
      cy.get('.searchButton').click();
  
      // Step 4: Select the "Galu Kumari" option on the results page
      cy.contains('Galu Kumari', {timeout:10000}).should('be.visible').click();

      cy.get('button').contains('Continue Without Login').click();
  
      // Step 5: On the options page, choose a class and click "Next"
      cy.contains('SECOND').click(); // Selecting second class as an example
      cy.get('button').contains('Next').click();
  
      // Step 6: On the seat selection page, choose allowed seats
      cy.get('.bg-white.cursor-pointer').first().click(); 
  
      // Step 7: Enter email and enable the "Proceed to payment" button
      cy.get('input[type="email"]').type('mongalburuwa@gmail.com');
      cy.get('button').contains('Proceed to payment').click();
  
      // // Step 8: On the payment page, fill out card information
      // cy.origin('https://js.stripe.com', () => {
      //   cy.get('input[name="cardnumber"]').type('4242424242424242');
      //   cy.get('input[name="exp-date"]').type('12/24');
      //   cy.get('input[name="cvc"]').type('123');
      //   cy.get('input[name="postal"]').type('70100');
      // });

  
      // // Step 9: Click "Pay Now" to complete the process
      // cy.get('button').contains('Pay Now').click();
  
      // // Step 10: Assert that we are on the success page
      // cy.contains('Payment Successful', { timeout: 10000 }).should('be.visible');
  
      // // Step 11: Wait for redirection back to the home page
      // cy.wait(6000); // Wait for the page to redirect automatically
      // cy.url().should('eq', 'http://localhost:5173/');
    });
  });
  