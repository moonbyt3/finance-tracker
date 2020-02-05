import React, { useState } from 'react';

import './tracker.scss';

import TrackerDisplay from '../TrackerDisplay/TrackerDisplay';
import TrackerHistory from '../TrackerHistory/TrackerHistory';
import TrackerAddTransaction from '../TrackerAddTransaction/TrackerAddTransaction';

export default function Tracker() {
    const [income, setIncome] = useState(0);
    const [incomeDate, setIncomeDate] = useState('');
    const handleIncome = (value) => {
        setIncome(Number(income) + Number(value));
        setIncomeDate(new Date().toLocaleDateString())
    }
    return (
        <div className="container">
            <div className="tracker">
                <TrackerDisplay income={income} incomeDate={incomeDate}/>
                <TrackerHistory />
                <TrackerAddTransaction income={income} handleIncome={handleIncome}  />
            </div>
        </div>
    )
}
