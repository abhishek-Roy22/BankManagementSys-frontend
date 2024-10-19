import axios from 'axios';
import './BankForm.css';
import toast from 'react-hot-toast';

const BankForm = ({ setOpen, open }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const ifscCode = formData.get('ifscCode');
    const branchName = formData.get('branchName');
    const bankName = formData.get('bankName');
    const accountNumber = formData.get('accountNumber');
    const accountHolderName = formData.get('accountHolderName');

    try {
      toast.loading('Adding Details', { id: 'bank' });
      const res = await axios.post('/bank/addAccount', {
        ifscCode,
        branchName,
        bankName,
        accountNumber,
        accountHolderName,
      });
      if (res.status == 201) {
        toast.success('Bank Details Added Successfully', { id: 'bank' });
        setOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to Add details', { id: 'bank' });
    }
  };

  return (
    <div className="bankForm">
      <h1 className="bankTitle">Add Bank Account</h1>
      <span className="close" onClick={() => setOpen(!open)}>
        ❌
      </span>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="bankName"
          placeholder="Bank Name"
          autoComplete="off"
          autoFocus
          required
        />

        <input
          type="text"
          name="accountHolderName"
          placeholder="Account Holder Name"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          autoComplete="off"
          required
        />

        <input
          type="text"
          name="branchName"
          placeholder="Branch Name"
          autoComplete="off"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BankForm;
