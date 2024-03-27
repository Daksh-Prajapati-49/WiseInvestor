import React, { useState, useEffect } from 'react';
import './LumpSumCalculator.css'; // Import the CSS file
import Chart from 'chart.js/auto';
import Navbar from '../components/Navbar';

const LumpSumCalculator = () => {
    const [principal, setPrincipal] = useState('');
    const [rateOfInterest, setRateOfInterest] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [yearlyAmounts, setYearlyAmounts] = useState([]);

    useEffect(() => {
        if (yearlyAmounts.length > 0) {
            renderChart();
        }
    }, [yearlyAmounts]);

    const calculateTotalAmount = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rateOfInterest) / 100;
        const n = parseFloat(timePeriod);

        let year = 1;
        let totalAmount = p;
        let amounts = [];

        for (let i = 0; i < n; i++) {
            totalAmount = totalAmount * (1 + r);
            amounts.push({ year, amount: totalAmount.toFixed(2) });
            year++;
        }

        setYearlyAmounts(amounts);
    };

    const renderChart = () => {
        const years = yearlyAmounts.map((item) => item.year);
        const amounts = yearlyAmounts.map((item) => parseFloat(item.amount));

        const ctx = document.getElementById('lumpSumChart');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Yearly Amount',
                        data: amounts,
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        tension: 0.4,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    };

    return (
        <>
        <Navbar/>
        <br/>
        <div className="container">
            <h2>Lump Sum Calculator</h2>
            <div className="form-group">
                <label htmlFor="principal">Principal Amount:</label>
                <input type="number" id="principal" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="rateOfInterest">Rate of Interest (% p.a.):</label>
                <input type="number" id="rateOfInterest" value={rateOfInterest} onChange={(e) => setRateOfInterest(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="timePeriod">Time Period (years):</label>
                <input type="number" id="timePeriod" value={timePeriod} onChange={(e) => setTimePeriod(e.target.value)} />
            </div>
            <button onClick={calculateTotalAmount}>Calculate</button>
            {yearlyAmounts.length > 0 && (
                <div>
                    <h3>Year-wise Amounts</h3>
                    <ul>
                        {yearlyAmounts.map((item) => (
                            <li key={item.year}>
                                Year {item.year}: ${item.amount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {yearlyAmounts.length > 0 && <canvas id="lumpSumChart" width="400" height="200"></canvas>}
        </div>
        </>
    );
};

export default LumpSumCalculator;
