import React, { useState } from 'react';
import $ from 'jquery';
import Select from 'react-select';

export default function TrackerAddTransaction(props) {
    const [addTransactionAmount, setAddTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState('');
    const [expense, setExpense] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);
    
    const options = [
        { value: 'expense', label: 'Add Expense' },
        { value: 'income', label: 'Add Income' },
    ];
    
    function changeTransactionView(e) {
        let views = $('[data-transaction-view]');
        for (let view of views) {
            $(view).hide();
            setTransactionType(e.value);
        }
        $(`[data-transaction-view="${e.value}"]`).fadeIn();
    }
    function handleTransaction(e) {
        e.preventDefault();
        if (transactionType === 'income' ) {
            props.handleIncome(addTransactionAmount);
        } else {
            props.handleDisplayExpense(expenseAmount);
            props.handleHistoryExpense(expense, expenseAmount);
        }
    }
    function bindTransactionAmountToState(e) {
        setAddTransactionAmount(e.target.value);
    }
    function bindExpenseTextToState(e) {
        setExpense(e.target.value);
    }
    function bindExpenseAmountToState(e) {
        setExpenseAmount(e.target.value);
    }

    return (
        <div className="tracker-add-trans">
            <h3>Add new transaction</h3>
            <form id="form" className="form tracker-add-trans__form">
                <Select
                    options={options}
                    className="form-select"
                    onChange={changeTransactionView}
                />
                <div className="form-control tracker-add-trans__form-item" data-transaction-view="expense">
                    <span>Text</span>
                    <input 
                        type="text"
                        id="text"
                        defaultValue={expense}
                        onChange={bindExpenseTextToState}
                        placeholder="Enter text..."
                    />
                    <span>Amount</span>
                    <input 
                        type="number"
                        id="expenseAmount"
                        defaultValue={expenseAmount}
                        onChange={bindExpenseAmountToState}
                        placeholder="Enter Amount..."
                    />
                </div>
                <div className="form-control tracker-add-trans__form-item" data-transaction-view="income">
                    <span>Amount</span>
                    <input 
                        type="number" 
                        id="incomeAmount" 
                        defaultValue={addTransactionAmount} 
                        onChange={bindTransactionAmountToState} 
                        placeholder="Enter amount..." 
                    />
                </div>
                <button className="btn" onClick={handleTransaction}>Add transaction</button>
            </form>
        </div>
    )
}
