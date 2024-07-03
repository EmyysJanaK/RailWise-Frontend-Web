// UserManagement.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import UserManagement from './UserManagement';

jest.mock('axios');

test('renders user management component', async () => {
  const users = [{ id: 1, name: 'John Doe' }];
  axios.get.mockResolvedValue({ data: users });

  render(<UserManagement />);

  expect(await screen.findByText('John Doe')).toBeInTheDocument();
});
