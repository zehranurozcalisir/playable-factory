import React from 'react';
import {Box, Card, Checkbox, Tooltip} from "@mui/material";
import Navbar from "../components/Navbar.tsx";
import InfoIcon from "@mui/icons-material/Info";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

const ContentCart: React.FC = () => {
    return (
        <Card sx={{
            padding: '10px',
            width: '100%',
            boxSizing: 'border-box',
            height: '20vh',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom:'5px'
        }}>
            <Box sx={{height: '100%', width: '30%', border: '1px dotted #4e4e4e'}}>

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
                        <Tooltip title="Bilgiler">
                            <InfoIcon sx={{color: '#4e4e4e'}}/>
                        </Tooltip>
                    </Box>
                    <Box>
                        <Tooltip title="Edit">
                            <EditNoteIcon sx={{color: '#4e4e4e'}}/>
                        </Tooltip>
                        <Tooltip title="Sil">
                            <DeleteIcon sx={{color: '#4e4e4e'}}/>
                        </Tooltip>
                    </Box>

                </Box>
                <Box sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    WebkitLineClamp: {xs:2 , sm:4 , md:4},
                    justifyContent: 'start',
                    alignItems: 'start',
                    width: '100%',
                    boxSizing: 'border-box',
                    height: {xs:'40%' , sm:'50%', md:'50%'}
                }}>
                    Lorem Ipsum is simply dummy text offd fg the printing and dfdf dftypesetting
                    industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                    1500s, when.
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
                    dosya.pdf
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
                        06.12.2024
                    </Box>
                   <Box>
                       <Checkbox/>
                   </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default ContentCart;