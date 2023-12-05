import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const HomePage = ({ signin, user }) => {
    const navigate = useNavigate();
    console.log(signin);
    useEffect(() => {
        if (!signin) {
            navigate('/login');
        }
    }, [])


    return (
        <>
            <Navbar />
            <div>HomePage</div>
        </>

    )
}

export default HomePage