import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js'; // Import Chart and registerables
import './styling/transactionList.css'; // Import the CSS file

// Register all necessary components
Chart.register(...registerables);

const TransactionSummary = () => {
    const [transactions, setTransactions] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/transactions');
                setTransactions(response.data);
                prepareChartData(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const prepareChartData = (transactions) => {
        const incomeData = transactions.filter(t => t.type === 'income');
        const expenseData = transactions.filter(t => t.type === 'expense');

        const incomeCategories = {};
        const expenseCategories = {};

        incomeData.forEach(transaction => {
            const category = transaction.category || 'Other';
            incomeCategories[category] = (incomeCategories[category] || 0) + transaction.amount;
        });

        expenseData.forEach(transaction => {
            const category = transaction.category || 'Other';
            expenseCategories[category] = (expenseCategories[category] || 0) + transaction.amount;
        });

        setChartData({
            labels: [...new Set([...Object.keys(incomeCategories), ...Object.keys(expenseCategories)])],
            datasets: [
                {
                    label: 'Income',
                    data: Object.keys(incomeCategories).map(category => incomeCategories[category] || 0),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'Expenses',
                    data: Object.keys(expenseCategories).map(category => expenseCategories[category] || 0),
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                },
            ],
        });
    };

    return (
        <div className="transaction-summary">
            <h2>Transaction Summary</h2>
            {chartData.labels.length > 0 ? (
                <Bar data={chartData} options={{ responsive: true }} />
            ) : (
                <p>No transactions available to display.</p>
            )}
        </div>
    );
};

export default TransactionSummary;