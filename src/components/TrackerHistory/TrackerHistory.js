import React from 'react'

export default function TrackerHistory() {
    function removeTransaction() {
        console.log('remove transaction');
        
    }
    return (
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
    )
}
