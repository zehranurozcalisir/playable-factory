import React from 'react';
import {Box, Card, Checkbox, Modal, Tooltip} from "@mui/material";
import Navbar from "../components/Navbar.tsx";
import InfoIcon from "@mui/icons-material/Info";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import OperationModal from "./OperationModal.tsx";

const InfoModal:  React.FC<{ value: any }> = ({value}) => {
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
    return (
        <Box sx={{width:'100%' , height:'100%'}}>
            <Card sx={{
                padding: '10px',
                width: '100%',
                height:'100%',
                boxSizing: 'border-box',

                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '5px'
            }}>
                <Box sx={{height: '100%', width: '40%', border: '1px dotted #4e4e4e', overflow: 'hidden'}}>
                    <img src={value.image} style={{height: '100%', width:'100%'}}/>
                </Box>
                <Box sx={{
                    height: '100%',
                    width: '55%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>

                    <Box sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: {xs: 2, sm: 4, md: 4},
                        justifyContent: 'start',
                        alignItems: 'start',
                        width: '100%',
                        boxSizing: 'border-box',
                        height: {xs: '55%', sm: '65%', md: '65%'}
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
                    </Box>
                </Box>

            </Card>
        </Box>
    );
};

export default InfoModal;