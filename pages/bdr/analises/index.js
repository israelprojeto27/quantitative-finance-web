import Layout from "../../../components/Layout";
import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material'

import { BDR_ANALISE_URL } from '../../../constants/constants';

export const columnsList = [
    { id: 1, label: 'Sigla', align: 'left', minWidth: 10, },
    { id: 2, label: 'Coeficiente Roi Dividendo', align: 'left', minWidth: 10, },
    { id: 3, label: 'Quantidade Ocorrências Dividendos', align: 'left', minWidth: 10, },
    { id: 4, label: 'Valor Ultima Cotacao R$', align: 'left', minWidth: 10, },
    { id: 5, label: 'Data Ultima Cotação', align: 'left', minWidth: 10, },
    { id: 6, label: 'Valor Ultimo Dividendo R$', align: 'left', minWidth: 10, },    
    { id: 7, label: 'Data Ultimo Dividendo', align: 'left', minWidth: 10, },
    { id: 8, label: 'Actions', align: 'left', minWidth: 10, },
];

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
});
function AnalisesBdr({ list }) {
    const classes = useStyles();
    const router = useRouter();

    const [rowsList, setRowsList] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [msgErrorSubmit, setMsgErrorSubmit] = useState('');

    const [bdrSelecionada, setBdrSelecionada] = useState('');

    useEffect(() => {
        setRowsList(list)
    }, []);
  
    function handleOpenDialog(row) {    
        setBdrSelecionada(row.sigla)
        setOpenDialog(true);
    }; 
    

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async () => {  
        const response = await fetch(BDR_ANALISE_URL  + '/' + bdrSelecionada, {
            method: 'DELETE'           
        })
        const data = await response.json()  
        
        const res = await fetch(BDR_ANALISE_URL )
        const list = await res.json()
        setRowsList(list)

        setOpenDialog(false);
    };  


    return (
        <Layout title="Quantitative System">
            <h1>Análises BDRs</h1>

            <br></br> <br></br>

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
                            {rowsList.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.sigla}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.coeficienteRoiDividendoFmt}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.quantidadeOcorrenciasDividendos}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.valorUltimaCotacaoFmt}
                                        </TableCell>    

                                        <TableCell key={row.id} align={row.align}>
                                            {row.dataUltimaCotacaoFmt}
                                        </TableCell>   
                                        <TableCell key={row.id} align={row.align}>
                                            {row.valorUltimoDividendoFmt}
                                        </TableCell>    
                                        <TableCell key={row.id} align={row.align}>
                                            {row.dataUltimoDividendoFmt}
                                        </TableCell> 


                                        <TableCell key={row.id} align={row.align}>                                            
                                            <Button variant='success' onClick={() => handleOpenDialog(row)}> <DeleteIcon /> </Button> 
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

        </Layout>
    );
}

export default AnalisesBdr;

export async function getStaticProps(context) {
    const res = await fetch(BDR_ANALISE_URL )
    const list = await res.json()
    return {
        props: {
            list
        }, // will be passed to the page component as props
    }
}