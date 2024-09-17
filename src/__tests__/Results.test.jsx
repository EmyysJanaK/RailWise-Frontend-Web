import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Results from '../pages/Results';
import { ReservationContext } from '../context/ReservationContext';
import useTrainOptions from '../hooks/useTrainOptions';
import { vi } from 'vitest';

vi.mock('../hooks/useTrainOptions');

describe('Results Component', () => {
  const mockNavigate = vi.fn();
  const mockSetReservationData = vi.fn();

  const mockReservationContextValue = {
    reservationData: {
      departureStationId: 1,
      arrivalStationId: 2,
      departureDate: '2024-09-17',
    },
    setReservationData: mockSetReservationData,
  };

  beforeEach(() => {
    // Reset the mockNavigate function before each test
    mockNavigate.mockClear();

    // Mock useTrainOptions for different test cases
    useTrainOptions.mockReturnValue({
      trainOptions: [],
      loading: false,
      error: null,
    });
  });

  test('renders filter and train options correctly when no loading or error', () => {
    // Mock train options
    useTrainOptions.mockReturnValue({
      trainOptions: [
        {
          id: "1",
          fromHalt: { id: "101", name: 'Station A' },
          toHalt: { id: "202", name: 'Station B' },
          train: { id: "1", name: 'Express Train' },
          seatAvailability: {
            first: 20,
            second: 50,
            third: 100,
          },
          scheduleType: "express",
          departureDate: "2024-09-27"
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    // Check that the Filter component is rendered
    expect(screen.getByText(/Filter/i)).toBeInTheDocument();

    // Check that the TrainOption is rendered with the correct text
    expect(screen.getByText(/Express Train/i)).toBeInTheDocument();
  });

  test('displays loading message while data is loading', () => {
    useTrainOptions.mockReturnValue({
      trainOptions: [],
      loading: true,
      error: null,
    });

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    // Check for the loading text
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('displays error message if there is an error', () => {
    useTrainOptions.mockReturnValue({
      trainOptions: [],
      loading: false,
      error: 'Failed to load train options',
    });

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    // Check for the error text
    expect(screen.getByText(/Failed to load train options/i)).toBeInTheDocument();
  });

  test('handles train option selection and updates reservationData', () => {
    useTrainOptions.mockReturnValue({
      trainOptions: [
        {
          id: "1",
          fromHalt: { id: "101", name: 'Station A' },
          toHalt: { id: "202", name: 'Station B' },
          train: { id: "1", name: 'Express Train' },
          seatAvailability: {
            first: 20,
            second: 50,
            third: 100,
          },
          scheduleType: "express",
          departureDate: "2024-09-27"
        },
      ],
      loading: false,
      error: null,
    });

    render(
      <ReservationContext.Provider value={mockReservationContextValue}>
        <BrowserRouter>
          <Results />
        </BrowserRouter>
      </ReservationContext.Provider>
    );

    const trainOption = screen.getByText(/Express Train/i);

    // Simulate clicking on the train option
    fireEvent.click(trainOption);

    // Expect setReservationData to be called with the correct option details
    expect(mockSetReservationData).toHaveBeenCalledWith({
      ...mockReservationContextValue.reservationData,
      scheduleId: "1",
      fromHaltId: "101",
      toHaltId: "202",
      trainId: "1",
    });

  });
});
