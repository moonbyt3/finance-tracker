import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tracker.scss';

import TrackerDisplay from '../TrackerDisplay/TrackerDisplay';
import TrackerHistory from '../TrackerHistory/TrackerHistory';
import TrackerAddTransaction from '../TrackerAddTransaction/TrackerAddTransaction';

export default function Tracker() {
    const [income, setIncome] = useState(0);
    const [incomeDate, setIncomeDate] = useState('');
    const [expense, setExpense] = useState([]);
    const [balance, setBalance] = useState(0);
   
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios(
                'http://localhost:9999/api/finance-account',
            );
            console.log(result.data);
        }
        fetchData();
    }, []);

    const handleIncome = (value) => {
        setIncome(Number(income) + Number(value));
        setIncomeDate(new Date().toLocaleDateString());
        setBalance(balance + Number(value));
    }

    const handleExpense = (expenseName, expenseAmount) => {
        setExpense([
            ...expense,
            [expenseName, expenseAmount]
        ]);
        setBalance(balance - Number(expenseAmount));
    }

    const calculateExpenseAmount = () => {
        return expense.reduce((totalExpense, currentExpense) => {
            return Number(totalExpense) + Number(currentExpense[1]);
        }, 0);
    }
    const handleDeleteHistoryItem = (historyItemAmount, historyItemIndex) => {
        let tempExpensesList = [... expense];
        if (historyItemIndex !== -1) {
            tempExpensesList.splice(historyItemIndex, 1);
            setExpense(tempExpensesList);
            setBalance(balance + historyItemAmount);
        }
    }

    return (
        <div className="tracker">
            <TrackerDisplay 
                balance={balance}
                income={income}
                incomeDate={incomeDate}
                expenseAmount={calculateExpenseAmount()}
            />

            <TrackerHistory 
                expense={expense}
                handleDeleteHistoryItem={handleDeleteHistoryItem}
            />
            
            <TrackerAddTransaction 
                income={income}
                handleIncome={handleIncome}
                handleExpense={handleExpense}
            />
        </div>
    )
}
