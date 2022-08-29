import Layout from "../../../../components/Layout";

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import { ACAO_SIMULACAO_INVESTIMENTO_URL } from '../../../../constants/constants'


const useStyles = makeStyles({
    paddingDialogRow: {
        paddingTop: '20px'
    },
    paddingDialogCell: {
        paddingRight: '20px'
    },
    buttonSimulate: {
        paddingTop: '50px',
        maxWidth: '500px'
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
        paddingBottom: '5px',
        height: '40px',
        paddingLeft: '10px'
    },
    selectTextOption: {
        fontSize: '12px'
    },
    cardTd: {
        paddingLeft: '10px'
    },
    table: {
        paddingBottom: '20px'
    },
    buttonAdd: {
        paddingTop: '50px',
        maxWidth: '200px'
    },    
});


function AddSimularInvestimentoDetail() {

    const classes = useStyles();
    const router = useRouter();

    const [sigla, setSigla] = useState('');
    const [porcentagemInvestido, setPorcentagemInvestido] = useState('');

    function handleChange(event, field) {    
        if (field === 'sigla') {
            setSigla(event.currentTarget.value);
        } 
        else if (field === 'porcentagemInvestido') {
            setPorcentagemInvestido(event.currentTarget.value);
        } 
    }

    const handleSubmit = async () => {    

        const response = await fetch(ACAO_SIMULACAO_INVESTIMENTO_URL + '/save-simulacao-detail-investimento', {
            method: 'POST',
            body: JSON.stringify(
                {                
                    sigla: sigla,
                    porcentagemValorInvestido:  porcentagemInvestido                 
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()                
        router.push('/acoes/simular-investimento-varias-acoes')
    }


    return (
        <Layout>
              <h1>Adição de Simulação de Detalhe Investimento Várias Ações</h1>

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
                    <TextField
                        id="outlined-required"
                        label="Sigla"
                        value={sigla}
                        onChange={(e) => handleChange(e, 'sigla')}
                    />
                </div> 

                <div className={classes.text}>
                    <TextField
                        id="outlined-required"
                        label="% Investido"
                        value={porcentagemInvestido}
                        onChange={(e) => handleChange(e, 'porcentagemInvestido')}
                    />
                </div> 

                <div className={classes.buttonSimulate}>
                    <Button variant="contained" fullWidth="true" onClick={handleSubmit}>Adicionar</Button>
                </div>

            </Box>
            
        </Layout>
    );
}

export default AddSimularInvestimentoDetail;