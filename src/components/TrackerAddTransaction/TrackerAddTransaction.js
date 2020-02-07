import React, { useState } from 'react';
import $ from 'jquery';
import Select from 'react-select';

export default function TrackerAddTransaction(props) {
    const [transactionType, setTransactionType] = useState('');
    const [form, setForm] = useState({
        incomeAmount: 0,
        expense: "",
        expenseAmount: 0
    });

    const handleFormChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    
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
        if (transactionType === 'income') {
            props.handleIncome(form.incomeAmount);
        } else {
            props.handleExpense(form.expense, form.expenseAmount);
        }
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
                        name="expense"
                        value={form.expense}
                        onChange={handleFormChange}
                        placeholder="Enter text..."
                    />
                    <span>Amount</span>
                    <input 
                        type="number"
                        name="expenseAmount"
                        value={form.expenseAmount}
                        onChange={handleFormChange}
                        placeholder="Enter Amount..."
                    />
                </div>
                <div className="form-control tracker-add-trans__form-item" data-transaction-view="income">
                    <span>Amount</span>
                    <input 
                        type="number" 
                        name="incomeAmount" 
                        value={form.incomeAmount} 
                        onChange={handleFormChange} 
                        placeholder="Enter amount..." 
                    />
                </div>
                <button className="btn" onClick={handleTransaction}>Add transaction</button>
            </form>
        </div>
    )
}
