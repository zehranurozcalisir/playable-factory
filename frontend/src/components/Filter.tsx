import React, {useState} from 'react';
import {Box, Card, Chip, IconButton, TextField} from "@mui/material";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';

interface State {
    tagFilter: number[];
    text: string;
}

const Filter: React.FC = () => {
    const [state, setState] = useState<State>({
        tagFilter: [0, 1, 2],
        text: ""
    });

    const changeTagFilter = (value: number) => {
        if (state.tagFilter.includes(value)) {
            setState((prevState) => ({
                ...prevState,
                tagFilter: prevState.tagFilter.filter((item) => item !== value),
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                tagFilter: [...prevState.tagFilter, value]
            }));
        }
    }

    const clearFilter = () => {
        setState((prevState) => ({
            ...prevState,
            text: "",
            tagFilter:[0,1,2]
        }));
    }

    const handleChange = (e:any) => {
        const {value} = e.target;
        setState((prevState) => ({
            ...prevState,
            text: value,
        }));
    }

    return (
        <Box>
            <Card title="Filter" sx={{height:{xs:'auto',sm:'10vh', md:'10vh'},padding: '10px', boxSizing: 'border-box', display: 'flex', alignItems: 'center',flexDirection:{xs: 'column', sm: 'row', md: 'row'}}}>
                <Box sx={{width:{xs: '100%', sm: '60%', md: '60     %'}, padding: '10px', boxSizing: 'border-box'}}>
                    <TextField label="Metin" variant="outlined" sx={{width: '100%'}} value={state.text}
                               onChange={(e:any) => handleChange(e)}></TextField>
                </Box>
                <Box sx={{
                    width:{xs: '100%', sm: '30%', md: '30%'},
                    padding: '10px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Chip onClick={() => changeTagFilter(0)} sx={{
                        width: '30%',
                        color: 'white',
                        backgroundColor: state.tagFilter.includes(0) ? '#00b7eb' : null
                    }} icon={<AssignmentIcon sx={{color: 'white !important'}}/>} label="Yapılacak"/>
                    <Chip onClick={() => changeTagFilter(1)} sx={{
                        width: '30%',
                        color: 'white',
                        backgroundColor: state.tagFilter.includes(1) ? '#ffa812' : null
                    }} icon={<HourglassTopIcon sx={{color: 'white !important'}}/>} label="Bekleyen"/>
                    <Chip onClick={() => changeTagFilter(2)} sx={{
                        width: '30%',
                        color: 'white',
                        backgroundColor: state.tagFilter.includes(2) ? '#00a500' : null
                    }} icon={<StarIcon sx={{color: 'white !important'}}/>} label="Tamamlandı"/>
                </Box>
                <Box sx={{
                    width: {xs: '100%', sm: '10%', md: '10%'},
                    display: 'flex',
                    justifyContent:{xs:'center' , sm:'end' , md:'end'},
                    alignItems: 'center',
                    padding: '10px',
                    boxSizing: 'border-box'
                }}>
                    <IconButton  onClick={clearFilter}>
                        <FilterAltOffIcon />
                    </IconButton>
                    <IconButton >
                        <SearchIcon/>
                    </IconButton>
                </Box>
            </Card>
        </Box>
    );
};

export default Filter;
