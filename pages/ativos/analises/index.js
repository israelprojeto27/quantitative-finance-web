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

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';

import DeleteIcon from '@mui/icons-material/Delete';

import { Button } from '@mui/material'

import { ATIVOS_URL } from '../../../constants/constants'

export const columnsList = [
    { id: 1, label: 'Tipo Ativo', align: 'left', minWidth: 10, },
    { id: 2, label: 'Sigla', align: 'left', minWidth: 10, },
    { id: 3, label: 'Coeficiente Roi Dividendo', align: 'left', minWidth: 10, },
    { id: 4, label: 'Quantidade Ocorrências Dividendos', align: 'left', minWidth: 10, },
    { id: 5, label: 'Valor Ultima Cotacao R$', align: 'left', minWidth: 10, },
    { id: 6, label: 'Data Ultima Cotação', align: 'left', minWidth: 10, },
    { id: 7, label: 'Valor Ultimo Dividendo R$', align: 'left', minWidth: 10, },    
    { id: 8, label: 'Data Ultimo Dividendo', align: 'left', minWidth: 10, },
    { id: 9, label: 'Actions', align: 'left', minWidth: 10, },
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
    boxSelect: {
        width: '220px',
        paddingBottom: '5px',
        height: '40px',
        paddingLeft: '10px'
    },
});


function AnaliseAtivos({ list }) {

    const classes = useStyles();
    const router = useRouter();

    const [selectOrdenacao, setSelectOrdenacao] = useState('-');
    const [selectTipoOrdenacao, setSelectTipoOrdenacao] = useState('crescente');

    const [rowsList, setRowsList] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const [openDialog, setOpenDialog] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [msgErrorSubmit, setMsgErrorSubmit] = useState('');

    const [tipoAtivoSelecionado, setTipoAtivoSelecionado] = useState('');
    const [siglaSelecionada, setSiglaSelecionada] = useState('');

     useEffect(() => {
        setRowsList(list)
    }, []); 

    function handleChangeSelect(event, select) {
        if (select === 'ordenacao') {
            setSelectOrdenacao(event.target.value);
        }
        else if (select === 'tipoOrdenacao') {
            setSelectTipoOrdenacao(event.target.value);
        }
    };

    const handleFilter = async () => {        
        setRowsList([]);        
        const res = await fetch(ATIVOS_URL + '/filter-ativos-analise?orderFilter=' + selectOrdenacao + '&typeOrderFilter=' + selectTipoOrdenacao)        
        const list = await res.json()        
        setRowsList(list)        
    }

    function handleOpenDialog(row) {         
        setTipoAtivoSelecionado(row.tipoAtivo)
        setSiglaSelecionada(row.sigla)
        setOpenDialog(true);
    }; 

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async () => {  
        const response = await fetch(ATIVOS_URL  + '/delete-ativo-analise/' + tipoAtivoSelecionado + '/' + siglaSelecionada, {
            method: 'DELETE'           
        })
        const data = await response.json()  
        
        const res = await fetch(ATIVOS_URL + '/list-ativos-analise' )
        const list = await res.json()
        setRowsList(list)

        setOpenDialog(false);
    };  
    

    return (
        <Layout title="Quantitative System">
            <h1>Análise Ativos Selecionados</h1>

            <br></br> <br></br>

            <table>
                <tr>
                    <td>
                    <Box className={classes.boxSelect} >
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Ordenar por</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectOrdenacao}
                                    label="Ordernar por"
                                    onChange={(e) => handleChangeSelect(e, 'ordenacao')}
                                >
                                    <MenuItem value={'-'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Selecione uma opção</fontSize></MenuItem>
                                    <MenuItem value={'coeficienteRoiDividendo'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Coeficiente Roi Dividendo</fontSize></MenuItem>
                                    <MenuItem value={'quantidadeOcorrenciaDividendos'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Quantidade Ocorrências Dividendos</fontSize></MenuItem>
                                    <MenuItem value={'valorUltCotacao'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Valor Última Cotação R$</fontSize></MenuItem>
                                    <MenuItem value={'dataUltCotacao'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Data Última Cotação</fontSize></MenuItem>
                                    <MenuItem value={'valorUltDividendo'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Valor Último Dividendo R$</fontSize></MenuItem>
                                    <MenuItem value={'dataUltiDividendo'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Data Último Dividendo</fontSize></MenuItem>
                                </Select>

                            </FormControl>
                        </Box>                        
                    </td>

                    <td>
                        <Box className={classes.boxSelect} >
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Tipo Ordenação</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectTipoOrdenacao}
                                    label="Tipo Ordenação"
                                    onChange={(e) => handleChangeSelect(e, 'tipoOrdenacao')}
                                >
                                    <MenuItem value={'crescente'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Crescente</fontSize></MenuItem>
                                    <MenuItem value={'decrescente'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Decrescente</fontSize></MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </td>

                    <td>
                        <Button
                            id="basic-button"
                            variant="contained"
                            aria-haspopup="true"
                            onClick={handleFilter}
                            className={classes.text}
                        >
                            Filtrar
                        </Button>

                    </td>

                </tr>    
            </table>

            <br></br> <br></br> <br></br>

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
                                            {row.tipoAtivo}
                                        </TableCell>
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

export default AnaliseAtivos;
 
export async function getStaticProps(context) {
    const res = await fetch(ATIVOS_URL + '/list-ativos-analise')
    const list = await res.json()
    return {
        props: {
            list
        }, // will be passed to the page component as props
    }
} 