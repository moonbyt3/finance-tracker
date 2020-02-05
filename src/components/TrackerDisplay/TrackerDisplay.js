import React, { useState } from 'react';

export default function TrackerDisplay(props) {
   
    return (
        <div className="tracker-display">
            <div className="tracker__display-title">
                <h4>Your Balance</h4>
                <h1 id="balance">${props.balance}</h1>
            </div>

            <div className="tracker__display">
                <div className="tracker__display-item">
                    <span className="tracker__display-item-title">Income <span className="tooltip" title="Last entry: 31.10.2020"><span>?</span></span></span>
                    <p id="money-plus" className="money plus">${props.balance}</p>
                </div>
                <div className="tracker__display-item">
                    <span className="tracker__display-item-title">Expense</span>
                    <p id="money-minus" className="money minus">$44.00</p>
                </div>
            </div>
        </div>
    )
}
