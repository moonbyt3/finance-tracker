import React, { useState } from 'react';

import './tracker.scss';

import TrackerDisplay from '../TrackerDisplay/TrackerDisplay';
import TrackerHistory from '../TrackerHistory/TrackerHistory';
import TrackerAddTransaction from '../TrackerAddTransaction/TrackerAddTransaction';

export default function Tracker() {
    const [balance, setBalance] = useState(0);
    const [income, setIncome] = useState(0);
    const handleBalance = (value) => {
        setBalance(Number(balance) + Number(value));
    }
    return (
        <div className="container">
            <div className="tracker">
                <TrackerDisplay balance={balance} income={income}/>
                <TrackerHistory />
                <TrackerAddTransaction balance={balance} customProp={handleBalance}/>
            </div>
        </div>
    )
}
