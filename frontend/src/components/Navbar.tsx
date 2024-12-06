import React, {useEffect} from 'react';
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import {Logout, PersonAdd, Settings} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';

interface State {
    userName: string;
    email: string;
}

const decodeToken = (token: string) => {
    try {
        const base64Payload = token.split('.')[1];
        const decodedPayload = atob(base64Payload);

        return JSON.parse(decodedPayload);
    } catch (error) {
        return null;
    }
};

const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};


const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [state, setState] = React.useState<State>({
        userName: "",
        email: "",
    })

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        window.location.href = "/login";
    }

    useEffect(() => {
        const token = getCookie('token');

        if (token) {
            const decoded = decodeToken(token);

            if (decoded) {
                setState((prevState) => ({
                        ...prevState,
                        userName: decoded.username,
                        email: decoded.email,
                    })
                )
            }
        }
    }, []);

    return (

        <Box sx={{
            width: '100%',
            height: '5vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px',
            boxSizing: 'border-box',
            backgroundColor: '#113c5e'
        }}>
            <Box>
                <img src='/img/logo.png' style={{height: '3vh'}} alt='Logo'/>
            </Box>
            <Box>
                <Tooltip title="Hesap">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <PersonIcon sx={{color: 'white'}}/>
                    </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    slotProps={{
                        paper: {
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        },
                    }}
                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                >
                    <Box sx={{
                        padding: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}>
                        <Box sx={{fontWeight: 'bold'}}> {state.userName}</Box>
                        <Box>{state.email}</Box>
                    </Box>

                    <Divider/>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <PersonAdd fontSize="small"/>
                        </ListItemIcon>
                        Kullanıcı Ekle
                    </MenuItem>
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Çıkış Yap
                    </MenuItem>
                </Menu></Box>
        </Box>

    );
};

export default Navbar;
