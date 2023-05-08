import React, { useState, MouseEvent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Link, useNavigate } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function Navbar({ user, logMeOut }) {
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null);

    const navigate = useNavigate()

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

    const makeDropDownNavMenu = () => {

        console.log("print user")
        console.log(user)
        console.log(Object.keys(user).length==0)
        if (Object.keys(user).length != 0) {
            return (
                <>
                    <Link style={{color:"black",textDecoration:"none"}} to="/"
                    >
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">My Cart</Typography>
                    </MenuItem>
                    </Link>
                    <MenuItem onClick={() => {
                        logMeOut();
                        handleCloseNavMenu();
                        navigate("/login")
                    }}>
                        <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                    
                </>
            )
        } else {
            return (
                <>
                    <Link style={{ color: "black", textDecoration: "none" }} to="/login">
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Login</Typography>
                    </MenuItem>
                    </Link>
                    <Link style={{ color: "black", textDecoration: "none" }} to="/signup">
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">Sign Up</Typography>
                    </MenuItem>
                    </Link >
                </>
            )

        }
    }

    return (
        <AppBar position='static' sx={{ mb: "10px" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <RocketLaunchIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link
                            style={{ color: "white", textDecoration: "none" }}
                            to="/"
                        >
                            DactylGoods
                        </Link>
                    </Typography>

                    {/* Menu Small Screens */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {makeDropDownNavMenu()}
                        </Menu>
                    </Box>
                    {/* Rocket Icon Small Screens */}
                    <RocketLaunchIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />

                    {/* Text for small screen */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Link
                            style={{ color: "white", textDecoration: "none" }}
                            to="/"
                        >
                            DactylGoods
                        </Link>
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {Object.keys(user).length != 0 ?
                            <>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/">
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >My Cart
                                </Button>
                                </Link>
                                <Button
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        logMeOut();
                                        navigate("/login");
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >Logout
                                </Button>

                            </>
                            :
                            <>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/login">
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >Login
                                </Button>
                                </Link>
                                <Link style={{ color: "white", textDecoration: "none" }} to="/signup">
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >Sign Up
                                </Button>
                                </Link>
                            </>
                        }
                        
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}


