import { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import Card from '../../components/Card/Card';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const getAccounts = async () => {
      if (!user?.isAdmin) {
        console.error('User is not an admin, cannot fetch accounts');
        return;
      }

      try {
        const res = await axios.get('/user/admin/bank-accounts', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        if (res.status == 200) {
          setAccounts(res.data.bankAccounts);
        }
      } catch (error) {
        console.error('Error fetching bank accounts:', error.message);
      }
    };
    // Fetch accounts only if user is an admin
    if (user && user.isAdmin) {
      getAccounts();
    }
  }, [user]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="cardsContainer">
        {accounts?.map((account) => (
          <Card key={account._id} account={account} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
