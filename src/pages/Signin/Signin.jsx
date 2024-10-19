import './signin.css';
import { useAuth } from '../../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get('userName');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      toast.loading('Signing Up', { id: 'register' });
      await auth?.signin(userName, email, password);
      toast.success('Register Successfull', { id: 'register' });
      navigate('/login');
    } catch (error) {
      console.log(error);
      toast.error('Failed to Register', { id: 'register' });
    }
  };

  return (
    <div className="signin">
      <h1 className="signinTitle">Signin</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">UserName</label>
        <input
          type="text"
          name="userName"
          id="userName"
          placeholder="John Doe"
          autoComplete="off"
          autoFocus
          required
        />

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

export default Signin;
