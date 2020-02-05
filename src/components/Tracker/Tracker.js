import React from 'react';
import Select from 'react-select';
import $ from 'jquery';
import './tracker.scss';

export default function Tracker(props) {
    const options = [
        { value: 'expense', label: 'Add Expense' },
        { value: 'income', label: 'Add Income' },
    ];
    function changeTransactionView(e) {
        console.log('changeTransactionView', e);
        let views = $('[data-transaction-view]');
        for (let view of views) {
            $(view).hide();
        }
        $(`[data-transaction-view="${e.value}"]`).fadeIn();
        
    }
    function removeTransaction() {
        console.log('remove transaction');
        
    }
    return (
        <div className="container">
            <div className="tracker">
                <div className="tracker-display">
                    <div className="tracker__display-title">
                        <h4>Your Balance</h4>
                        <h1 id="balance">$32.00</h1>
                    </div>

                    <div className="tracker__display">
                        <div className="tracker__display-item">
                            <span className="tracker__display-item-title">Income <span className="tooltip" title="Last entry: 31.10.2020"><span>?</span></span></span>
                            <p id="money-plus" className="money plus">$16.00</p>
                        </div>
                        <div className="tracker__display-item">
                            <span className="tracker__display-item-title">Expense</span>
                            <p id="money-minus" className="money minus">$44.00</p>
                        </div>
                    </div>
                </div>

                <div className="tracker-history">
                    <h3 className="tracker-history__title">History</h3>
                    <ul id="tracker-history" className="tracker-history__list">
                        <li className="tracker-history__list-item icon-plus">
                            <div className="tracker-history__list-item-text">
                                Theatre tickets <span>+42$</span>
                            </div>
                            <button className="tracker-history__list-item-btn btn-delete" title="Remove" onClick={removeTransaction}>x</button>
                        </li>
                        <li className="tracker-history__list-item icon-minus">
                            <div className="tracker-history__list-item-text">
                                Bus tickets <span>+2$</span>
                            </div>
                            <button className="tracker-history__list-item-btn btn-delete" title="Remove" onClick={removeTransaction}>x</button>
                        </li>
                    </ul>
                </div>

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
                            <input type="ammount" id="ammount" placeholder="Enter ammount..." />
                        </div>
                        <div className="form-control tracker-add-trans__form-item" data-transaction-view="income">
                            <span>Amount</span>
                            <input type="number" id="amount" placeholder="Enter amount..." />
                        </div>
                        <button className="btn">Add transaction</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
