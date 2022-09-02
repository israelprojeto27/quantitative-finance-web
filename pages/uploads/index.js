import Layout from '../../components/Layout';


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

import { ACAO_URL } from '../../constants/constants';
import { BDR_URL } from '../../constants/constants';
import { FUNDO_IMOBILIARIO_URL } from '../../constants/constants';


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

function Uploads() {

    const classes = useStyles();
    const router = useRouter();   

    const [pathArquivo, setPathArquivo] = useState('');
    const [tipoUpload, setTipoUpload] = useState('');    

    const [mensagemExecucao, setMensagemExecucao] = useState('Não iniciado');    

    
    function handleChange(event, field) {            
        if (field === 'pathArquivo') {
            setPathArquivo(event.currentTarget.value);
        }         
    }

    function handleChangeSelect(event, field) {      
        if (field === 'tipoUpload') {
            setTipoUpload(event.target.value);
        }  
     };

    const handleSubmit = async () => {    
       if ( tipoUpload === 'acoesCompleto'){

       }
       else  if ( tipoUpload === 'acoesParcial'){

       }
       else  if ( tipoUpload === 'bdrCompleto'){

       }
       else  if ( tipoUpload === 'bdrParcial'){

       }
       else  if ( tipoUpload === 'fundoCompleto'){

       }
       else  if ( tipoUpload === 'fundoParcial'){

       }
       else  if ( tipoUpload === 'dividendoFundoCompleto'){

       }
       else  if ( tipoUpload === 'dividendoFundoParcial'){

       }
 
    }
 

    return (
        <Layout title="Quantitative System">
            <h1>Lista de Uploads</h1>

            <br></br>

            <div className={classes.text}>
                <TextField
                    id="outlined-required"
                    value={pathArquivo}
                    type="file"
                    onChange={(e) => handleChange(e, 'pathArquivo')}
                />
            </div>

            <div className={classes.text}>

                <Box className={classes.boxSelect} >
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Tipo Upload</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={tipoUpload}
                            className={classes.select}
                            sx={{ m: 1, width: '95ch' }}
                            label="Tipo Upload"
                            onChange={(e) => handleChangeSelect(e, 'tipoUpload')}
                        >
                            <MenuItem value={'x'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Selecione um tipo</fontSize></MenuItem>
                            <MenuItem value={'acoesCompleto'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Ações Completo</fontSize></MenuItem>
                            <MenuItem value={'acoesParcial'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Ações Parcial</fontSize></MenuItem>
                            <MenuItem value={'bdrCompleto'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>BDR Completo</fontSize></MenuItem>
                            <MenuItem value={'bdrParcial'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>BDR Parcial</fontSize></MenuItem>
                            <MenuItem value={'fundoCompleto'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Fundo Imobiliario Completo</fontSize></MenuItem>
                            <MenuItem value={'fundoParcial'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Fundo Imobiliario Parcial</fontSize></MenuItem>
                            <MenuItem value={'dividendoFundoCompleto'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Dividendo Fundo Imobiliario Completo</fontSize></MenuItem>
                            <MenuItem value={'dividendoFundoParcial'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Dividendo Fundo Imobiliario Parcial</fontSize></MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <br></br>

            <div className={classes.buttonAdd}>
                    <Button variant="contained" fullWidth="true" onClick={handleSubmit}>Realizar Upload</Button>
            </div>


            <br></br> <br></br>

            <p><strong> Mensagem Execução:  </strong> {mensagemExecucao}</p>

        </Layout>
    );
}

export default Uploads;