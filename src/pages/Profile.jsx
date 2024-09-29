import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import PasswordInput from "../components/PasswordInput";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faUser,
  faClipboardList,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FaClock, FaTrain } from "react-icons/fa";

const ProfilePage = () => {
  const { userData, login, loading, logout } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

  useEffect(() => {
    if (!loading && userData) {
      setUsername(userData.username);
      setEmail(userData.email);
      setPhone(userData.phone);

      // Fetch booking history
      const fetchBookings = async () => {
        try {
          const response = await axios.get("/api/user/bookingHistory", {
            headers: {
              "Cache-Control": "no-cache",
            },
            withCredentials: true,
          });
          setBookings(response.data);
        } catch (error) {
          console.error("Error fetching booking history", error);
        }
      };

      fetchBookings();
    }
  }, [loading, userData]);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        "/api/user/updateProfile",
        {
          username,
          email,
          phone,
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Update user data in context and local storage
        const updatedUser = { ...userData, username, email, phone };
        login(updatedUser);
        setIsEditing(false);
        setShowModal(false);
        setShowChangePasswordModal(false);
        setError("");
        setChangesMade(false);
      }
    } catch (error) {
      setError(error.response.data.message || "Update failed");
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const response = await axios.delete(`/api/bookings/${bookingId}`, {
        withCredentials: true,
      });
      if (
        response.status === 200 &&
        response.data.message === "Booking cancelled"
      ) {
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
      }
    } catch (error) {
      setError(error.response.data.message || "Error cancelling booking");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.post(
        "/api/user/accountDelete",
        { password: oldPassword },
        { withCredentials: true }
      );
      logout();
      // Redirect to home page or login page
    } catch (error) {
      setError(error.response.data.message || "Account deletion failed");
    }
  };

  const handleSaveClick = () => {
    setShowModal(true);
  };

  const handleChangePasswordClick = () => {
    setShowChangePasswordModal(true);
  };

  const handleDeleteAccountClick = () => {
    setShowDeleteAccountModal(true);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setChangesMade(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-64 p-4 text-white bg-gray-800">
        <h2 className="mb-6 text-2xl font-bold">Dashboard</h2>
        <ul>
          <li
            className={`mb-4 ${activeTab === "profile" ? "text-blue-500" : ""}`}
          >
            <button
              onClick={() => setActiveTab("profile")}
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </button>
          </li>
          <li
            className={`mb-4 ${
              activeTab === "bookings" ? "text-blue-500" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("bookings")}
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              Bookings
            </button>
          </li>
          <li
            className={`mb-4 ${
              activeTab === "security" ? "text-blue-500" : ""
            }`}
          >
            <button
              onClick={() => setActiveTab("security")}
              className="flex items-center"
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Security & Privacy
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        {activeTab === "profile" && (
          <div>
            <h2 className="mb-4 text-4xl font-bold text-center">Profile</h2>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-3xl font-semibold">Profile Details</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              ) : (
                <button
                  onClick={handleSaveClick}
                  className="text-blue-500"
                  disabled={!changesMade}
                >
                  <FontAwesomeIcon icon={faSave} />
                  <span className="ml-2">Save</span>
                </button>
              )}
            </div>
            {isEditing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveClick();
                }}
              >
                {/* Username Input */}
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Username</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={username}
                    onChange={handleInputChange(setUsername)}
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    required
                  />
                </div>

                {/* Phone Input with +94 prefix */}
                <div className="mb-4">
                  <label className="block mb-1 text-gray-700">Phone</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-gray-700 bg-gray-200 border border-r-0 rounded-l-lg">
                      +94
                    </span>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border rounded-r-lg focus:outline-none focus:border-blue-500"
                      value={phone}
                      onChange={handleInputChange(setPhone)}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full py-2 text-white transition duration-200 bg-purple-600 rounded shadow-sm ${
                    changesMade ? "hover:bg-purple-700" : "cursor-not-allowed"
                  }`}
                  disabled={!changesMade}
                >
                  Save
                </button>
              </form>
            ) : (
              <div>
                <div className="mb-4">
                  <strong>Username:</strong> {username}
                </div>
                <div className="mb-4">
                  <strong>Email:</strong> {email}
                </div>
                <div className="mb-4">
                  <strong>Phone:</strong> +94 {phone}
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "bookings" && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Booking History</h2>
            {bookings.length > 0 ? (
              <ul>
                {bookings.map((booking) => (
                  <li
                    key={booking._id}
                    className="items-center justify-between p-6 mb-6 transition-transform transform bg-white border border-gray-300 shadow-lg cursor-pointer rounded-xl hover:shadow-xl hover:scale-105"
                  >
                    <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="mr-3 text-2xl font-bold text-indigo-700">
                          Booking ID: {booking._id}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <FaTrain className="text-3xl text-gray-800" />
                        <div className="ml-3 text-2xl font-bold text-gray-700 capitalize">
                          {booking.scheduleRef.trainRef.name}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-xl font-bold text-gray-800">
                          Total Price: ${booking.totalFare}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="mr-3 text-lg text-gray-800">
                          From: {booking.startHalt.stationRef.name}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-lg text-gray-800">
                          To: {booking.endHalt.stationRef.name}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <div className="text-xl text-gray-700">
                          {booking.date.substring(0, 10)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between w-full gap-4 mb-4">
                      <div className="flex items-center">
                        <FaClock className="mr-2 text-gray-500" />
                        <div className="mr-3 text-xl text-gray-500">
                          Departure: {booking.startHalt.departureTime}
                        </div>
                      </div>

                      <div className="flex items-center">
                        <FaClock className="mr-2 text-gray-500" />
                        <div className="text-xl text-gray-500">
                          Arrival: {booking.endHalt.arrivalTime}
                        </div>
                      </div>
                    </div>

                    {new Date(booking.date).getTime() > new Date().getTime() && (
                  <div className="flex justify-between w-full p-6 bg-blue-100 rounded-lg">
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="px-4 py-2 text-white transition bg-red-500 rounded hover:bg-red-600"
                    >
                      Cancel Booking
                    </button>
                  </div>
                  )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}
        {activeTab === "security" && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">Security & Privacy</h2>
            <button
              onClick={handleChangePasswordClick}
              className="w-full py-2 mb-4 text-white transition duration-300 bg-blue-500 rounded-full hover:bg-blue-700"
            >
              Change Password
            </button>
            <button
              onClick={handleDeleteAccountClick}
              className="w-full py-2 text-white transition duration-300 bg-red-500 rounded-full hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="mb-4 text-xl font-bold">Enter Password to Confirm</h2>
          <PasswordInput
            label="Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            onClick={handleUpdateProfile}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
          >
            Confirm
          </button>
        </Modal>
      )}

      {showChangePasswordModal && (
        <Modal onClose={() => setShowChangePasswordModal(false)}>
          <h2 className="mb-4 text-xl font-bold">Change Password</h2>
          <PasswordInput
            label="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <button
            onClick={async () => {
              await handleUpdateProfile();
              setShowChangePasswordModal(false);
            }}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded"
          >
            Change Password
          </button>
        </Modal>
      )}

      {showDeleteAccountModal && (
        <Modal onClose={() => setShowDeleteAccountModal(false)}>
          <h2 className="mb-4 text-xl font-bold">Delete Account</h2>
          <PasswordInput
            label="Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <button
            onClick={handleDeleteAccount}
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded"
          >
            Confirm
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
