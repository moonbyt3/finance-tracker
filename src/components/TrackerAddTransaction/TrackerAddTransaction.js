import React, { useState } from 'react';
import Swal from 'sweetalert2'
import Select from 'react-select';


export default function TrackerAddTransaction(props) {
    const [transactionType, setTransactionType] = useState('');
    const [form, setForm] = useState({
        incomeAmount: 0,
        expense: '',
        expenseAmount: 0,
        expenseType: '',
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
        { value: 'incomeRemove', label: 'Remove Income'}
    ];
    
    function changeTransactionView(e) {
        let views = document.querySelector('[data-transaction-view]');

        for (let view of views) {
            view.classList.add('hide');
            setTransactionType(e.value);
        }

        document.querySelector(`[data-transaction-view="${e.value}"]`).classList.remove('hide');
        document.querySelector(`[data-transaction-view="${e.value}"]`).classList.add('show');
    }

    function restartState() {
        setForm({
            incomeAmount: 0,
            expense: '',
            expenseAmount: 0,
            expenseType: '',
        });
    }

    function handleTransaction(e) {
        e.preventDefault();
        let { incomeAmount, incomeRemove, expense, expenseAmount, expenseType } = form;
        switch (transactionType) {
            case 'income' :
                incomeAmount !== 0 ? 
                    props.handleIncome(incomeAmount) 
                : Swal.fire({
                    title: 'Error!',
                    text: 'Amount can\'t be 0',
                    icon: 'error',
                });
                break;
            case 'expense' :
                expense !== '' || expenseAmount !== 0  && typeof expenseAmount != 'string' && expenseType !== '' ?
                props.handleExpense(expense, expenseAmount, expenseType)
                : Swal.fire({
                    title: 'Error!',
                    text: 'Please fill all fields',
                    icon: 'error',
                });
                break;
            case 'incomeRemove' :
                incomeRemove !== '' ?
                props.handleIncomeRemove(incomeRemove)
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
                    <span>Type</span>
                    <input 
                        type="text"
                        name="expenseType"
                        value={form.expenseType}
                        onChange={handleFormChange}
                        placeholder="Enter type of expense..."
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
                <div className="form-control tracker-add-trans__form-item" data-transaction-view="incomeRemove">
                    <span>Amount</span>
                    <input 
                        type="number" 
                        name="incomeRemove" 
                        value={form.incomeRemove} 
                        onChange={handleFormChange} 
                        placeholder="Enter amount..." 
                    />
                </div>
                <div className="form-btn-wrap">
                    <button className="form-btn btn" onClick={handleTransaction}>Add transaction</button>
                    <button className="form-btn btn btn-green" onClick={props.updateDB}>Save</button>
                </div>
            </form>
        </div>
    )
}
