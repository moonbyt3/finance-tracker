import React, { useState } from 'react';

import './tracker.scss';

import TrackerDisplay from '../TrackerDisplay/TrackerDisplay';
import TrackerHistory from '../TrackerHistory/TrackerHistory';
import TrackerAddTransaction from '../TrackerAddTransaction/TrackerAddTransaction';

export default function Tracker() {
    const [income, setIncome] = useState(0);
    const [incomeDate, setIncomeDate] = useState('');
    const [expense, setExpense] = useState([]);

    const handleIncome = (value) => {
        setIncome(Number(income) + Number(value));
        setIncomeDate(new Date().toLocaleDateString());
    }

    const handleExpense = (expenseName, expenseAmount) => {
        setExpense([
            ...expense,
            [expenseName, expenseAmount]
        ]);
    }

    const calculateExpenseAmount = () => {
        return expense.reduce((totalExpense, currentExpense) => {
            return Number(totalExpense) + Number(currentExpense[1]);
        }, 0);
    }

    // TODO - Make function to calculate balance

    return (
        <div className="tracker">
            <TrackerDisplay 
                income={income}
                incomeDate={incomeDate}
                expenseAmount={calculateExpenseAmount()}
            />

            <TrackerHistory 
                expense={expense}
            />
            
            <TrackerAddTransaction 
                income={income}
                handleIncome={handleIncome}
                handleExpense={handleExpense}
            />
        </div>
    )
}
