import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './styling/transaction.css'; // Import the CSS file

const TransactionForm = () => {
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [account, setAccount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const transaction = { amount, type, category, subcategory, account };
        try {
            await axios.post('http://localhost:5000/api/transactions', transaction);
            // Reset form fields
            setAmount('');
            setType('expense');
            setCategory('');
            setSubcategory('');
            setAccount('');

            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Transaction added successfully!',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            console.error('Error adding transaction:', error);
            // Optionally show an error message
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error adding the transaction.',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required />
                <input type="text" value={subcategory} onChange={(e) => setSubcategory(e.target.value)} placeholder="Subcategory" />
                <input type="text" value={account} onChange={(e) => setAccount(e.target.value)} placeholder="Account" required />
                <button type="submit">Add Transaction</button>
            </form>
        </div>
    );
};

export default TransactionForm;