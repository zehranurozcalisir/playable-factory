import React from 'react';
import {Box} from "@mui/material";

const NotFound: React.FC = () => {
    return (
        <Box sx={{width:'100%',height:'100vh' , display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img style={{width:'auto', height:'100%'}} src='/img/notFound.jpg'/>
        </Box>
    );
};

export default NotFound;
