import { Link, useNavigate } from 'react-router-dom';
import './Card.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const Card = ({ account }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      axios.delete(`/bank/${account._id}`).then((res) => {
        if (res.status === 200) {
          // Correct status check
          toast.success('Deleted Successfully');
          navigate('/');
          window.location.reload();
        }
      });
    } catch (error) {
      console.log('Error deleting account:', error);
      toast.error('Error while deleting');
    }
  };
  return (
    <div className="cardContainer">
      <div className="bName">
        <span className="bankName">{account.bankName}</span>
        <span className="bank">Bank</span>
      </div>
      <div className="bName">
        <span>{account.accountNumber}</span>
        <span>{account.ifscCode}</span>
      </div>
      <div className="aName">
        <h3>{account.accountHolderName}</h3>
      </div>
      <div className="bName">
        <Link to={`/account/${account._id}`}>
          <button className="edit">Edit</button>
        </Link>
        <button className="remove" onClick={handleDelete}>
          Remove Account
        </button>
      </div>
    </div>
  );
};

export default Card;
