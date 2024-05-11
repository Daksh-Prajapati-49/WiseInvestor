import React, { useState, useEffect } from 'react';
import './LumpSumCalculator.css'; // Import the CSS file
import Chart from 'chart.js/auto';
import Navbar from '../components/Navbar';
import { LineChart } from '@mui/x-charts/LineChart';

const LumpSumCalculator = ({user, setUser}) => {
    const [principal, setPrincipal] = useState('');
    const [rateOfInterest, setRateOfInterest] = useState('');
    const [timePeriod, setTimePeriod] = useState('');
    const [yearlyAmounts, setYearlyAmounts] = useState([]);
    const [timeline, setTimeline] = useState([]);

    useEffect(() => {
        console.log(yearlyAmounts);
        console.log(timeline);
    }, [yearlyAmounts]);

    // useEffect(() => {
    //     setTimeline(generateNumbers(timePeriod+1));
    // }, [timePeriod])

    const calculateTotalAmount = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rateOfInterest) / 100;
        const n = parseFloat(timePeriod);

        let year = 1;
        let totalAmount = p;
        let amounts = [];
        let yr = [];

        for (let i = 0; i < n; i++) {
            totalAmount = totalAmount * (1 + r);
            amounts.push(totalAmount.toFixed(2));
            yr.push(year);
            year++;
        }
        setTimeline(yr);
        setYearlyAmounts(amounts);
    };


    return (
        <>
            <Navbar user = {user} setUser={setUser} />
            <br />
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

export default LumpSumCalculator;
