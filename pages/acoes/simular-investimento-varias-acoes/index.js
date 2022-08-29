import * as React from 'react';

import Layout from "../../../components/Layout";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';

import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { ACAO_SIMULACAO_INVESTIMENTO_URL } from '../../../constants/constants'

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


export const columnsList = [
    { id: 1, label: 'Sigla', align: 'left', minWidth: 10, },
    { id: 2, label: '% Valor Investido', align: 'left', minWidth: 10, },
    { id: 3, label: 'Valor Investido R$', align: 'left', minWidth: 10, },
    { id: 4, label: 'Última Cotação do Ativo R$', align: 'left', minWidth: 10, },
    { id: 5, label: 'Quantidade Cotas', align: 'left', minWidth: 10, },    
    { id: 5, label: 'Data Última Cotação', align: 'left', minWidth: 10, },  
    { id: 6, label: 'Actions', align: 'left', minWidth: 10, },
];


export const columnsListDividendos = [
    { id: 1, label: 'Período Dividendo', align: 'left', minWidth: 10, },
    { id: 2, label: 'Valor Total Dividendo R$', align: 'left', minWidth: 10, },
    { id: 3, label: 'Siglas Envolvidas', align: 'left', minWidth: 10, },    
];

function SimularInvestimentoVariasAcoes({ simulacao }) {

    const classes = useStyles();
    const router = useRouter();

    const [detail, setDetail] = useState({});

    const [valorInvestimento, setValorInvestimento] = useState('');
    const [periodoInicio, setPeriodoInicio] = useState('');
    const [periodoFim, setPeriodoFim] = useState('');

    const [openResult, setOpenResult] = useState(false);

    const [resultado, setResultado] = useState({});
    
    const [openDialog, setOpenDialog] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [msgErrorSubmit, setMsgErrorSubmit] = useState('');

    const [siglaSelecionada, setSiglaSelecionada] = useState('');


    
    const handleUpdateValorInvestimento = async () => {
        const response = await fetch(ACAO_SIMULACAO_INVESTIMENTO_URL, {
            method: 'POST',
            body: JSON.stringify(
                {                
                    valorInvestimento: valorInvestimento,                                       
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()        
        router.push('/acoes/simular-investimento-varias-acoes')               
    }

    const handleSubmitGerarSimulacao = async () => {    
        setOpenResult(false)
        const res = await fetch(ACAO_SIMULACAO_INVESTIMENTO_URL + '/simula-investivemento/' + periodoInicio + '/' + periodoFim)
        const rs = await res.json()
        setResultado(rs)
        setOpenResult(true)
    }
    

    function handleChange(event, field) {
        if (field === 'valorInvestimento') {
            setValorInvestimento(event.currentTarget.value);
        } 
        else if (field === 'periodoInicio') {
            setPeriodoInicio(event.currentTarget.value);
        } 
        else if (field === 'periodoFim') {
            setPeriodoFim(event.currentTarget.value);
        } 
    }

    function goAddSimulacaoInvestimentoDetail(){
        router.push('/acoes/simular-investimento-varias-acoes/add-simular-investimento-detail')
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async () => {        
        setOpenDialog(false);

        const response = await fetch(ACAO_SIMULACAO_INVESTIMENTO_URL  + '/delete-simulacao-detail-investimento/'+ siglaSelecionada, {
            method: 'DELETE'           
        })
        const data = await response.json()        
        router.push('/acoes/simular-investimento-varias-acoes/') 
    };    

    function handleDetail(sigla) {    
        setOpenDialog(true);
        console.log('sigla selecionada: ' + sigla)        
        setSiglaSelecionada(sigla)
    };        

    function handleEdit(row) {    
        router.push({
            pathname: '/acoes/simular-investimento-varias-acoes/edit-simular-investimento-detail',
            query: { object: JSON.stringify(row) },
        })
    }

    


    useEffect(() => { 
        setDetail(simulacao)
    }, [router.query]);

    return (
        <Layout title="Quantitative System">
            <h1>Simulação Investimento Várias Ações</h1>

            <br></br> <br></br> <br></br>

            <p><strong>Valor Investimento Atual R$: </strong> {detail.valorInvestimentoFmt} </p>

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
                        label="Valor Investimento R$"
                        value={valorInvestimento}
                        onChange={(e) => handleChange(e, 'valorInvestimento')}
                    />
                </div> 

                <div className={classes.buttonSimulate}>
                    <Button variant="contained" fullWidth="true" onClick={handleUpdateValorInvestimento}>Atualizar Valor Investimento</Button>
                </div>

            </Box>

            <br></br> <br></br>

            <div className={classes.buttonAdd}>
                    <Button variant="contained" fullWidth="true" onClick={goAddSimulacaoInvestimentoDetail}>Adicionar</Button>
            </div>

            <br></br>  

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 1040 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                                {columnsList.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        className={classes.head}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {simulacao.list.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.sigla}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.porcentagemValorInvestidoFmt}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.valorInvestidoFmt}
                                        </TableCell>                                        
                                        <TableCell key={row.id} align={row.align}>
                                            {row.ultimaCotacaoAcaoFmt}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.quantidadeCotasAcaoFmt}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.dataUltimaCotacaoFmt}
                                        </TableCell>                                       
                                        <TableCell key={row.id} align={row.align}>
                                            <Button variant='success' onClick={() => handleDetail(row.sigla)}> <ZoomInOutlinedIcon /> </Button>      
                                            <Button variant='success' onClick={() => handleEdit(row)}> <EditOutlinedIcon /> </Button>    
                                        </TableCell>    
                                    </TableRow>
                                );
                            })}

                        </TableBody>

                    </Table>
                </TableContainer>
            </Paper>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="700px"
            >
                <DialogTitle id="alert-dialog-title" >
                    Confirmação de exclusao
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className={classes.paddingDialogRow}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Você deseja realmente excluir este registro?
                            </Typography>                            
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DialogTitle id="alert-dialog-title" >
                        <Button onClick={handleCloseDialog}>Fechar</Button>
                        <Button onClick={handleDelete}>Confirmar</Button>
                    </DialogTitle>
                </DialogActions>

                
                <br></br>        
                {errorSubmit === true ? (
                    <FormHelperText error={errorSubmit}>
                       <fontSize className={classes.msgError}> {msgErrorSubmit} </fontSize> 
                    </FormHelperText>
                ) : ('') }

            </Dialog>

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
                        label="Periodo Inicio (YYYY-MM)"
                        value={periodoInicio}
                        onChange={(e) => handleChange(e, 'periodoInicio')}
                    />
                </div> 

                <div className={classes.text}>
                    <TextField
                        id="outlined-required"
                        label="Periodo Fim (YYYY-MM)"
                        value={periodoFim}
                        onChange={(e) => handleChange(e, 'periodoFim')}
                    />
                </div> 

                <div className={classes.buttonSimulate}>
                    <Button variant="contained" fullWidth="true" onClick={handleSubmitGerarSimulacao}>Gerar Simulação</Button>
                </div>

            </Box>

            <br></br> <br></br>

            {openResult === true ? (
                <>

                    <p><strong> Total Ganhos Dividendos: </strong> {resultado.totalGanhosDividendosFmt}</p>

                    <br></br> 

                    <p><strong> Ganho Médio Dividendos: </strong> {resultado.ganhoMedioMensalDividendosFmt}</p>

                    <br></br>  

                    <p><strong> Total Ganhos Dividendos: </strong> {resultado.totalDividendosFmt}</p>

                    <br></br>

                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 1040 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead >
                                    <TableRow >
                                        {columnsListDividendos.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                                className={classes.head}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {resultado.list.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                <TableCell key={row.id} align={row.align}>
                                                    {row.periodoFmt}
                                                </TableCell>
                                                <TableCell key={row.id} align={row.align}>
                                                    {row.valorTotalDividendoFmt}
                                                </TableCell>
                                                <TableCell key={row.id} align={row.align}>
                                                    {row.siglas}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Paper>
                </>


            ) : ('')}


            <br></br> <br></br>  <br></br> <br></br>

        </Layout>
    );
}

export default SimularInvestimentoVariasAcoes;


export async function getStaticProps(context) {
    const res = await fetch(ACAO_SIMULACAO_INVESTIMENTO_URL )
    const simulacao = await res.json()
    return {
        props: {
            simulacao
        }, // will be passed to the page component as props
    }
}