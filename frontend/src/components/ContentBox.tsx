import React, {useState} from 'react';
import {Box, CircularProgress, IconButton, Modal, Pagination, Typography} from "@mui/material";
import ContentCart from "./ContentCart.tsx";
import AddIcon from '@mui/icons-material/Add';
import OperationModal from "./OperationModal.tsx";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import axios from "axios";
import Cookies from 'js-cookie';

const ContentBox: React.FC<{
    stateImport: any,
    setStateImport: any,
    stateValue: number,
    loading: boolean,
    data: [],
    pagination: any
}> = ({stateImport, setStateImport, stateValue, loading, data, pagination}) => {

    const [open, setOpen] = useState(false);
    const handleOpen = (value: number) => {

        setOpen(true);
    }

    const handleClose = () => setOpen(false);

    const handlePageChange = (event: any, value: any) => {
        if (stateValue == 0) {

            setStateImport((prevState: any) => ({
                ...prevState,
                beDonePagination: {
                    ...prevState.beDonePagination,
                    currentPage: value,
                },
                repeatFetch: !prevState.repeatFetch,
                repeatValue: 0,
                allUpdate: false,

            }))
        } else if (stateValue == 1) {
            setStateImport((prevState: any) => ({
                ...prevState,
                progressPagination: {
                    ...prevState.progressPagination,
                    currentPage: value,
                },
                repeatFetch: !prevState.repeatFetch,
                repeatValue: 1,
                allUpdate: false,

            }))
        } else {
            setStateImport((prevState: any) => ({
                ...prevState,
                donePagination: {
                    ...prevState.donePagination,
                    currentPage: value,

                },
                repeatFetch: !prevState.repeatFetch,
                repeatValue: 2,
                allUpdate: false,


            }))
        }
    };
    const updateLeft = async () => {

        try {
            const token = Cookies.get('token');
            const tasks = stateImport.selectedTask;
            const tagValue = stateValue === 1 ? 0 : stateValue === 2 ? 1 : null;

            for (const taskId of tasks) {
                const formData = new FormData();

                formData.append('tagValue', tagValue);
                formData.append('userId', stateImport.userId);


                if (stateImport.files) {
                    formData.append('file', stateImport.files);
                }
                if (stateImport.image) {
                    formData.append('image', stateImport.image);
                }


                const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });


            }

            setStateImport((prevState: any) => ({
                ...prevState,
                isSnackBar: true,
                responseMessage: 'Tüm görevler başarıyla güncellendi.',
                repeatFetch: !prevState.repeatFetch,
                allUpdate: true,
                selectedTask: []
            }));
        } catch (error) {

            setStateImport((prevState: any) => ({
                ...prevState,
                isSnackBar: true,
                responseMessage: 'Tüm görevler güncellenirken hata oluştu.',
                selectedTask: []

            }));
        }


    }
    const updateRight = async () => {
        try {
            const token = Cookies.get('token');
            const tasks = stateImport.selectedTask;
            const tagValue = stateValue === 0 ? 1 : stateValue === 1 ? 2 : null;

            if (!tagValue) {
                console.error("Geçersiz stateValue. İşlem durduruldu.");
                return;
            }

            for (const taskId of tasks) {
                const formData = new FormData();

                formData.append('tagValue', tagValue);
                formData.append('userId', stateImport.userId);

                if (stateImport.files) {
                    formData.append('file', stateImport.files);
                }
                if (stateImport.image) {
                    formData.append('image', stateImport.image);
                }

                const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
            }

            setStateImport((prevState: any) => ({
                ...prevState,
                isSnackBar: true,
                responseMessage: 'Tüm görevler başarıyla güncellendi.',
                repeatFetch: !prevState.repeatFetch,
                allUpdate: true,
                selectedTask: []
            }));
        } catch (error) {

            setStateImport((prevState: any) => ({
                ...prevState,
                isSnackBar: true,
                responseMessage: 'Tüm görevler güncellenirken hata oluştu.',
                selectedTask: []

            }));
        }
    };


    return (
        <Box sx={{
            height: {xs: '80vh', sm: '75vh', md: '75vh'},
            width: {
                xs: '100%',
                sm: '30%',
                md: stateImport.tagFilter.length == 3 ? '30%' : stateImport.tagFilter.length == 2 ? '48%' : '100%'
            },
            backgroundColor: '#faf8f8',
            border: 'none',
            borderRadius: '10px',
            padding: '10px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            marginBottom: {xs: '10px', sm: 0, md: 0}
        }}>
            <Box sx={{
                padding: '10px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                <Typography
                    sx={{color: '#4e4e4e'}}>{stateValue == 0 ? 'Yapılacaklar' : stateValue == 1 ? 'Bekleyenler' : 'Tamamlananlar'} ({pagination.total})</Typography>
                {stateValue == 1 || stateValue == 2 ?
                    <IconButton onClick={updateLeft}>
                        <ArrowBackIosNewIcon/>
                    </IconButton> : null
                }
                {stateValue == 0 || stateValue == 1 ?
                    <IconButton onClick={updateRight}>
                        <ArrowForwardIosIcon/>
                    </IconButton> : null
                }

                <IconButton onClick={() => handleOpen(0)}>
                    <AddIcon/>
                </IconButton>
            </Box>
            {loading ?
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%'
                }}>
                    <CircularProgress size={20}></CircularProgress>
                </Box>
                :
                <Box sx={{
                    padding: '10px',
                    height: '100%',
                    width: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    {data.map((value: any) => (
                        <ContentCart setStateHome={setStateImport} stateHome={stateImport} key={value.id} value={value}
                                     stateValue={stateValue}/>
                    ))}

                    {data.length > 0 ?
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'end',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                            <Pagination onChange={handlePageChange} page={pagination.currentPage}
                                        count={pagination.totalPages}/>
                        </Box>
                        :
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            alignItems: 'end',
                            flexDirection: 'column',
                            width: '100%'
                        }}>
                        </Box>}

                </Box>

            }
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: {xs: '80%', sm: '30%', md: '30%'},
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >

                    <OperationModal value={null} stateValue={stateValue} modalValue={0} handleClose={handleClose}
                                    setStateHome={setStateImport} stateHome={stateImport}/>

                </Box>
            </Modal>
        </Box>
    );
};

export default ContentBox;