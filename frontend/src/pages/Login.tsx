import React, {useState} from 'react';
import {Box, Button, Card, IconButton, Snackbar, SnackbarCloseReason, TextField} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

interface State {
    showPassword: boolean;
    userName: string;
    password: string;
    isSnackBar: boolean;
    responseMessage: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();

    const [state, setState] = useState<State>({
        showPassword: false,
        userName: "",
        password: "",
        isSnackBar: false,
        responseMessage: ""
    });

    const handleClick = () => {
        setState((prevState) => ({
            ...prevState,
            isSnackBar: true,
        }));
    };

    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setState((prevState) => ({
            ...prevState,
            isSnackBar: false,
        }));
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                Tamam
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small"/>
            </IconButton>
        </React.Fragment>
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, option: number) => {
        const {value} = e.target;
        if (option === 0) {
            setState((prevState) => ({
                ...prevState,
                userName: value,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                password: value,
            }));
        }
    };

    const fetchLogin = async () => {
        if (state.password === "" || state.userName === "") {

        }
        try {
            const response = await axios.post('http://localhost:5000/auth/login', {
                username: state.userName,
                password: state.password,
            });
            if (response && response.data) {
                Cookies.set('token', response.data.token, {expires: 1});
                setState((prevState) => ({
                    ...prevState,
                    responseMessage: response.data.message,
                }));
                window.location.href = '/home';
                handleClick();
            }
        } catch (error: any) {
            setState((prevState) => ({
                ...prevState,
                responseMessage: error.response.data.message,
            }));
            handleClick();
        }
    };
    return (
        <Box sx={{
            backgroundColor: '#113c5e',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
        }}>

            <Card sx={{
                width: {xs: '90%', sm: '90%', md: '30%'},
                padding: '30px',
                boxSizing: 'border-box',
                height: '50vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>

                <img src={'/img/logo.png'} alt='Logo' style={{height: '15vh'}}/>

                <Box sx={{width: '100%', margin: '20px', boxSizing: 'border-box',}}>
                    <TextField onChange={(e: any) => handleChange(e, 0)} sx={{width: '100%'}} id="outlined-basic"
                               label="Kullanıcı Adı" variant="outlined"/>
                </Box>

                <Box sx={{width: '100%', margin: '20px', boxSizing: 'border-box',}}>
                    <TextField
                        sx={{width: "100%"}}
                        id="outlined-basic"
                        label="Şifre"
                        variant="outlined"
                        onChange={(e: any) => handleChange(e, 1)}
                        type={state.showPassword ? "text" : "password"}

                    />
                </Box>

                <Box sx={{
                    width: '100%',
                    boxSizing: 'border-box',
                    margin: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <Button variant="contained"
                            sx={{height: '50px', width: {xs: '70%', sm: '70%', md: '40%'}, backgroundColor: '#113c5e'}}
                            endIcon={<LoginIcon/>}
                            onClick={fetchLogin}>
                        Giriş Yap
                    </Button>
                </Box>

            </Card>
            <Snackbar
                open={state.isSnackBar}
                autoHideDuration={6000}
                onClose={handleClose}
                message={state.responseMessage}
                action={action}
            />
        </Box>
    );
};

export default Login;
