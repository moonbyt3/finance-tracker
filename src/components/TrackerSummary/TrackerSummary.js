import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import './TrackerSummary.scss';

export default function TrackerSummary({summary, totalExpenses}) {
    
    return (
        <div>
            <h2 className="centered">Summary:</h2>
            <BarChart
                width={300}
                height={300}
                data={summary}
                margins={{left: -40}}
            >
                <CartesianGrid strokeDasharray="1 1" />
                <XAxis dataKey="name" />
                <YAxis width={40}/>
                <Tooltip />
                <Legend />
                <Bar dataKey="amount" name="Money spent" fill="#2196f3 " label/>
            </BarChart>
        </div>
    )
}
