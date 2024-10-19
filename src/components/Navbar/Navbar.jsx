import { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const isAdmin = auth?.user?.isAdmin;

  const handleLogout = () => {
    auth.logout();
    window.location.reload();
  };

  const handleNavigate = () => {
    navigate('/isAdmin');
  };

  return (
    <nav>
      <a href="/">
        <h1 className="logo">My payment</h1>
      </a>
      {auth?.user ? (
        <div className="profileContainer">
          {isAdmin && (
            <button onClick={handleNavigate} className="profile">
              isAdmin
            </button>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="profile"
            aria-expanded={open} // Accessible dropdown indicator
            aria-controls="profileDropdown" // Links button to dropdown
          >
            {auth.user.userName}
          </button>
          {open && (
            <div className="model">
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="authBtn">
          <Link to={'/login'}>
            <button>Login</button>
          </Link>
          <Link to={'/signin'}>
            <button>Signin</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
