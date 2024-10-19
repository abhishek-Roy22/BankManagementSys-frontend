import './login.css';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    try {
      toast.loading('Loging in', { id: 'login' });
      await auth?.login(email, password);
      toast.success('Login Successfull', { id: 'login' });
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Invalid Credential', { id: 'login' });
    }
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@gmail.com"
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          autoComplete="off"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
