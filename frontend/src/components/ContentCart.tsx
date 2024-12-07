import React, {useEffect, useState} from 'react';
import {Box, Card, Checkbox, Modal, Tooltip} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Cookies from 'js-cookie';
import OperationModal from "./OperationModal.tsx";
import {State} from "@dnd-kit/core/dist/store";
import InfoModal from "./infoModal.tsx";

const ContentCart: React.FC<{ value: any , setStateHome:any, stateHome:any , stateValue:number }> = ({value,setStateHome ,stateHome,stateValue}) => {
    const [openCartModal, setOpenCartModal] = useState(false);
    const [openInfoModal, setOpenInfoModal] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const handleCartClose = () => setOpenCartModal(false);
    const handleCartOpen = (value:number)=> {

        setOpenCartModal(true);
    }
    const handleInfoClose = () => setOpenInfoModal(false);
    const handleInfoOpen = (value:number)=> {

        setOpenInfoModal(true);
    }
    const fetchDelete = async () => {
        const token = Cookies.get('token');
        try {
            const response = await axios.delete(`http://localhost:5000/api/tasks/${value._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStateHome((prevState: any) => ({
                ...prevState,
                isSnackBar: true,
                responseMessage: 'Görev başarıyla silindi.',
                repeatFetch:!prevState.repeatFetch,
                repeatValue:stateValue,
                allUpdate:false,
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
            }));
        } catch (error) {
            setStateHome((prevState: any) => ({
                ...prevState,
                isSnackBar: true,
                responseMessage: 'Görev silinirken hata oluştu..',
                repeatFetch:!prevState.repeatFetch,
                repeatValue:stateValue,
                allUpdate:false,

            }));

        }
    };
    const handleCheckbox = (taskId:any, event:any) => {
        const isChecked = event.target.checked;

        setStateHome((prevState:any) => {
            const updatedSelectedTask = isChecked
                ? [...prevState.selectedTask, taskId]
                : prevState.selectedTask.filter((task:any) => task !== taskId);

            return {
                ...prevState,
                selectedTask: updatedSelectedTask,
            };
        });
    };


    useEffect(() => {
    }, []);
    return (
        <Card sx={{
            padding: '10px',
            width: '100%',
            boxSizing: 'border-box',
            height: {xs:'30vh' , sm:'20vh', md:'20vh'},
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '5px'
        }}>
            <Box sx={{height: '100%', width: '30%', border: '1px dotted #4e4e4e', overflow: 'hidden'}}>
                <img src={value.image} style={{height: '100%'}}/>
            </Box>
            <Box sx={{
                height: '100%',
                width: '65%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '15%'
                }}>
                    <Box>
                        <Tooltip title="Bilgiler" onClick={handleInfoOpen}>
                            <InfoIcon sx={{color: '#4e4e4e'}}/>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title="Edit" onClick={() => handleCartOpen(1)}>
                            <EditNoteIcon sx={{color: '#4e4e4e'}}/>
                        </Tooltip>
                        <Tooltip title="Sil">
                            <DeleteIcon onClick={fetchDelete} sx={{color: '#4e4e4e'}}/>
                        </Tooltip>
                    </Box>

                </Box>
                <Box sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: {xs: 2, sm: 4, md: 4},
                    justifyContent: 'start',
                    alignItems: 'start',
                    width: '100%',
                    boxSizing: 'border-box',
                    height: {xs: '40%', sm: '50%', md: '50%'}
                }}>
                    {value.infoMessage}
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'start',
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '15%',
                    fontWeight: 'bold'
                }}>
                    {value.fileName}
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'end',
                    width: '100%',
                    boxSizing: 'border-box',
                    height: '15%'
                }}>
                    <Box>
                        {formatDate(value.createDate)}
                    </Box>
                    <Box>
                        <Checkbox   onChange={(event:any) => handleCheckbox(value._id, event)}  />
                    </Box>
                </Box>
            </Box>
            <Modal
                open={openCartModal}
                onClose={handleCartClose}

            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',

                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        width: {xs:'80%' , sm:'30%' , md:'30%'},

                    }}
                >

                    <OperationModal stateValue={stateValue} modalValue={1} handleClose={handleCartClose} setStateHome={setStateHome} stateHome={stateHome} value={value}/>

                </Box>
            </Modal>
            <Modal   open={openInfoModal}
                     onClose={handleInfoClose}
                     >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        height:'30%',
                        width: {xs:'80%' , sm:'50%' , md:'50%'},
                    }}
                >
                    <InfoModal value={value}></InfoModal>

                </Box>
            </Modal>
        </Card>
    );
};

export default ContentCart;