import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { Link as Lik } from 'react-router-dom';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                FundFusion
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();


const Login = ({ setSignin, setUser }) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: name,
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
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Lik to="/forgot-password" variant="body2">
                                        Forgot password?
                                    </Lik>
                                </Grid>
                                <Grid item>
                                    {/* <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link> */}
                                    <Lik to="/register" >{"Don't have an account? Sign Up"}</Lik>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

// const Login = ({ setSignin, setUser }) => {
//     const [name, setName] = useState("");
//     const [password, setPassword] = useState("");
//     const [email, setEmail] = useState("");
//     const navigate = useNavigate();



//     // Pasted as it is from material Ui 
//     const [showPassword, setShowPassword] = React.useState(false);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleMouseDownPassword = (event) => {
//         event.preventDefault();
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch("http://localhost:5000/api/auth/login", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 username: name,
//                 password,
//                 email,
//             }),
//         });

//         console.log(response);
//         if (response.status === 200) {
//             const data = await response.json();
//             console.log(data);
//             setSignin(true);
//             setUser({
//                 name: data.username,
//                 email: data.email,
//                 id: data._id,
//             });
//             navigate('/'); // Redirect to / page
//         }
//     }

//     return (
//         <>
//             <div>
//                 <h1>Login</h1>
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         id="outlined-multiline-flexible"
//                         label="Name"
//                         multiline
//                         maxRows={4}
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                     <br />
//                     <TextField
//                         id="outlined-multiline-flexible"
//                         label="Email"
//                         multiline
//                         maxRows={4}
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <br />
//                     <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
//                         <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
//                         <OutlinedInput
//                             id="outlined-adornment-password"
//                             type={showPassword ? 'text' : 'password'}
//                             endAdornment={
//                                 <InputAdornment position="end">
//                                     <IconButton
//                                         aria-label="toggle password visibility"
//                                         onClick={handleClickShowPassword}
//                                         onMouseDown={handleMouseDownPassword}
//                                         edge="end"
//                                     >
//                                         {showPassword ? <VisibilityOff /> : <Visibility />}
//                                     </IconButton>
//                                 </InputAdornment>
//                             }
//                             label="Password"
//                         />
//                     </FormControl>
//                     <br />
//                     <button type="submit">Login</button>
//                 </form>
//             </div>
//         </>
//     )
// }

export default Login