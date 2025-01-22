import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styling/transactionList.css'; // Import the CSS file

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0); // State for total expenses
    const [budget, setBudget] = useState(0); // State for budget
    const [budgetExceeded, setBudgetExceeded] = useState(false); 
    const [accountNumber, setAccountNumber] = useState('');
    const [type, setType] = useState('');

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        const fetchBudget = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/budget');
                setBudget(response.data.amount || 0); // Set budget from database
            } catch (error) {
                console.error('Error fetching budget:', error);
            }
        };

        fetchTransactions();
        fetchBudget();
    }, []);

    // Filter transactions based on account number and type
    const filteredTransactions = transactions.filter(transaction => {
        const matchesAccount = accountNumber ? transaction.account.includes(accountNumber) : true; // Check if account includes the input
        const matchesType = type ? transaction.type === type : true;
        return matchesAccount && matchesType;
    });

    // Calculate total expenses
    useEffect(() => {
        const total = filteredTransactions // Use filteredTransactions here
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + transaction.amount, 0);
        setTotalExpenses(total);
        setBudgetExceeded(total > budget); // Check if budget is exceeded
    }, [filteredTransactions, budget]); // Update dependency to filteredTransactions

    return (
        <div className="transaction-list">
            <h2>Transaction List</h2>

            {budgetExceeded && (
                <div className="budget-notification">
                    <p style={{ color: 'red' }}>Warning: You have exceeded your budget!</p>
                </div>
            )}
            <h3>Total Expenses: ${totalExpenses.toFixed(2)}</h3>
            <div className="filter-section">
                <input
                    type="text"
                    placeholder="Filter by account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)} // Update state on every keystroke
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Account</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length > 0 ? ( // Check if there are filtered transactions
                        filteredTransactions.map((transaction) => (
                            <tr key={transaction._id}>
                                <td>{transaction.type}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.category}</td>
                                <td>{transaction.subcategory || 'N/A'}</td>
                                <td>{transaction.account}</td>
                                <td>{new Date(transaction.date).toLocaleDateString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No transactions found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;