import React, { useState } from 'react';
import $ from 'jquery';
import Swal from 'sweetalert2'
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
    function restartState() {
        setForm({
            incomeAmount: 0,
            expense: "",
            expenseAmount: 0
        });
    }
    function handleTransaction(e) {
        e.preventDefault();
        let { incomeAmount, expense, expenseAmount } = form;
        switch (transactionType) {
            case 'income' :
                incomeAmount !== 0 ? 
                    props.handleIncome(incomeAmount) 
                : Swal.fire({
                    title: 'Error!',
                    text: 'Ammount can\'t be 0',
                    icon: 'error',
                });
                break;
            case 'expense' :
                expense !== '' || expenseAmount !== 0  && typeof expenseAmount != 'string' ?
                props.handleExpense(expense, expenseAmount)
                : Swal.fire({
                    title: 'Error!',
                    text: 'Please fill all fields',
                    icon: 'error',
                });
                break;
            default: 
                Swal.fire({
                    title: 'Error!',
                    text: 'Please fill all fields',
                    icon: 'error',
                });
                break;
        }
        restartState();
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
                <button className="btn" onClick={props.updateDB}>updateDB</button>
            </form>
        </div>
    )
}
