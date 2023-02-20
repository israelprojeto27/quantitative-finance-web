import Layout from '../../components/Layout'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TableRow from '@mui/material/TableRow';

import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { Button } from '@mui/material'

import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Menu from '@mui/material/Menu';

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import HeadList from '../../components/HeadList/HeadList';
import { ACAO_URL } from '../../constants/constants';
import { ACAO_ANALISE_URL } from '../../constants/constants';
import { ATIVOS_ANALISE_URL } from '../../constants/constants';


const useStyles = makeStyles({
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
    }
});

function Acoes({ list }) {
    const classes = useStyles();
    const router = useRouter();

    const [rowsList, setRowsList] = useState([]);

    const [searchPapel, setSearchPapel] = useState('');

    const [selectOrdenacao, setSelectOrdenacao] = useState('-');
    const [selectTipoOrdenacao, setSelectTipoOrdenacao] = useState('crescente');

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setRowsList(list)
    }, []);

    function handleDetail(row) {
        router.push({
            pathname: '/acoes/detail',
            query: { sigla: row.sigla },
        })
    }

    const handleSearchPapel = async () => {
        setRowsList([])
        if (searchPapel !== '') {
            const res = await fetch(ACAO_URL + '/info-gerais-by-sigla/' + searchPapel)
            const list = await res.json()
            setRowsList(list)
        }
        else {
            const res = await fetch(ACAO_URL + '/info-gerais')
            const list = await res.json()
            setRowsList(list)
        }        
    }

    
    const handleAddAtivoAnalise = async (row) => {

        const response = await fetch(ATIVOS_ANALISE_URL + '/add-analise-ativo/acao/' + row.sigla, {
            method: 'POST',
            body: JSON.stringify(
                {                
                    
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()           
        alert('Ação adicionada na lista de Ativos sendo analisados: ' + row.sigla) 
    }

    const handleAddAnalise = async (row) => {

        const response = await fetch(ACAO_ANALISE_URL + '/add-acao/' + row.sigla, {
            method: 'POST',
            body: JSON.stringify(
                {                
                    
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()           
        alert('Ação adicionada na lista de analises: ' + row.sigla) 
    }

    function handleChange(event, field) {
        if (field === 'searchPapel') {
            setSearchPapel(event.currentTarget.value);
        }
    }

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
        const res = await fetch(ACAO_URL + '/filter-info-gerais?orderFilter=' + selectOrdenacao + '&typeOrderFilter=' + selectTipoOrdenacao)
        const list = await res.json()
        setRowsList(list)
    }

    function handleClickMenu(event) {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    }

    function handleCloseMenu() {
        setOpen(false);
    }

    function handleSelect(event, select) {
        if ( select === 'mapaDividendos'){
            router.push('/acoes/mapa-dividendos')
        }        
        else if ( select === 'simularValorInvest'){            
            router.push('/acoes/simular-valor-invest')
        }    
        else if ( select === 'simularValorRendimentoCotas'){            
            router.push('/acoes/simular-valor-rendimento-cotas')
        }               
        else if ( select === 'simularInvestimentoVariasAcoes'){            
            router.push('/acoes/simular-investimento-varias-acoes')
        }     
        else if ( select === 'calculoPorcentagemCrescimentoCotacoes'){            
            router.push('/acoes/calcula-porcentagem-crescimento-cotacoes')
        }  
        else if ( select === 'analisesAcoes'){            
            router.push('/acoes/analises')
        }  
                     
    };


    return (
        <Layout title="Quantitative System">
            <h1>Lista de Acoes</h1>

            <br></br> <br></br>

            <table>
                <tr>
                    <td>
                        <TextField
                            className={classes.buttonSearch}
                            placeholder="Informe um valor"
                            size="small"
                            defaultValue=""
                            value={searchPapel}
                            onChange={(e) => handleChange(e, 'searchPapel')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <IconButton>
                                            <SearchIcon onClick={handleSearchPapel} />
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
                                    <MenuItem value={'valorUltCotacao'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Valor Última Cotação R$</fontSize></MenuItem>
                                    <MenuItem value={'dataUltCotacao'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Data Última Cotação</fontSize></MenuItem>
                                    <MenuItem value={'valorUltDividendo'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Valor Último Dividendo R$</fontSize></MenuItem>
                                    <MenuItem value={'dataUltiDividendo'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Data Último Dividendo</fontSize></MenuItem>
                                    <MenuItem value={'dividendYield'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Dividend Yield (em %)</fontSize></MenuItem>

                                    <MenuItem value={'roe'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>ROE</fontSize></MenuItem>
                                    <MenuItem value={'pvp'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>P/VP</fontSize></MenuItem>
                                    <MenuItem value={'pl'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>P/L</fontSize></MenuItem>
                                    <MenuItem value={'psr'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>PSR</fontSize></MenuItem>
                                    <MenuItem value={'p_ativos'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>P/Ativos</fontSize></MenuItem>
                                    <MenuItem value={'p_ebit'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>P/Ebit</fontSize></MenuItem>
                                    <MenuItem value={'marg_ebit'} className={classes.selectTextOption}><fontSize className={classes.selectTextOption}>Margem Ebit</fontSize></MenuItem>
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

                    <td className={classes.cardTd}>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            variant="contained"
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={(e) => handleClickMenu(e)}
                            className={classes.text}
                        >
                            Funcionalidades
                        </Button>

                        <Menu
                            id="basic-menu"
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleCloseMenu}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={(e) => handleSelect(e, 'mapaDividendos')}>Mapa Dividendos</MenuItem>
                            <MenuItem onClick={(e) => handleSelect(e, 'simularValorInvest')}>Simular Valor Investimento</MenuItem>
                            <MenuItem onClick={(e) => handleSelect(e, 'simularValorRendimentoCotas')}>Simular Valor Rendimento por Quant. Cotas</MenuItem>
                            <MenuItem onClick={(e) => handleSelect(e, 'simularInvestimentoVariasAcoes')}>Simular Investimento Várias Ações</MenuItem>                            
                            <MenuItem onClick={(e) => handleSelect(e, 'calculoPorcentagemCrescimentoCotacoes')}>Calcula Porcentagem Crescimento Ações</MenuItem>
                            <MenuItem onClick={(e) => handleSelect(e, 'analisesAcoes')}>Análises Ações</MenuItem>
                        </Menu>
                    </td>
                </tr>
            </table>



            <br></br> <br></br>

            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 1040 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <HeadList />
                        <TableBody>
                            {rowsList.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.sigla}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.valorUltimaCotacao}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.dataUltimaCotacao}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.valorUltimoDividendo}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.dataUltimoDividendo}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.dividendYield}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.roe}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.pvp}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.pl}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.psr}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.pativos}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.pebit}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.margEbit}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            <Button variant='succes' onClick={() => handleDetail(row)}> <ZoomInOutlinedIcon /> </Button>
                                            <Button variant='succes' onClick={() => handleAddAnalise(row)}> <AddBoxIcon /> </Button>
                                            <Button variant='succes' onClick={() => handleAddAtivoAnalise(row)}> <ArrowCircleUpIcon /> </Button>
                                            
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

export default Acoes;

export async function getStaticProps(context) {
    const res = await fetch(ACAO_URL + '/info-gerais')
    const list = await res.json()
    return {
        props: {
            list
        }, // will be passed to the page component as props
    }
}