import './Home.css';
import CardImg from '../../assets/card.ico';
import Bulb from '../../assets/lightbulb.png';
import { useEffect, useState } from 'react';
import BankForm from '../../components/BankForm/BankForm';
import axios from 'axios';
import Card from '../../components/Card/Card';

const Home = () => {
  const [open, setOpen] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccount = async () => {
      const { data } = await axios.get('/bank');
      setAccounts(data.bankAccounts);
    };
    fetchAccount();
  }, []);

  return (
    <div className="home">
      <div className="banner">
        <figure>
          <img src={CardImg} alt="card-icon" />
        </figure>
        <div className="content">
          <p>
            Add Bank Account to receive money and you can change it any time.
          </p>
        </div>
      </div>
      <div className="homeTitle">
        <h1>Bank Accounts</h1>
      </div>
      <button className="addBtn" onClick={() => setOpen(!open)}>
        Add New Bank
      </button>

      {accounts?.length > 0 && (
        <div className="cardDetailContainer">
          {accounts?.map((account) => (
            <Card key={account._id} account={account} />
          ))}
        </div>
      )}

      <div className="disclaimerContainer">
        <div className="disclaimer">
          <figure>
            <img src={Bulb} alt="disclaimer" />
          </figure>
          <span>Disclaimer</span>
        </div>
        <div className="disContent">
          <ol type="1">
            <li>Use only a bank account that matches your profile name.</li>
            <hr />
            <li>
              Do not link the same bank account to multiple Task Planet
              accounts.
            </li>
            <hr />
            <li>Fraudulent activity may result in account blocking.</li>
          </ol>
        </div>
      </div>
      {open && (
        <div className="model">
          <BankForm setOpen={setOpen} open={open} />
        </div>
      )}
    </div>
  );
};

export default Home;
