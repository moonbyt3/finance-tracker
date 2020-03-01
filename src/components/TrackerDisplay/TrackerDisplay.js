import React from 'react';

export default function TrackerDisplay({balance, income, expenseAmount, incomeDate}) {
    return (
        <div className="tracker-display">
            <div className="tracker__display-title">
                <h4 className="tracker__display-title-text">Your Balance:</h4>
                <h1 className="tracker__display-title-number" id="balance">${balance}</h1>
            </div>

            <div className="tracker__display">
                <div className="tracker__display-item">
                    <span className="tracker__display-item-title">Income <span className="tooltip" title={'Last entry: ' + incomeDate}><span>?</span></span></span>
                    <p id="money-plus" className="color-green">${income}</p>
                </div>
                <div className="tracker__display-item">
                    <span className="tracker__display-item-title">Expense</span>
                    <p id="money-minus" className="color-red">${expenseAmount}</p>
                </div>
            </div>
        </div>
    )
}
