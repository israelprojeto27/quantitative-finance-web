import Layout from "../../../components/Layout";
import { PARAMETRO_URL } from '../../../constants/constants';

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
 
const useStyles = makeStyles({
    paddingDialogRow: {
        paddingTop: '20px'
    },
    paddingDialogCell: {
        paddingRight: '20px'
    },
    buttonAdd: {
        paddingTop: '20px',
        paddingBottom: '25px',
        width: '200px',
        height: '20px'
    },
    buttonSearch: {
        paddingLeft: '20px',
    },
    head: {
        backgroundColor: 'blue',
        color: 'white'
    },
    boxSelect: {
        width: '220px',
        paddingBottom: '15px',
        height: '40px',        
    },
    selectTextOption: {
        fontSize: '12px'
    },
    cardTd: {
        paddingLeft: '10px'
    }, 
    box: {
        paddingTop: '20px'        
    },
    text: {
        paddingTop: '15px'        
    },
    button: {        
        paddingTop: '25px',        
        maxWidth: '850px'
    },
    select:{
        height: '60px;'
    }
    
});



function AddParametro() {
    const classes = useStyles();
    const router = useRouter();   

    const [tipoParametro, setTipoParametro] = useState('');
    const [tipoValorParametro, setTipoValorParametro] = useState('');
    const [valorParametro, setValorParametro] = useState('');
    const [obs, setObs] = useState('');

    function handleChange(event, field) {            
        if (field === 'valorParametro') {
            setValorParametro(event.currentTarget.value);
        } 
        else if (field === 'obs') {
            setObs(event.currentTarget.value);
        } 
    }

    function handleChangeSelect(event, field) {      
        if (field === 'tipoParametro') {
            setTipoParametro(event.target.value);
        } 
        else if (field === 'tipoValorParametro') {
            setTipoValorParametro(event.target.value);
        } 
     };

    const handleSubmit = async () => {    

        const response = await fetch(PARAMETRO_URL , {
            method: 'POST',
            body: JSON.stringify(
                {                
                    tipoParametro: tipoParametro,
                    tipoValorParametro:  tipoValorParametro,
                    valor: valorParametro,
                    obs: obs
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()                
        router.push('/parametro')
    }

    return (
        <Layout title="Quantitative System">
            <h1>Adicionar Parametro</h1>

            <br></br> <br></br>

            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '95ch' },
                }}
                noValidate
                autoComplete="off"
                className={classes.box}>

                <div className={classes.text}>
                

                <Box className={classes.boxSelect} >
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Tipo Parametro</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tipoParametro}
                            className={classes.select}
                            sx={{ m: 1, width: '95ch' }} 
                            label="Tipo Parametro"
                            onChange={(e) => handleChangeSelect(e, 'tipoParametro')}
                        >
                            <MenuItem value={'x'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Selecione um tipo</fontSize></MenuItem>
                            <MenuItem value={'INTERVALO_COTACAO_DIARIO'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>INTERVALO_COTACAO_DIARIO</fontSize></MenuItem>
                            <MenuItem value={'INTERVALO_COTACAO_SEMANAL'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>INTERVALO_COTACAO_SEMANAL</fontSize></MenuItem>
                            <MenuItem value={'INTERVALO_COTACAO_MENSAL'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>INTERVALO_COTACAO_MENSAL</fontSize></MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                </div>    
                
                <br></br>

                <div className={classes.text}>    

                    <Box className={classes.boxSelect} >
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Tipo Valor Parametro</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tipoValorParametro}
                            className={classes.select}
                            sx={{ m: 1, width: '95ch' }} 
                            label="Tipo Valor Parametro"
                            onChange={(e) => handleChangeSelect(e, 'tipoValorParametro')}
                        >
                            <MenuItem value={'x'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Selecione um tipo</fontSize></MenuItem>
                            <MenuItem value={'INTEGER'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>INTEGER</fontSize></MenuItem>
                            <MenuItem value={'DOUBLE'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>DOUBLE</fontSize></MenuItem>
                            <MenuItem value={'BOOLEAN'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>BOOLEAN</fontSize></MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                </div> 
 
                <br></br>

                <div className={classes.text}>
                    <TextField
                        id="outlined-required"
                        label="Valor Parametro"
                        value={valorParametro}
                        onChange={(e) => handleChange(e, 'valorParametro')}
                    />
                </div> 

                <div className={classes.text}>
                    <TextField
                        id="outlined-required"
                        label="Observação"
                        value={obs}
                        onChange={(e) => handleChange(e, 'obs')}
                    />
                </div> 

                <div className={classes.buttonAdd}>
                    <Button variant="contained" fullWidth="true" onClick={handleSubmit}>Adicionar</Button>
                </div>

            </Box>


        </Layout>
    );
}

export default AddParametro;

