import { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';
import Card from '../../components/Card/Card';

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    const getAccounts = async () => {
      try {
        const res = await axios.get('/user/admin/bank-accounts');
        if (res.status == 200) {
          setAccounts(res.data.bankAccounts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAccounts();
  }, []);

  console.log(accounts);
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
