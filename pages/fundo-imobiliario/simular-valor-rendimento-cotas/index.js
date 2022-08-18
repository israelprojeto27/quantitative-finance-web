import Layout from "../../../components/Layout";


import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import { FUNDO_IMOBILIARIO_URL } from '../../../constants/constants';

import  HeadListResult  from './components/HeadListResult'



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
    }
});


function SimularValorRendimentoCotas() {

    const classes = useStyles();
    const router = useRouter();

    const [valorInvestimento, setValorInvestimento] = useState('');
    const [rowsList, setRowsList] = useState([]);
 
    const [searchPapel, setSearchPapel] = useState('');
    const [selectOrdenacao, setSelectOrdenacao] = useState('-');
    const [selectTipoOrdenacao, setSelectTipoOrdenacao] = useState('crescente');

    function handleChange(event, field) {
        if (field === 'valorInvestimento') {
            setValorInvestimento(event.currentTarget.value);
        } 
        else if (field === 'searchPapel') {
            setSearchPapel(event.currentTarget.value);
        } 
    }

    function goBack() {
        router.push('/acoes');
    }

    const handleSubmit = async () => {
        setRowsList([])
        const res = await fetch(FUNDO_IMOBILIARIO_URL + '/simula-rendimento-por-cotas/' + valorInvestimento  + '/')        
        const list = await res.json()        
        setRowsList(list)
    }

    const handleFilter = async () => {
        setRowsList([]);
        const res = await fetch(FUNDO_IMOBILIARIO_URL + '/filter-simula-rendimento-por-cotas/' + valorInvestimento  + '/?orderFilter=' + selectOrdenacao + '&typeOrderFilter=' + selectTipoOrdenacao)
        const list = await res.json()
        setRowsList(list)
    }

    const handleFilterSigla = async () => {
        setRowsList([]);
        const res = await fetch(FUNDO_IMOBILIARIO_URL + '/simula-rendimento-por-cotas-by-sigla/' + valorInvestimento  + '/' + searchPapel)
        const list = await res.json()
        setRowsList(list)
    }

    function handleChangeSelect(event, select) {
        if (select === 'ordenacao') {
            setSelectOrdenacao(event.target.value);
        }
        else if (select === 'tipoOrdenacao') {
            setSelectTipoOrdenacao(event.target.value);
        }
    };

    return (
        <Layout title="Quantitative System">
            <h1>Simulação Valor Rendimento por Quantidade de Cotas e Dividendos - Fundos Imobiliarios</h1>

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
                    <Button variant="contained" fullWidth="true" onClick={handleSubmit}>Gerar Simulação</Button>
                </div>

            </Box>

            <br></br>       <br></br>

            <table className={classes.table}>
                <tr>
                    <td>
                        <TextField
                            className={classes.buttonSearch}
                            placeholder="Informe uma sigla"
                            size="small"
                            defaultValue=""
                            value={searchPapel}
                            onChange={(e) => handleChange(e, 'searchPapel')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon onClick={handleFilterSigla} />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </td>

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
                                    <MenuItem value={'valorRendimento'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Valor Rendimento R$</fontSize></MenuItem>                                    
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


            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 1040 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <HeadListResult />
                        <TableBody>
                            {rowsList.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.sigla}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.valorRendimentoFmt}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.quantidadeCotasFmt}
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
                                            
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>


        </Layout>
    );
}

export default SimularValorRendimentoCotas;