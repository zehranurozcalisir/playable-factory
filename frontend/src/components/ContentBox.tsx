import React, {useState} from 'react';
import {bottomNavigationActionClasses, Box, IconButton, Modal, Pagination, Typography} from "@mui/material";
import Navbar from "../components/Navbar.tsx";
import ContentCart from "./ContentCart.tsx";
import AddIcon from '@mui/icons-material/Add';
import OperationModal from "./OperationModal.tsx";

interface State{
    modalValue:number;
}
const ContentBox: React.FC = () => {
    const [state, setState] = useState<State>({
        modalValue:0,
    })
    const [open, setOpen] = useState(false);
    const handleOpen = (value:number)=> {
        setState((prevState:State) => ({
            ...prevState,
            modalValue:value
        }))
        setOpen(true);
    }

    const handleClose = () => setOpen(false);
    return (
        <Box sx={{
            height: 'auto',
            width:{xs:'100%' , sm:'30%' , md:'30%'},
            backgroundColor: '#faf8f8',
            border: 'none',
            borderRadius: '10px',
            padding: '10px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            marginBottom:{xs:'10px' , sm:0 , md:0}
        }}>
            <Box sx={{padding: '10px', display: 'flex', justifyContent: 'space-between' , alignItems: 'center', width:'100%',boxSizing:'border-box'}}>
                <Typography component="div" sx={{color: '#4e4e4e'}}>Yapılacak (1)</Typography>
                <IconButton aria-label="delete">
                    <AddIcon onClick={() => handleOpen(0)} />
                </IconButton>
            </Box>
            <Box sx={{padding: '10px',height:'100%', width: '100%', boxSizing: 'border-box', display: 'flex',justifyContent: 'space-between',alignItems: 'center' , flexDirection: 'column' }}>
                <ContentCart />
                <ContentCart />
                <ContentCart />
                <Box sx={{display: 'flex', justifyContent: 'end', alignItems: 'end', flexDirection: 'column' , width: '100%'}}>
                    <Pagination count={4} />
                </Box>

            </Box>
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
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >

                    <OperationModal modalValue={state.modalValue}  handleClose={handleClose} />

                </Box>
            </Modal>
        </Box>
    );
};

export default ContentBox;