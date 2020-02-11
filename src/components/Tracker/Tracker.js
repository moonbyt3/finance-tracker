import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tracker.scss';

import TrackerDisplay from '../TrackerDisplay/TrackerDisplay';
import TrackerHistory from '../TrackerHistory/TrackerHistory';
import TrackerAddTransaction from '../TrackerAddTransaction/TrackerAddTransaction';

export default function Tracker(props) {
    const [income, setIncome] = useState(0);
    const [incomeDate, setIncomeDate] = useState('');
    const [expense, setExpense] = useState([]);
    const [balance, setBalance] = useState(0);
    
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios(
                'https://finance-tracker-srv.herokuapp.com/api/finance-account',
            );
            const { balance, income, income_date, expense } = result.data.results[0];
            setBalance(balance);
            setIncome(income);
            setIncomeDate(income_date);
            setExpense(expense);
        }
        fetchData();
    }, []);

    const updateDB = () => {
        axios.put('https://finance-tracker-srv.herokuapp.com/api/finance-account/0', {
            _id: 0,
            name: 'admin',
            balance: balance,
            income: income,
            income_date: incomeDate,
            expense: expense
          }, {headers: {
            "Content-type": "application/json"
        }})
          .catch(function (error) {
            console.log(error);
          });
    }

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
        let tempExpensesList = [...expense];
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
                updateDB={updateDB}
            />
        </div>
    )
}
