import React, { useState } from 'react';
import $ from 'jquery';
import Select from 'react-select';

export default function TrackerAddTransaction(props) {
    const [addTransactionAmmount, setAddTransactionAmmount] = useState(0);
    const [transactionType, setTransactionType] = useState('');
    // const [balance, setBalance] = useState(props.balance);
    
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
            props.handleIncome(addTransactionAmmount);
        } else {
            console.log('update history, deduct from balance!');
        }
    }
    function handleTransactionAmmount(e) {
        setAddTransactionAmmount(e.target.value);
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
                    <input type="text" id="text" placeholder="Enter text..." />
                    <span>Amount</span>
                    <input type="ammount" id="expenseAmmount" placeholder="Enter ammount..." />
                </div>
                <div className="form-control tracker-add-trans__form-item" data-transaction-view="income">
                    <span>Amount</span>
                    <input type="number" id="incomeAmmount" defaultValue={addTransactionAmmount} onChange={handleTransactionAmmount} placeholder="Enter amount..." />
                </div>
                <button className="btn" onClick={handleTransaction}>Add transaction</button>
            </form>
        </div>
    )
}
