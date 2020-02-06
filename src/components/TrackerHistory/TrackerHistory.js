import React, { useState, useEffect } from 'react';

export default function TrackerHistory(props) {
    
    const {expense} = props;
    const [historyExpenses, setHistoryExpenses] = useState([]);

    useEffect(() => {
        setHistoryExpenses(
            addExpense()
        );
        // console.log('historyExpenses ', historyExpenses);
    }, [expense]);

    function addExpense() {
        let arr = [...historyExpenses, expense];
        return arr;
    }
    
    function removeTransaction() {
        console.log('remove transaction');
    }
    return (
        <div className="tracker-history">
            <h3 className="tracker-history__title">History</h3>
            <ul id="tracker-history" className="tracker-history__list">
                {   historyExpenses.length > 0 ?
                    historyExpenses.map((item, i) => (
                        <li key={i+1} className="tracker-history__list-item icon-plus">
                            <div className="tracker-history__list-item-text">
                                {item[0]} <span>+{item[1]}$</span>
                            </div>
                            <button className="tracker-history__list-item-btn btn-delete" title="Remove" onClick={removeTransaction}>x</button>
                        </li>
                    ))
                    : []
                }
                
            </ul>
        </div>
    )
}
