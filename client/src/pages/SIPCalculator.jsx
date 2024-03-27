import React, { useState , useEffect } from 'react';
import './SIPCalculator.css'; // Import the CSS file
import Navbar from '../components/Navbar';
import Chart from 'chart.js/auto';

const SIPCalculator = () => {
    const [principal, setPrincipal] = useState('');
    const [rateOfInterest, setRateOfInterest] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [monthlyInvestment, setMonthlyInvestment] = useState('');
    const [yearlyAmounts, setYearlyAmounts] = useState([]);

    useEffect(() => {
        if (yearlyAmounts.length > 0) {
            renderChart();
        }
    }, [yearlyAmounts]);

    const calculateTotalAmount = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rateOfInterest) / 100 / 12;
        const n = parseFloat(timePeriod) * 12;
        const monthlyInvestmentAmount = parseFloat(monthlyInvestment);

        let year = 1;
        let totalAmount = p;
        let amounts = [];

        for (let i = 0; i < n; i++) {
            totalAmount = (totalAmount + monthlyInvestmentAmount) * (1 + r);
            if ((i + 1) % 12 === 0) {
                amounts.push({ year, amount: totalAmount.toFixed(2) });
                year++;
            }
        }

        setYearlyAmounts(amounts);
    };

    const renderChart = () => {
        const years = yearlyAmounts.map((item) => item.year);
        const amounts = yearlyAmounts.map((item) => parseFloat(item.amount));

        const ctx = document.getElementById('sipChart');

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
            <h2>SIP Calculator</h2>
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
            <div className="form-group">
                <label htmlFor="monthlyInvestment">Monthly Investment:</label>
                <input type="number" id="monthlyInvestment" value={monthlyInvestment} onChange={(e) => setMonthlyInvestment(e.target.value)} />
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

            {yearlyAmounts.length > 0 && <canvas id="sipChart" width="400" height="200"></canvas>}
        
        </div>
        </>
    );
};

export default SIPCalculator;
