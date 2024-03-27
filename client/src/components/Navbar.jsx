import React, { useState } from "react";
import { Link } from "react-router-dom";

// import * as React from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import InsightsIcon from "@mui/icons-material/Insights";
import { useNavigate } from "react-router-dom";

const pages = ["Home", "Compare-Mutual-Funds", "SIP Calculator"];
const settings = ["Profile", "Logout"];

function Navbar() {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <InsightsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        FundFusion
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {/* {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))} */}
                            <MenuItem onClick={() => navigate("/compare-mutual-funds")}>
                                <Typography textAlign="center">CompareMutualFunds</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/sip-calculator")}>
                                <Typography textAlign="center">SIP Calculator</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/")}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => navigate("/lump-sum-calculator")}>
                                <Typography textAlign="center">LumpSum Calculator</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <InsightsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        FundFusion
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Button
                            sx={{ my: 2, color: "white", display: "block" }}
                            onClick={handleCloseNavMenu}
                        >
                            <Typography textAlign="center" onClick={() => navigate("/")}>Home</Typography>
                            {/* <Link to="/">Home</Link> */}
                        </Button>
                        <Button
                            sx={{ my: 2, color: "white", display: "block" }}
                            onClick={handleCloseNavMenu}
                        >
                            <Typography textAlign="center" onClick={() => navigate("/compare-mutual-funds")}>CompareMutualFunds</Typography>
                            {/* <Link to="/compare-mutual-funds">CompareMutualFunds</Link> */}
                        </Button>
                        <Button
                            sx={{ my: 2, color: "white", display: "block" }}
                            onClick={handleCloseNavMenu}
                        >
                        <Typography textAlign="center" onClick={() => navigate("/sip-calculator")}>SIP Calculator</Typography>
                            {/* <Link to="/sip-calculator">SIP Calculator</Link> */}
                        </Button>
                        <Button
                            sx={{ my: 2, color: "white", display: "block" }}
                            onClick={handleCloseNavMenu}
                            >
                                <Typography textAlign="center" onClick={() => navigate("/lump-sum-calculator")}>LumpSum Calculator</Typography>
                        </Button>

                        {/* {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page}
                            </Button>
                        ))} */}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;

// const Navbar = () => {
//     return (
//         <nav>
//             <ul>
//                 <li>
//                     <Link to="/compare-mutual-funds">CompareMutualFunds</Link>
//                 </li>
//                 <li>
//                     <Link to="/">Homepage</Link>
//                 </li>
//             </ul>
//         </nav>
//     )
// }

// export default Navbar;
