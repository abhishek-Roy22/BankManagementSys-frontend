import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // Track loading state

  // Function to check user authentication
  const checkUserAuthentication = async () => {
    try {
      const res = await axios.get('/auth/check', {
        withCredentials: true, // Ensure credentials (cookies) are included
      });

      if (res.status === 200 && res.data.user) {
        // Set user data if authenticated
        setUser(res.data.user);
        setIsLoggedIn(true);
      } else {
        // User is not authenticated, clear the state
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(
        'Error checking user authentication:',
        error.response?.data?.message || error.message
      );
      setUser(null); // Reset user on error (e.g., token expired or invalid)
      setIsLoggedIn(false);
    } finally {
      setLoading(false); // Ensure loading is set to false regardless of success/failure
    }
  };

  // On component mount, check authentication
  useEffect(() => {
    checkUserAuthentication();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        '/user/login',
        { email, password },
        { withCredentials: true } // Include credentials to handle cookies
      );

      if (res.status === 200) {
        const { token } = res.data;
        const decodedData = jwtDecode(token);

        setUser({
          email: decodedData.email,
          userName: decodedData.userName,
          isAdmin: decodedData.isAdmin,
        });

        setIsLoggedIn(true);
      }
    } catch (error) {
      throw new Error(
        'Unable to login: ' + (error.response?.data?.message || error.message)
      );
    }
  };

  // Signup function
  const signin = async (userName, email, password) => {
    try {
      const res = await axios.post('/user/register', {
        userName,
        email,
        password,
      });

      if (res.status !== 201) {
        throw new Error('Unable to register');
      }
      console.log('User registration successful');
    } catch (error) {
      throw new Error(
        'Unable to register: ' +
          (error.response?.data?.message || error.message)
      );
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const res = await axios.get('/user/logout', {
        withCredentials: true,
      });

      if (res.status === 200) {
        console.log(res.data.message);
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error(
        'Logout failed:',
        error.response?.data?.message || error.message
      );
    }
  };

  const value = {
    user,
    isLoggedIn,
    login,
    signin,
    logout,
    loading, // Pass loading state to manage loading UI
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>} {/* Show loading state */}
    </AuthContext.Provider>
  );
};

// Hook to use the Auth context
export const useAuth = () => useContext(AuthContext);
