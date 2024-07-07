import axios from 'axios';

export const logout = async () => {
  try {
    await axios.get('api/user/logout', {}, { withCredentials: true });
    localStorage.removeItem('user'); // Clear user data from local storage
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
