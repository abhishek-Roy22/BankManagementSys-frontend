import { useEffect, useState } from 'react';
import './EditAccount.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditAccount = () => {
  const [bankName, setBankName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [branchName, setBranchName] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/bank/${id}`);
        const data = res.data.bankAccount;
        setBankName(data.bankName);
        setAccountHolderName(data.accountHolderName);
        setAccountNumber(data.accountNumber);
        setIfscCode(data.ifscCode);
        setBranchName(data.branchName);
      } catch (error) {
        console.log('Error fetching account data:', error.message);
        toast.error('Error fetching account data');
      }
    };
    fetchData();
  }, [id]); // Added `id` as a dependency

  const handleEdit = (e) => {
    e.preventDefault();
    const updatedAccountData = {
      bankName,
      accountHolderName,
      accountNumber,
      ifscCode,
      branchName,
    };

    axios
      .put(`/bank/${id}`, updatedAccountData) // Directly pass the data object
      .then((res) => {
        if (res.status === 200) {
          // Correct status check
          toast.success('Updated Successfully');
          navigate('/');
        }
      })
      .catch((error) => {
        console.log('Error updating account:', error);
        toast.error('Error while updating');
      });
  };

  return (
    <div className="editForm">
      <h1 className="editTitle">Edit Bank Account</h1>

      <form onSubmit={handleEdit}>
        <input
          type="text"
          name="bankName"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          placeholder="Bank Name"
          autoComplete="off"
          autoFocus
          required
        />

        <input
          type="text"
          name="accountHolderName"
          value={accountHolderName}
          onChange={(e) => setAccountHolderName(e.target.value)}
          placeholder="Account Holder Name"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="accountNumber"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          placeholder="Account Number"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="ifscCode"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
          placeholder="IFSC Code"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="branchName"
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
          placeholder="Branch Name"
          autoComplete="off"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditAccount;
