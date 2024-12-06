import React, {useState} from 'react';
import {
    Box, Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent, styled,
    TextField,
    Typography
} from "@mui/material";
import Navbar from "../components/Navbar.tsx";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
interface State{
    tag:string,
    files:any,
    image:any,
    filesName:string,
    imageName:string
}
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const OperationModal: React.FC<{ modalValue: number, handleClose:() =>void }> = ({ modalValue,handleClose }) => {
    const [state, setState] = useState<State>({
        tag:"0",
        files:null,
        image:null,
        filesName:"Dosya Yükle",
        imageName:"Resim Yükle",

    })
    const handleChange = (event: SelectChangeEvent) => {
        setState((prevState) => ({
            ...prevState,
            tag:event.target.value as string,
        }))

    };
    const uploadFiles = (files:any,value:number) => {
        console.log(files)
        if(value == 0){
            setState((prevState) => ({
                ...prevState,
                image:files,
                imageName:files[0]?.name
            }));
        }else{

            setState((prevState) => ({
                ...prevState,
                files:files,
                filesName:files[0]?.name
            }));
        }
    }
    return (
        <Box sx={{boxSizing: 'border-box'}}>
            <Box sx={{display: "flex", flexDirection: 'row', alignItems: 'center' , justifyContent: 'space-between',boxSizing: 'border-box'}}>
               <Typography sx={{fontWeight:'bold', fontSize:'20px', color:'#113c5e'}}> {modalValue == 0 ? 'Görev Ekle' : 'Görev Düzenle'}</Typography>
                <IconButton onClick={handleClose}>
                    <HighlightOffIcon sx={{color:'#113c5e'}} />
                </IconButton>
            </Box>
            <Box sx={{boxSizing: 'border-box', padding:'10px'}}>
                <TextField label="Görev Tanımı" sx={{width:'100%', marginBottom:'10px'}}> </TextField>

                <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
                    <InputLabel id="tag-label">Etiket</InputLabel>
                    <Select
                        labelId="tag-label"
                        value={state.tag}
                        label={"Etiket"}
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>Yapılacak</MenuItem>
                        <MenuItem value={1}>Bekleyen</MenuItem>
                        <MenuItem value={2}>Bitti</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    sx={{width:'100%' , marginBottom:'10px' , backgroundColor:'transparent', border:'1px dotted #ffa812' , color:'#ffa812'}}
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon sx={{color:'#ffa812 !important'}} />}
                >
                    {state.imageName}
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event:any) => uploadFiles(event.target.files,0)}
                        multiple
                    />
                </Button>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    sx={{width:'100%' , marginBottom:'10px', backgroundColor:'transparent', border:'1px dotted #00a500' , color:'#00a500'}}
                    startIcon={<CloudUploadIcon sx={{color:'#00a500 !important'}}/>}
                >
                    {state.filesName}
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event:any) => uploadFiles(event.target.files,1)}
                        multiple
                    />
                </Button>
                <Button sx={{width:'100%' , backgroundColor:'#113c5e' , color:'white'}}>
                    EKLE
                </Button>
            </Box>
        </Box>
    );
};

export default OperationModal;