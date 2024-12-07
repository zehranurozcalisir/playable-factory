import React from 'react';
import {Box, Card, Chip, IconButton, TextField, Tooltip} from "@mui/material";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';

const Filter: React.FC<{
    stateHome: any,
    setStateHome: any,
    fetchTasks: (i: number) => void
}> = ({stateHome, setStateHome, fetchTasks}) => {


    const changeTagFilter = (value: number) => {
        if (stateHome.tagFilter.includes(value)) {
            setStateHome((prevState: any) => ({
                ...prevState,
                tagFilter: prevState.tagFilter.filter((item: any) => item !== value),
            }));
        } else {
            setStateHome((prevState: any) => ({
                ...prevState,
                tagFilter: [...prevState.tagFilter, value]
            }));
        }
    }

    const clearFilter = () => {
        setStateHome((prevState: any) => ({
            ...prevState,
            tagFilter: [0, 1, 2]
        }));
        setStateHome((prevState: any) => ({
            ...prevState,
            infoMessage: "",
        }));
    }

    const handleChange = (e: any) => {
        const {value} = e.target;
        setStateHome((prevState: any) => ({
            ...prevState,
            infoMessage: value,
        }));
    }

    const filter = () => {
        for (let i = 0; i < 3; i++) {
            fetchTasks(i);
        }
    }

    return (
        <Box>
            <Card title="Filter" sx={{
                height: {xs: 'auto', sm: '10vh', md: '10vh'},
                padding: '10px',
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                flexDirection: {xs: 'column', sm: 'row', md: 'row'}
            }}>
                <Box sx={{width: {xs: '100%', sm: '60%', md: '60     %'}, padding: '10px', boxSizing: 'border-box'}}>
                    <TextField label="Metin" variant="outlined" sx={{width: '100%'}} value={stateHome.infoMessage}
                               onChange={(e: any) => handleChange(e)}></TextField>
                </Box>
                <Box sx={{
                    width: {xs: '100%', sm: '30%', md: '30%'},
                    padding: '10px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Chip onClick={() => changeTagFilter(0)} sx={{
                        width: '30%',
                        color: 'white',
                        backgroundColor: stateHome.tagFilter.includes(0) ? '#00b7eb' : null
                    }} icon={<AssignmentIcon sx={{color: 'white !important'}}/>} label="Yapılacaklar"/>
                    <Chip onClick={() => changeTagFilter(1)} sx={{
                        width: '30%',
                        color: 'white',
                        backgroundColor: stateHome.tagFilter.includes(1) ? '#ffa812' : null
                    }} icon={<HourglassTopIcon sx={{color: 'white !important'}}/>} label="Bekleyenler"/>
                    <Chip onClick={() => changeTagFilter(2)} sx={{
                        width: '30%',
                        color: 'white',
                        backgroundColor: stateHome.tagFilter.includes(2) ? '#00a500' : null
                    }} icon={<StarIcon sx={{color: 'white !important'}}/>} label="Tamamlananlar"/>
                </Box>
                <Box sx={{
                    width: {xs: '100%', sm: '10%', md: '10%'},
                    display: 'flex',
                    justifyContent: {xs: 'center', sm: 'end', md: 'end'},
                    alignItems: 'center',
                    padding: '10px',
                    boxSizing: 'border-box'
                }}>
                    <Tooltip title={"Temizle"}>
                        <IconButton onClick={clearFilter}>
                            <CleaningServicesIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Filtrele"}>
                        <IconButton onClick={filter}>
                            <SearchIcon/>
                        </IconButton></Tooltip>
                </Box>
            </Card>
        </Box>
    );
};

export default Filter;
