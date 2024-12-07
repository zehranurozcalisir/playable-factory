import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
    TextField,
    Typography
} from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from "axios";
import Cookies from 'js-cookie';

interface State {
    tag: string,
    files: any,
    image: any,
    filesName: string,
    imageName: string,
    infoMessage: string,
    userId: string,
    isSnackBar: boolean,
    responseMessage: string,
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
const decodeToken = (token: string) => {
    try {
        const base64Payload = token.split('.')[1];
        const decodedPayload = atob(base64Payload);

        return JSON.parse(decodedPayload);
    } catch (error) {
        return null;
    }
};

const getCookie = (name: string) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};

const toBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
};

const OperationModal: React.FC<{
    modalValue: number,
    handleClose: () => void,
    stateHome: any,
    setStateHome: any,
    stateValue: number,
    value:any
}> = ({modalValue, handleClose, stateHome, setStateHome, stateValue,value}) => {
    const [state, setState] = useState<State>({
        tag: "0",
        files: null,
        image: null,
        filesName: "Resim Yükle",
        imageName: "Dosya Yükle",
        infoMessage: "",
        userId: "",
        isSnackBar: false,
        responseMessage: "",

    });

    const handleChange = (event: SelectChangeEvent) => {
        setState((prevState) => ({
            ...prevState,
            tag: event.target.value as string,
        }))

    };
    const uploadFiles = (files: any, value: number) => {
        if (value == 0) {

            setState((prevState) => ({
                ...prevState,
                image: files[0],
                imageName: files[0]?.name
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                files: files[0],
                filesName:  files[0]?.name
            }));
        }
    }
    const handleFetch = async () => {
        if (modalValue == 0) {
            try {
                const token = Cookies.get('token');
                const formData = new FormData();
                formData.append('infoMessage', state.infoMessage || '');
                formData.append('tagValue', state.tag);
                formData.append('userId', state.userId);
                formData.append('fileName', state.filesName || '');
                formData.append('imageName', state.imageName || '');

                if (state.files) {
                    formData.append('file', state.files);
                }
                if (state.image) {
                    formData.append('image', state.image);
                }

                const response = await axios.post('http://localhost:5000/api/tasks', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response && response.data) {
                    setStateHome((prevState: any) => ({
                        ...prevState,
                        isSnackBar: true,
                        responseMessage: 'Görev başarıyla eklendi.',
                        repeatFetch: !prevState.repeatFetch,
                        repeatValue: stateValue,
                        allUpdate:false,
                    }));
                }
                handleClose();
            } catch (error: any) {
                setStateHome((prevState: any) => ({
                    ...prevState,
                    isSnackBar: true,
                    responseMessage: error.response?.data?.message || 'Hata oluştu.',
                }));
            }


        } else {
            try {
                const token = Cookies.get('token');
                const formData = new FormData();

                formData.append('infoMessage', state.infoMessage || '');
                formData.append('tagValue', state.tag);
                formData.append('userId', state.userId);
                formData.append('fileName', state.filesName || '');
                formData.append('imageName', state.imageName || '');

                if (state.files) {
                    formData.append('file', state.files);
                }
                if (state.image) {
                    formData.append('image', state.image);
                }

                const response = await axios.put(`http://localhost:5000/api/tasks/${value._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response && response.data) {
                    setStateHome((prevState: any) => ({
                        ...prevState,
                        isSnackBar: true,
                        responseMessage: 'Görev başarıyla güncellendi.',
                        repeatFetch: !prevState.repeatFetch,
                        allUpdate:true,
                    }));
                }
                handleClose();
            } catch (error: any) {
                setStateHome((prevState: any) => ({
                    ...prevState,
                    isSnackBar: true,
                    responseMessage: error.response?.data?.message || 'Hata oluştu.',
                }));
            }

        }
    }
    const changeInfoMessage = (e: any) => {
        setState((prevState) => ({
            ...prevState,
            infoMessage: e.target.value
        }))
    }
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                setState((prevState) => ({
                        ...prevState,
                        userId: decoded.id,

                    })
                )
            }
        }
        if(value == null){
            setState((prevState: any) => ({
                ...prevState,
                tag: stateValue
            }));
        }else{
            setState((prevState: any) => ({
                ...prevState,
                tag: value.tagValue,
                infoMessage: value.infoMessage,
                filesName: value.fileName,
                imageName: value.imageName
            }));

        }
    }, []);

    return (
        <Box sx={{boxSizing: 'border-box'}}>
            <Box sx={{
                display: "flex",
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxSizing: 'border-box'
            }}>
                <Typography sx={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#113c5e'
                }}> {modalValue == 0 ? 'Görev Ekle' : 'Görev Düzenle'}</Typography>
                <IconButton onClick={handleClose}>
                    <HighlightOffIcon sx={{color: '#113c5e'}}/>
                </IconButton>
            </Box>
            <Box sx={{boxSizing: 'border-box', padding: '10px'}}>
                <TextField label="Görev Tanımı" sx={{width: '100%', marginBottom: '10px'}}
                           onChange={(e: any) => changeInfoMessage(e)} value={state.infoMessage}> </TextField>

                <FormControl sx={{width: '100%', marginBottom: '10px'}}>
                    <InputLabel id="tag-label">Etiket</InputLabel>
                    <Select
                        labelId="tag-label"
                        value={state.tag}
                        label={"Etiket"}
                        onChange={handleChange}
                    >
                        <MenuItem value={"0"}>Yapılacaklar</MenuItem>
                        <MenuItem value={"1"}>Bekleyenler</MenuItem>
                        <MenuItem value={"2"}>Tamamlananlar</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    sx={{
                        width: '100%',
                        marginBottom: '10px',
                        backgroundColor: 'transparent',
                        border: '1px dotted #ffa812',
                        color: '#ffa812'
                    }}
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon sx={{color: '#ffa812 !important'}}/>}
                >
                    {state.imageName}
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event: any) => uploadFiles(event.target.files, 0)}
                        multiple
                    />
                </Button>
                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    sx={{
                        width: '100%',
                        marginBottom: '10px',
                        backgroundColor: 'transparent',
                        border: '1px dotted #00a500',
                        color: '#00a500'
                    }}
                    startIcon={<CloudUploadIcon sx={{color: '#00a500 !important'}}/>}
                >
                    {state.filesName}
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event: any) => uploadFiles(event.target.files, 1)}
                        multiple
                    />
                </Button>
                <Button onClick={handleFetch} sx={{width: '100%', backgroundColor: '#113c5e', color: 'white'}}>
                    {modalValue == 0 ? "EKLE" : "GÜNCELLE"}
                </Button>
            </Box>

        </Box>

    );
};

export default OperationModal;