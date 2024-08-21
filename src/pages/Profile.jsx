import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';
import Modal from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faSave, faUser, faClipboardList, faLock, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProfilePage = () => {
  const { userData, login, loading, logout } = useContext(UserContext);
  const [activeTab, setActiveTab] = useState('profile');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
          const response = await axios.get('/api/user/bookingHistory', {
            headers: {
              'Cache-Control': 'no-cache'
            },
            withCredentials: true
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
      const response = await axios.put('/api/user/updateProfile', {
        username,
        email,
        phone,
        oldPassword,
        newPassword
      }, { withCredentials: true });

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
      const response = await axios.delete(`/api/bookings/${bookingId}`, { withCredentials: true });
      if (response.status === 200 && response.data.message === "Booking cancelled") {
        setBookings(bookings.filter(booking => booking._id !== bookingId));
      }
    } catch (error) {
      setError(error.response.data.message || "Error cancelling booking");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.post('/api/user/accountDelete', { password: oldPassword }, { withCredentials: true });
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
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <ul>
          <li className={`mb-4 ${activeTab === 'profile' ? 'text-blue-500' : ''}`}>
            <button onClick={() => setActiveTab('profile')} className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </button>
          </li>
          <li className={`mb-4 ${activeTab === 'bookings' ? 'text-blue-500' : ''}`}>
            <button onClick={() => setActiveTab('bookings')} className="flex items-center">
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              Bookings
            </button>
          </li>
          <li className={`mb-4 ${activeTab === 'security' ? 'text-blue-500' : ''}`}>
            <button onClick={() => setActiveTab('security')} className="flex items-center">
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Security & Privacy
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            {error && <div className="mb-4 text-red-600">{error}</div>}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Profile Details</h3>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="text-blue-500">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              ) : (
                <button onClick={handleSaveClick} className="text-blue-500" disabled={!changesMade}>
                  <FontAwesomeIcon icon={faSave} />
                  <span className="ml-2">Save</span>
                </button>
              )}
            </div>
            {isEditing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveClick(); }}>
                <TextInput label="Username" value={username} onChange={handleInputChange(setUsername)} />
                <TextInput label="Email" type="email" value={email} onChange={handleInputChange(setEmail)} />
                <TextInput label="Phone" type="tel" value={phone} onChange={handleInputChange(setPhone)} />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 mt-4 rounded-full hover:bg-gray-800 transition duration-300"
                  disabled={!changesMade}
                >
                  Save
                </button>
              </form>
            ) : (
              <div>
                <div className="mb-4"><strong>Username:</strong> {username}</div>
                <div className="mb-4"><strong>Email:</strong> {email}</div>
                <div className="mb-4"><strong>Phone:</strong> {phone}</div>
              </div>
            )}
          </div>
        )}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Booking History</h2>
            {bookings.length > 0 ? (
              <ul>
                {bookings.map((booking) => (
                  <li key={booking._id} className="mb-4 p-4 border rounded-lg">
                    <div>Booking ID: {booking._id}</div>
                    <div>Train: {booking.train}</div>
                    <div>Date: {booking.date}</div>
                    <button
                      onClick={() => handleDeleteBooking(booking._id)}
                      className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
                    >
                      Delete Booking
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}
        {activeTab === 'security' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Security & Privacy</h2>
            <button
              onClick={handleChangePasswordClick}
              className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-700 transition duration-300 mb-4"
            >
              Change Password
            </button>
            <button
              onClick={handleDeleteAccountClick}
              className="w-full bg-red-500 text-white py-2 rounded-full hover:bg-red-700 transition duration-300"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-xl font-bold mb-4">Enter Password to Confirm</h2>
          <PasswordInput label="Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          <button
            onClick={handleUpdateProfile}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Confirm
          </button>
        </Modal>
      )}

      {showChangePasswordModal && (
        <Modal onClose={() => setShowChangePasswordModal(false)}>
          <h2 className="text-xl font-bold mb-4">Change Password</h2>
          <PasswordInput label="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          <PasswordInput label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <PasswordInput label="Confirm New Password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
          <button
            onClick={async () => {
              await handleUpdateProfile();
              setShowChangePasswordModal(false);
            }}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Change Password
          </button>
        </Modal>
      )}

      {showDeleteAccountModal && (
        <Modal onClose={() => setShowDeleteAccountModal(false)}>
          <h2 className="text-xl font-bold mb-4">Delete Account</h2>
          <PasswordInput label="Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
          <button
            onClick={handleDeleteAccount}
            className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
          >
            Confirm
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ProfilePage;
