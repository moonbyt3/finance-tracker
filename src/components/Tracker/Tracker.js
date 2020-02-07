import React, { useState } from 'react';

import './tracker.scss';

import TrackerDisplay from '../TrackerDisplay/TrackerDisplay';
import TrackerHistory from '../TrackerHistory/TrackerHistory';
import TrackerAddTransaction from '../TrackerAddTransaction/TrackerAddTransaction';

export default function Tracker() {
    const [income, setIncome] = useState(0);
    const [incomeDate, setIncomeDate] = useState('');
    const [expense, setExpense] = useState([]);
    const [expenseAmount, setExpenseAmount] = useState(0);

    const handleIncome = (value) => {
        setIncome(Number(income) + Number(value));
        setIncomeDate(new Date().toLocaleDateString());
    }

    const handleDisplayExpense = (value) => {
        setExpenseAmount(Number(expenseAmount) + Number(value))
    }
    const pushExpense = (a,b) => {
        let arr = [a,b];
        return arr;
    }
    const handleHistoryExpense = (expenseName, epenseAmount) => {
        setExpense(
            pushExpense(expenseName, epenseAmount)
        );
    }
    return (
        <div className="tracker">
            <TrackerDisplay 
                income={income}
                incomeDate={incomeDate}
                expenseAmount={expenseAmount}
            />
            <TrackerHistory 
                handleHistoryExpense={handleHistoryExpense}
                expense={expense}
            />

            {/* start
                Inputs are binded to component state
                User inputs transaction (expense/income)
                On click it sets state of expense or income
                
            */}
            <TrackerAddTransaction 
                income={income}
                handleIncome={handleIncome}
                handleDisplayExpense={handleDisplayExpense}
                handleHistoryExpense={handleHistoryExpense}
            />
        </div>
    )
}
