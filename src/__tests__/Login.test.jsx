import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFormInput from '../hooks/useFormInput';

// Mock the custom hooks used in the component
vi.mock('../hooks/useAuth');
vi.mock('../hooks/useFormInput');

describe('Login Component', () => {
  const mockLoginUser = vi.fn();
  const mockUseFormInput = (value) => ({
    value,
    onChange: vi.fn(),
  });

  beforeEach(() => {
    // Mock useAuth hook
    useAuth.mockReturnValue({
      loginUser: mockLoginUser,
      error: null,
    });

    // Mock useFormInput hook
    useFormInput.mockImplementation((initialValue) => mockUseFormInput(initialValue));
  });

  test('renders login page with form elements', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // Check if the login button is present
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
