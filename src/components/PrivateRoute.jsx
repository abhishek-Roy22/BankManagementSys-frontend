import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();

  // if user is not logged in, redirect to the login page
  return isLoggedIn ? element : <Navigate to={'/login'} />;
};

export default PrivateRoute;
