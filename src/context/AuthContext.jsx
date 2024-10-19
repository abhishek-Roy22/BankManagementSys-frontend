import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // function to check for cookie
  const checkCookie = () => {
    const token = Cookies.get('token'); // Retrieve token from cookies
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode token to get user data
        setUser({ email: decoded.email, userName: decoded.userName });
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Invalid Token:', error); // Log error if token is invalid
      }
    } else {
      console.log('No token found in cookies');
    }
  };

  useEffect(() => {
    checkCookie();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/user/login', { email, password });
    if (res.status !== 200) {
      throw new Error('Unable to login');
    }
    const { token } = res.data;

    const data = jwtDecode(token);
    setUser({
      email: data.email,
      userName: data.userName,
      isAdmin: data.isAdmin,
    });
    setIsLoggedIn(true);
  };

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
      console.log('user created successful');
    } catch (error) {
      throw new Error({ message: error.message });
    }
  };

  const logout = async () => {
    try {
      await axios.get('/user/logout');
      Cookies.remove('token');
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    isLoggedIn,
    login,
    signin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
