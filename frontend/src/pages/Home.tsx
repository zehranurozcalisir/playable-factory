import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, IconButton, Snackbar, SnackbarCloseReason} from "@mui/material";
import Filter from "../components/Filter.tsx";
import ContentBox from "../components/ContentBox.tsx";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from 'js-cookie';
import axios from "axios";

interface State {
    isSnackBar: boolean,
    responseMessage: string,
    loading: boolean,
    beDoneLoading: boolean,
    progressLoading: boolean,
    doneLoading: boolean,
    isSend: boolean,
    tagValue: number,
    infoMessage: string,
    userId: string,
    beDoneData: [],
    progressData: [],
    doneData: [],
    beDonePagination: any,
    progressPagination: any,
    donePagination: any,
    repeatFetch: boolean,
    repeatValue:number,
    allUpdate:boolean,
    tagFilter:number[],
    selectedTask:any[]
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

const Home: React.FC = () => {
    const [state, setState] = useState<State>({
        isSnackBar: false,
        responseMessage: "",
        loading: true,
        beDoneLoading: true,
        progressLoading: true,
        doneLoading: true,
        isSend: false,
        tagValue: 4,
        infoMessage: '',
        userId: '',
        progressData: [],
        doneData: [],
        beDoneData: [],
        beDonePagination: {
            "total": 0,
            "perPage": 3,
            "currentPage": 1,
            "totalPages": 0
        },
        donePagination: {
            "total": 0,
            "perPage": 3,
            "currentPage": 1,
            "totalPages": 0
        },
        progressPagination: {
            "total": 0,
            "perPage": 3,
            "currentPage": 1,
            "totalPages": 0
        },
        repeatFetch: false,
        repeatValue:3,
        allUpdate:false,
        tagFilter: [0, 1, 2],
        selectedTask:[]
    });
    const fetchTasks = async (value: number) => {
        setState((prevState) => ({
            ...prevState,
            isSend: true,
        }));
        if (value == 0) {
            setState((prevState) => ({
                ...prevState,
                beDoneLoading: true,
                beDoneData:[]
            }));
        } else if (value == 1) {
            setState((prevState) => ({
                ...prevState,
                progressLoading: true,
                progressData:[],
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                doneLoading: true,
                doneData:[]
            }));
        }
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.error("Token bulunamadı!");
                return;
            }
            const response = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    perPage: value == 0 ? state.beDonePagination.perPage : value == 1 ? state.progressPagination.perPage : state.donePagination.perPage,
                    page: value == 0 ? state.beDonePagination.currentPage : value == 1 ? state.progressPagination.currentPage : state.donePagination.currentPage,
                    infoMessage: state.infoMessage,
                    tagValue: value,
                    userId: state.userId,
                },
            });
            if (response && response.data) {
                const newData = response.data.data.map((item: any) => ({
                    ...item,
                }));
                if (value == 0) {
                    setState((prevState: any) => ({

                        ...prevState,
                        beDoneData: [...prevState.beDoneData, ...newData],
                        beDonePagination: response.data.pagination
                    }));
                } else if (value == 1) {
                    setState((prevState: any) => ({
                        ...prevState,
                        progressData: [...prevState.progressData, ...newData],
                        progressPagination: response.data.pagination
                    }));
                } else if (value == 2) {
                    setState((prevState: any) => ({
                        ...prevState,
                        doneData: [...prevState.doneData, ...newData],
                        donePagination: response.data.pagination
                    }));
                }
            }
            setState((prevState) => ({
                ...prevState,
                loading: false,
                doneLoading: false,
                progressLoading: false,
                beDoneLoading: false
            }));
        } catch (error) {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                doneLoading: false,
                progressLoading: false,
                beDoneLoading: false
            }));
        }
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

    useEffect(() => {
        if (state.isSend) {
            for (let i = 0; i < 3; i++) {
                fetchTasks(i);
            }
        }

    }, [state.isSend]);
    useEffect(() => {
       if(state.allUpdate){
           for (let i = 0; i < 3; i++) {
               fetchTasks(i);
           }
       }else{
           if (state.isSend) {
               fetchTasks(state.repeatValue);
           }
       }
    }, [state.repeatFetch, state.beDonePagination.currentPage , state.donePagination.currentPage , state.progressPagination.currentPage]);

    useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            isSend: true
        }));
        const token = getCookie('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                setState((prevState) => ({
                        ...prevState,
                        userId: decoded.id,
                    })
                )
            }
        }
    }, []);

    return (
        <Box sx={{minHeight: "95vh", padding: '20px', boxSizing: 'border-box'}}>
            <Filter fetchTasks={fetchTasks} stateHome={state} setStateHome={setState}/>
            {state.loading ?
                <Box sx={{
                    height: '80vh',
                    padding: '20px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: {xs: 'column', sm: 'row', md: 'row'},
                }}>
                    <CircularProgress size={30}></CircularProgress>
                </Box>

                :
                <>
                    <Box sx={{
                        height: '80vh',
                        padding: '20px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: {xs: 'column', sm: 'row', md: 'row'},
                    }}>
                        {state.tagFilter.includes(0) ?
                            <ContentBox stateImport={state} setStateImport={setState} loading={state.beDoneLoading}
                                        data={state.beDoneData} stateValue={0} pagination={state.beDonePagination}/>
                            : null
                        }
                        {state.tagFilter.includes(1) ?
                        <ContentBox stateImport={state} setStateImport={setState} loading={state.progressLoading}
                                    stateValue={1}  data={state.progressData} pagination={state.progressPagination}/>
                            : null }
                        {state.tagFilter.includes(2) ?
                            <ContentBox stateImport={state} setStateImport={setState} loading={state.doneLoading}
                                    stateValue={2}  data={state.doneData} pagination={state.donePagination}/>
                            : null}
                    </Box>
                    <Snackbar
                        open={state.isSnackBar}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={state.responseMessage}
                        action={action}
                    />

                </>}
        </Box>
    );
};

export default Home;
