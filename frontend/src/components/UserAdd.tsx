import React from 'react';
import {Box, Button, IconButton, TextField, Typography} from "@mui/material";
import Cookies from 'js-cookie';
import axios from "axios";

import CloseIcon from '@mui/icons-material/Close';

interface State {
    username: string,
    email: string,
    password: string,
}

const UserAdd: React.FC<{ handleOpenCloseUser: any }> = ({handleOpenCloseUser}) => {
    const [state, setState] = React.useState<State>({
        username: "",
        email: "",
        password: ""
    });

    const fetchRegister = async () => {
        try {
            const token = Cookies.get('token');

            const response = await axios.post('http://localhost:5000/auth/register', state, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response && response.data) {

                setState((prevState) => ({
                    ...prevState,
                    username: '',
                    email: '',
                    password: '',
                }));
            }
            handleOpenCloseUser();
        } catch (error: any) {
            alert("Kullanıcı eklenirken hata oluştu.")

        }
    };
    return (
        <Box sx={{}}>
            <Box sx={{marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#113c5e'
                }}> Kullanıcı Ekle</Typography>
                <IconButton onClick={handleOpenCloseUser}>
                    <CloseIcon></CloseIcon>
                </IconButton>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
                <TextField
                    onChange={(e: any) => setState((prevState: any) => ({...prevState, username: e.target.value}))}
                    sx={{width: '100%', marginBottom: '10px'}} label={"Kullanıcı Adı"}></TextField>
                <TextField onChange={(e: any) => setState((prevState: any) => ({...prevState, email: e.target.value}))}
                           sx={{width: '100%', marginBottom: '10px'}} label={"E-Posta"}></TextField>
                <TextField
                    onChange={(e: any) => setState((prevState: any) => ({...prevState, password: e.target.value}))}
                    sx={{width: '100%', marginBottom: '10px'}} label={"Şifre"}></TextField>
                <Button sx={{width: '100%', backgroundColor: '#00b7eb', color: 'white'}}
                        onClick={fetchRegister}>Ekle</Button>
            </Box>

        </Box>
    );
};

export default UserAdd;