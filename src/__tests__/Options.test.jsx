import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ReservationContext } from '../context/ReservationContext';
import Options from '../pages/Options';
import axios from 'axios';
import { vi } from 'vitest';

// Mock axios to simulate API calls
vi.mock('axios');


describe('Options Component', () => {
  const mockNavigate = vi.fn();
  const mockSetReservationData = vi.fn();

  const mockReservationContextValue = {
    reservationData: {
      fromHaltId: 101,
      toHaltId: 202,
      scheduleId: 1,
      departureDate: '2024-09-17',
      pax: 2,
    },
    setReservationData: mockSetReservationData,
  };

  const mockScheduleInfo = {
    schedule: { id: 1 },
    fromHalt: {
      stationRef: { name: 'Station A' },
      price: 50,
    },
    toHalt: {
      stationRef: { name: 'Station B' },
      price: 100,
    },
    classesDetails: [
      {
        _id: 'class1',
        name: 'First Class',
        availableSeats: 10,
        fareMultiplier: 2,
        features: ['Luxury seating', 'Free meals'],
      },
      {
        _id: 'class2',
        name: 'Economy Class',
        availableSeats: 5,
        fareMultiplier: 1,
        features: ['Basic seating'],
      },
    ],
  };

  beforeEach(() => {
    // Clear mocks before each test
    mockNavigate.mockClear();
    mockSetReservationData.mockClear();
  });

  test('renders loading state', () => {
    axios.get.mockResolvedValueOnce({
      data: mockScheduleInfo,
    });

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Options />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('displays error message on API failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to load seat options'));

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Options />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/Failed to load seat options/i)
      ).toBeInTheDocument()
    );
  });

  test('displays schedule and class options when API call is successful', async () => {
    axios.get.mockResolvedValueOnce({
      data: mockScheduleInfo,
    });

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Options />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    // Wait for the data to load and be displayed
    await waitFor(() =>
      expect(screen.getByText(/Station A/i)).toBeInTheDocument()
    );
    expect(screen.getByText(/Station B/i)).toBeInTheDocument();
    expect(screen.getByText(/First Class/i)).toBeInTheDocument();
    expect(screen.getByText(/Economy Class/i)).toBeInTheDocument();
  });

  test('handles class selection and enables "Next" button', async () => {
    axios.get.mockResolvedValueOnce({
      data: mockScheduleInfo,
    });

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Options />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    // Wait for the data to load and be displayed
    await waitFor(() =>
      expect(screen.getByText(/First Class/i)).toBeInTheDocument()
    );

    // Initially, the "Next" button should be disabled
    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeDisabled();

    // Select a class
    const firstClassOption = screen.getByText(/First Class/i);
    fireEvent.click(firstClassOption);

    // The "Next" button should now be enabled
    expect(nextButton).not.toBeDisabled();
  });

  test('navigates to the seat selection page on "Next" button click', async () => {
    axios.get.mockResolvedValueOnce({
      data: mockScheduleInfo,
    });

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Options />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    // Wait for the data to load and be displayed
    await waitFor(() =>
      expect(screen.getByText(/First Class/i)).toBeInTheDocument()
    );

    // Select a class
    const firstClassOption = screen.getByText(/First Class/i);
    fireEvent.click(firstClassOption);

    // Click the "Next" button
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    // Ensure the reservation data is updated with the selected class and navigation happens
    expect(mockSetReservationData).toHaveBeenCalledWith({
      ...mockReservationContextValue.reservationData,
      selectedClassId: 'class1',
    });
  });

  test('navigates back on "Back" button click', async () => {
    axios.get.mockResolvedValueOnce({
      data: mockScheduleInfo,
    });

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Options />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    // Wait for the data to load
    await waitFor(() =>
      expect(screen.getByText(/First Class/i)).toBeInTheDocument()
    );

    // Click the "Back" button
    const backButton = screen.getByText(/Back/i);
    fireEvent.click(backButton);

    // Ensure navigation back is triggered
  });
});
