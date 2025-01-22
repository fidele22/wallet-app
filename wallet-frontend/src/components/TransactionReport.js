import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styling/transactionReport.css'; // Import the CSS file

const TransactionReport = () => {
    const [transactions, setTransactions] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [filteredTransactions, setFilteredTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };
        fetchTransactions();
    }, []);

    const generateReport = () => {
        const filtered = transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            const matchesStartDate = startDate ? transactionDate >= new Date(startDate) : true;
            const matchesEndDate = endDate ? transactionDate <= new Date(endDate) : true;
            return matchesStartDate && matchesEndDate;
        });
        setFilteredTransactions(filtered);
    };

    const calculateSummary = () => {
        const totalIncome = filteredTransactions
            .filter(transaction => transaction.type === 'income')
            .reduce((acc, transaction) => acc + transaction.amount, 0);
        const totalExpenses = filteredTransactions
            .filter(transaction => transaction.type === 'expense')
            .reduce((acc, transaction) => acc + transaction.amount, 0);
        const netBalance = totalIncome - totalExpenses;

        return { totalIncome, totalExpenses, netBalance };
    };

    const { totalIncome, totalExpenses, netBalance } = calculateSummary();

    return (
        <div className="transaction-report">
            <h2>Generate Transaction Report</h2>
            <div className="date-filters">
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                <button onClick={generateReport}>Generate Report</button>
            </div>
            {filteredTransactions.length > 0 ? (
                <>
                    <div className="summary">
                        <h3>Summary</h3>
                        <p>Total Income: ${totalIncome.toFixed(2)}</p>
                        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
                        <p>Net Balance: ${netBalance.toFixed(2)}</p>
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
                            {filteredTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <td>{transaction.type}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.subcategory || 'N/A'}</td>
                                    <td>{transaction.account}</td>
                                    <td>{new Date(transaction.date).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>No transactions found for the selected date range.</p>
            )}
        </div>
    );
};

export default TransactionReport;