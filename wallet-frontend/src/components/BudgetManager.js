import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styling/budgetManager.css'; // Import the CSS file

const BudgetManager = () => {
    const [budget, setBudget] = useState(0); // State for budget
    const [newBudget, setNewBudget] = useState(0); // State for new budget input

    // Fetch the current budget from the database when the component mounts
    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/budget');
                setBudget(response.data.amount || 0); // Set budget from database
                setNewBudget(response.data.amount || 0); // Initialize newBudget with current budget
            } catch (error) {
                console.error('Error fetching budget:', error);
            }
        };

        fetchBudget();
    }, []);

    // Update the budget in the database
    const updateBudget = async () => {
        try {
            await axios.put('http://localhost:5000/api/budget', { amount: newBudget });
            setBudget(newBudget); // Update local budget state
            alert("budget setted successful");
        } catch (error) {
            console.error('Error updating budget:', error);
            alert("failed to set budget");
        }
    };

    return (
        <div className="budget-manager">
            <h2>Set Your Budget</h2>
            <div className="budget-section">
                <input
                    type="number"
                    placeholder="Set Budget"
                    value={newBudget}
                    onChange={(e) => setNewBudget(Number(e.target.value))} // Update local newBudget state
                />
                <button onClick={updateBudget}>Save Budget</button> {/* Button to save budget */}
            </div>
        </div>
    );
};

export default BudgetManager;