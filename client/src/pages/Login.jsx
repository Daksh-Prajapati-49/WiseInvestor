import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({ setSignin, setUser }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username : name,
                password,
                email,
            }),
        });
        
        console.log(response);
        if (response.status === 200) {
            const data = await response.json();
            console.log(data);
            setSignin(true);
            setUser({
                name: data.username,
                email: data.email,
                id: data._id,
            });
            navigate('/'); // Redirect to / page
        }
    }

    return (
        <>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br/>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br/>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login