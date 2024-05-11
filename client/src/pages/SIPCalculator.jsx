import React, { useState, useEffect } from 'react';
import './SIPCalculator.css'; 
import Navbar from '../components/Navbar';
import Chart from 'chart.js/auto';
import { LineChart } from '@mui/x-charts/LineChart';

const SIPCalculator = ({user, setUser}) => {
    const [principal, setPrincipal] = useState('');
    const [rateOfInterest, setRateOfInterest] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [monthlyInvestment, setMonthlyInvestment] = useState('');
    const [yearlyAmounts, setYearlyAmounts] = useState([]);
    const [timeline, setTimeline] = useState([]);

    // useEffect(() => {
    //     if (yearlyAmounts.length > 0) {
    //         renderChart();
    //     }
    // }, [yearlyAmounts]);

    const calculateTotalAmount = () => {
        // setState({ yearlyAmounts: [] });
        setYearlyAmounts([]);
        const p = parseFloat(principal);
        const r = parseFloat(rateOfInterest) / 100 / 12;
        const n = parseFloat(timePeriod) * 12;
        const monthlyInvestmentAmount = parseFloat(monthlyInvestment);

        let year = 1;
        let totalAmount = p;
        let amounts = [];
        let yr = [];

        for (let i = 0; i < n; i++) {
            totalAmount = (totalAmount + monthlyInvestmentAmount) * (1 + r);
            if ((i + 1) % 12 === 0) {
                amounts.push(totalAmount.toFixed(2));
                yr.push(year);
                year++;
            }
        }

        setYearlyAmounts(amounts);
        setTimeline(yr);
    };


    return (
        <>
            <Navbar user = {user} setUser={setUser} />
            <br />
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


                {
                    yearlyAmounts.length > 0
                    &&
                    (
                        <LineChart
                            xAxis={[{ data: timeline }]}
                            series={[
                                {
                                    id: 'Amount',
                                    label: 'Amount',
                                    data: yearlyAmounts,
                                    area: true,
                                },
                            ]}
                            width={500}
                            height={300}
                        />
                    )
                }
            </div>
        </>
    );
};

export default SIPCalculator;
