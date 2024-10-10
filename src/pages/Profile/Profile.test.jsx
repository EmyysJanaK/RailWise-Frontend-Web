// ProfilePage.test.jsx
import React from "react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfilePage from "./Profile";
import PrivateRoute from "../PrivateRoute";
import { UserContext } from "../../context/UserContext";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProfileForm from "./ProfileForm";
import Login from "../Login";
import SideMenu from "./SideMenu";

// Mock child components used within ProfilePage


vi.mock("./BookingHistory", () => ({
  default: () => <div data-testid="booking-history">Booking History</div>,
}));


describe("ProfilePage Component", () => {
  // Helper function to render components with necessary providers
  const renderWithProviders = (ui, { userData, loading } = {}) => {
    return render(
      <MemoryRouter initialEntries={["/profile"]}>
        <UserContext.Provider value={{ userData, loading }}>
          <Routes>
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  {ui}
                </PrivateRoute>
              }
            />
            <Route path="/login"  element={<Login/>} />
          </Routes>
        </UserContext.Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("displays loading state when loading is true", () => {
    renderWithProviders(<ProfilePage />, { loading: true, userData: null });
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("redirects to login page when user is not authenticated", () => {
    renderWithProviders(<ProfilePage />, { loading: false, userData: null });
    expect(screen.getByText(/Railwise Login/i)).toBeInTheDocument();
  });

  it("renders ProfilePage with ProfileForm when activeTab is 'profile'", () => {
    renderWithProviders(<ProfilePage />, {
      loading: false,
      userData: {
        _id: "6707b36b00287697cc9558f6",
        username: "ppppp",
        email: "p@hh.com",
        phone: "751234567",
        __v: 0,
      },
    });

    // Check that SideMenu is rendered
    expect(screen.getByRole('button', { name: /profile/i })).toHaveLength(3)
    const bookingsButton = screen.getByRole('button', { name: /bookings/i });

    // By default, activeTab is 'profile', so ProfileForm should be rendered
    expect(screen.getByTestId("profile-form")).toBeInTheDocument();
    expect(screen.queryByTestId("booking-history")).not.toBeInTheDocument();
  });

  it("renders BookingHistory when activeTab is 'bookings'", async () => {
    renderWithProviders(<ProfilePage />, {
      loading: false,
      userData: {
        _id: "6707b36b00287697cc9558f6",
        username: "ppppp",
        email: "p@hh.com",
        phone: "751234567",
        __v: 0,
      },
    });

    // Click on the 'Bookings' tab
    const bookingsTab = screen.getByTestId("tab-bookings");
    await userEvent.click(bookingsTab);

    // Now, BookingHistory should be rendered
    expect(screen.getByTestId("booking-history")).toBeInTheDocument();
    expect(screen.queryByTestId("profile-form")).not.toBeInTheDocument();

    // The 'Bookings' tab should have 'active' class
    expect(bookingsTab).toHaveClass("active");
    const profileTab = screen.getByTestId("tab-profile");
    expect(profileTab).not.toHaveClass("active");
  });

  it("changes activeTab and updates SideMenu accordingly", async () => {
    renderWithProviders(<ProfilePage />, {
      loading: false,
      userData: {
        _id: "6707b36b00287697cc9558f6",
        username: "ppppp",
        email: "p@hh.com",
        phone: "751234567",
        __v: 0,
      },
    });

    // Initially, 'Profile' tab is active
    const profileTab = screen.getByTestId("tab-profile");
    const bookingsTab = screen.getByTestId("tab-bookings");

    expect(profileTab).toHaveClass("active");
    expect(bookingsTab).not.toHaveClass("active");

    // Click on 'Bookings' tab
    await userEvent.click(bookingsTab);

    // Now, 'Bookings' tab should be active
    expect(bookingsTab).toHaveClass("active");
    expect(profileTab).not.toHaveClass("active");

    // Verify that BookingHistory is rendered
    expect(screen.getByTestId("booking-history")).toBeInTheDocument();
    expect(screen.queryByTestId("profile-form")).not.toBeInTheDocument();

    // Click back to 'Profile' tab
    await userEvent.click(profileTab);

    // 'Profile' tab should be active again
    expect(profileTab).toHaveClass("active");
    expect(bookingsTab).not.toHaveClass("active");

    // Verify that ProfileForm is rendered
    expect(screen.getByTestId("profile-form")).toBeInTheDocument();
    expect(screen.queryByTestId("booking-history")).not.toBeInTheDocument();
  });
});
