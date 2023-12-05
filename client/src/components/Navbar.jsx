import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/compare-mutual-funds">CompareMutualFunds</Link>
                </li>
                <li>
                    <Link to="/">Homepage</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;