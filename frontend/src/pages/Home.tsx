import React from 'react';
import {Box, Card, Checkbox, IconButton, Tooltip, Typography} from "@mui/material";
import Filter from "../components/Filter.tsx";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InfoIcon from '@mui/icons-material/Info';
import ContentBox from "../components/ContentBox.tsx";

const Home: React.FC = () => {
    return (
        <Box sx={{minHeight: "95vh", padding: '20px', boxSizing: 'border-box'}}>
            <Filter/>
            <Box sx={{
                height: '80vh',
                padding: '20px',
                boxSizing: 'border-box',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: {xs: 'column', sm: 'row', md: 'row'},
            }}>
                <ContentBox/>
                <ContentBox/>
                <ContentBox/>
            </Box>
        </Box>
    );
};

export default Home;
