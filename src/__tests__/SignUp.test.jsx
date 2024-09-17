import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUp from "../pages/SignUp";
import useAuth from "../hooks/useAuth";
import useFormInput from "../hooks/useFormInput";
import { vi } from "vitest";

// Mock custom hooks
vi.mock("../hooks/useAuth");
vi.mock("../hooks/useFormInput");

describe("SignUp Component", () => {
  const mockRegister = vi.fn();
  const mockUseFormInput = (value) => ({
    value,
    onChange: vi.fn(),
  });

  beforeEach(() => {
    // Mock useAuth hook
    useAuth.mockReturnValue({
      register: mockRegister,
      error: null,
    });

    // Mock useFormInput hook
    useFormInput.mockImplementation((initialValue) =>
      mockUseFormInput(initialValue)
    );
  });

  test("renders sign-up form with all fields", () => {
    render(
      <BrowserRouter>
        <SignUp />
      </BrowserRouter>
    );
  });
});
