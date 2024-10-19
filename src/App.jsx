import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import EditAccount from './components/EditAccount/EditAccount';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/isAdmin" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/account/:id" element={<EditAccount />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
