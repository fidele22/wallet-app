// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes,Switch } from 'react-router-dom';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Navbar from './components/navbar/navbar';
import TransactionReport from './components/TransactionReport';
import BudgetManager from './components/BudgetManager'; 
import TransactionSummary from './components/TransactionSummary';
import './App.css'; // Optional: Create a CSS file for overall styling

const App = () => {
    return (
        
            <Router>
    
                <div className="app-container">
    
                    <Navbar />
    
                    <div className="content">
    
                        <Routes>
    
                            <Route path="/" element={<TransactionForm />} />
    
                            <Route path="/transactions" element={<TransactionList />} />
                            <Route path="/report" element={<TransactionReport />} /> 
                            <Route path="/budgetmanager" element={<BudgetManager />} /> 
                            <Route path="/transactionsummary" element={<TransactionSummary />} /> 
                        </Routes>
    
                    </div>
    
                </div>
    
            </Router>
    
        );
};

export default App;