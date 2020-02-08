import React, { useState, useEffect } from 'react';

export default function TrackerHistory(props) {
    const {expense, handleDeleteHistoryItem} = props;

    function removeTransaction(e) {
        let historyItemAmount = e.target.amount;
        let historyItemIndex = Number(e.target.name);
        handleDeleteHistoryItem(historyItemAmount, historyItemIndex);
    }
    return (
        <div className="tracker-history">
            <h3 className="tracker-history__title">History</h3>
            <ul id="tracker-history" className="tracker-history__list">
                {   expense.length > 0 ?
                    expense.map((item, i) => (
                        <li key={i} className="tracker-history__list-item icon-plus">
                            <div className="tracker-history__list-item-text">
                                {item[0]} <span>+{item[1]}$</span>
                            </div>
                            <button className="tracker-history__list-item-btn btn-delete" name={i} amount={item[0]} title="Remove" onClick={removeTransaction}>x</button>
                        </li>
                    ))
                    : []
                }
                
            </ul>
        </div>
    )
}
