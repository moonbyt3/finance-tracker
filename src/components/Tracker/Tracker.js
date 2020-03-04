import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tracker.scss';
import _ from 'lodash';

import TrackerDisplay from '../TrackerDisplay/TrackerDisplay';
import TrackerHistory from '../TrackerHistory/TrackerHistory';
import TrackerAddTransaction from '../TrackerAddTransaction/TrackerAddTransaction';
import TrackerSummary from '../TrackerSummary/TrackerSummary';

//https://finance-tracker-srv.herokuapp.com/api/finance-account
const apiURL = 'http://localhost:4000/api/finance-account';

export default function Tracker(props) {
    const [income, setIncome] = useState(0);
    const [incomeDate, setIncomeDate] = useState('');
    const [expense, setExpense] = useState([]);
    const [summary, setSummary] = useState([]);
    const [balance, setBalance] = useState(0);
    const [expenseAmount, setExpenseAmount] = useState(0);
    // 0
    // ["Groceries", "10", "food"]

    // 1
    // ["Electricity Bills", "30", "bills"]

    // 2
    // ["Burger", "3", "food"]

    // 3
    // ["Weed", "10", "drugs"]
    
    useEffect(() => {
        async function fetchData() {
            // You can await here
            const result = await axios(
                apiURL,
            );
            const { balance, income, income_date, expense } = result.data.results[0];
            setBalance(balance);
            setIncome(income);
            setIncomeDate(income_date);
            setExpense(expense);
        }
        fetchData();

        
        
        // for (let i = 0; i < elements.length; i++) {
        //     const element = elements[i];
        //     if (element) {
               
        //     }
        // }
        // console.log(expenseTypes);
        
    }, []);
    useEffect(() => {
        let expenseTypes = expense.map((val, i, arr) => {
            let expenseSingle = val;
            let expenseSingleValue = val[1];
            let expenseSingleType = val[2];
            let res = {name: '', ammount: 0};
            for (let j = 0; j < expense.length; j++) {
                // console.log(expenseSingleType, expense[j][2]);
                
                if (expenseSingleType === expense[j][2]) {
                    console.log(expenseSingleType);
                    res.name = expenseSingleType;
                    res.ammount += Number(expense[j][1]);
                }
            }
            return res;
            
            
        })
        let summary = _.uniqWith(expenseTypes, _.isEqual);
        setSummary(summary);
        setExpenseAmount(calculateExpenseAmount());
    }, [expense]);
    const updateDB = () => {
        axios.put(`${apiURL}/0`, {
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
    const handleIncomeRemove = (value) => {
        setIncome(Number(income) - Number(value));
        setBalance(balance - Number(value));
        
    }
    const handleExpense = (expenseName, expenseAmount, expenseType) => {
        setExpense([
            ...expense,
            [expenseName, expenseAmount, expenseType.toLowerCase()]
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
            <div className="tracker-panel"></div>
            <div className="tracker-panel">
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
                    handleIncomeRemove={handleIncomeRemove}
                    updateDB={updateDB}
                />
            </div>
            <div className="tracker-panel">
                <TrackerSummary
                    summary={summary}
                    totalExpenses={expenseAmount}
                />
            </div>
        </div>
    )
}
