import Layout from "../../../components/Layout";

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';


import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

 

import { ACAO_DIVIDENDO_URL } from '../../../constants/constants'


const useStyles = makeStyles({
    tabselect: {
        background: 'green',
        color: 'white'
    },
    head: {
        backgroundColor: 'blue',
        color: 'white'
    },
    table: {
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    paddingDialogRow: {
        paddingTop: '20px'        
    },
    paddingDialogCell: {
        paddingRight: '20px'        
    },
    buttonAdd: {
        paddingTop: '20px',
        paddingBottom: '25px'        
    },
    buttonSearch: {
        paddingLeft: '20px',               
    },
    box: {
        paddingTop: '20px'
    },
    buttonSimulate:{
        paddingTop: '20px',
        paddingBottom: '20px',
        width: '200px'
    }
});

export const columnsList = [
    { id: 1, label: 'Valor Rendimento R$', align: 'left', minWidth: 10, },
    { id: 2, label: 'Valor Dividendo R$', align: 'left', minWidth: 10, },
    { id: 3, label: 'Data Dividendo', align: 'left', minWidth: 10, },
    
];

function TabValorRendimentoDividendosQuantCotas({ativo}) {

    const classes = useStyles();
    const router = useRouter();

    const [quantidadeCotas, setQuantidadeCotas] = useState('');
    const [searchPapel, setSearchPapel] = useState('');
    const [exibeResultado, setExibeResultado] = useState(false);

    const [result, setResult] = useState({});

    useEffect(() => {
        setSearchPapel(ativo)
    }, []);

    function handleChange(event, field) {
        if (field === 'quantidadeCotas') {
            setQuantidadeCotas(event.currentTarget.value);
        }
    }

    const handleSubmit = async () => {
        setExibeResultado(false)
        const res = await fetch(ACAO_DIVIDENDO_URL + '/simula-rendimento-dividendo-by-sigla-by-cotas/' + searchPapel + '/' + quantidadeCotas)
        const resultado = await res.json()
        setResult(resultado)
        setExibeResultado(true)
    }

    return (
        <>
            <h1> Tab para simulação de Rendimento  Dividendos por Quantidade Cotas</h1>

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
                        label="Quantidade Cotas"
                        value={quantidadeCotas}
                        onChange={(e) => handleChange(e, 'quantidadeCotas')}
                    />
                </div> 

                <div className={classes.buttonSimulate}>
                    <Button variant="contained" fullWidth="true" onClick={handleSubmit}>Gerar Simulação</Button>
                </div>

            </Box>

            {exibeResultado ? (
                <>
                    <br></br> <br></br>

                    <p><strong>Quantidade Cotas:</strong> {result.quantidadeCotas} </p>

                    <p><strong>Total Ganho Dividendos R$</strong> {result.totalGanhoDividendosFmt} </p>

                    <p><strong>Ganho Médio Dividendos R$</strong> {result.ganhoMedioDividendosFmt}</p>

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
                                    {result.list.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                <TableCell key={row.id} align={row.align}>
                                                    {row.valorRendimentoFmt}
                                                </TableCell>
                                                <TableCell key={row.id} align={row.align}>
                                                    {row.dataDividendoFmt}
                                                </TableCell>
                                                <TableCell key={row.id} align={row.align}>
                                                    {row.valorDividendoFmt}
                                                </TableCell>

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Paper>
                </>
            ) : (
                <>
                </>)
            }     
            
        </>
    );
}

export default TabValorRendimentoDividendosQuantCotas;