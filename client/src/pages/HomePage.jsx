import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './HomePage.css';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

const HomePage = ({ user, setUser }) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [])


    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <div id="wlc">
                <div id="wlc_hd">Welcome to FundFusion</div>
                <p>Your Financial Planning Companion!</p>
                <div id="wlc_in">
                    <PieChart
                    id="pie_chart"
                        series={[
                            {
                                data: [{ value: 10 }, { value: 15 }, { value: 20 }, { value: 10 }, { value: 15 }, { value: 20 }],
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 250,
                                cx: 150,
                                cy: 150,
                            }
                        ]}
                        width={300}
                        height={300}
                    />
                    <img src="money-growth.png" alt="profile" id="mny_ic" />
                    
                </div>
            </div>
        </>
    )
}

export default HomePage