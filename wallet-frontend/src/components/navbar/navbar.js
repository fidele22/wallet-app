// src/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css'; // Optional: Create a CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Add Transaction</Link>
                </li>
                <li>
                    <Link to="/transactions">Transaction List</Link>
                </li>
                <li>
                <Link to="/report">Generate Report</Link> 
                </li>
                <li>
                <Link to="/budgetmanager">BudgetManager </Link> 
                </li>
                <li>
                <Link to="/transactionsummary">TransactionSummary </Link> 
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;