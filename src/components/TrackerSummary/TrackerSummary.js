import React from 'react';
import './TrackerSummary.scss';

export default function TrackerSummary({summary, totalExpenses}) {
    
    return (
        <div>
            <h2 className="centered">Summary:</h2>
            <ul>
                {summary.map((item, i) => {
                    return(
                    <li key={i}>{item.name} - {(item.ammount / totalExpenses * 100).toFixed(2)}%</li>
                    )
                })}
            </ul>
        </div>
    )
}
