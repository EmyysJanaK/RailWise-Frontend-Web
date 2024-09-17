import { render, screen } from '@testing-library/react';
import Contact from '../pages/Contact';
import { BrowserRouter } from 'react-router-dom';

describe('Contact Component', () => {
  test('renders contact page with heading and text', () => {
    render(
      <BrowserRouter>
        <Contact />
      </BrowserRouter>
    );

    // Check if the main heading is present
    const heading = screen.getByText(/Enjoy the finest features with our products/i);
    expect(heading).toBeInTheDocument();

    // Check if the paragraph text is present
    const paragraph = screen.getByText(/We provide all the advantages/i);
    expect(paragraph).toBeInTheDocument();
  });
});
