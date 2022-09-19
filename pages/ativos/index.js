import Layout from "../../components/Layout";

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

 
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { Button } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import { ATIVOS_URL, ATIVOS_ANALISE_URL, ACAO_ANALISE_URL, FUNDO_IMOBILIARIO_ANALISE_URL, BDR_ANALISE_URL } from '../../constants/constants'

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


function Ativos({ list }) {

    const classes = useStyles();
    const router = useRouter();

    const [selectOrdenacao, setSelectOrdenacao] = useState('-');
    const [selectTipoOrdenacao, setSelectTipoOrdenacao] = useState('crescente');

    const [rowsList, setRowsList] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

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
        const res = await fetch(ATIVOS_URL + '/filter?orderFilter=' + selectOrdenacao + '&typeOrderFilter=' + selectTipoOrdenacao)        
        const list = await res.json()        
        setRowsList(list)        
    }

    function handleSelect(event, select) {
        if ( select === 'mapaDividendos'){
            router.push('/ativos/mapa-dividendos')
        }        
        else if ( select === 'analisesAtivos'){            
            router.push('/ativos/analises')
        }  
        else if ( select === 'simularValorInvestimentos'){            
            router.push('/ativos/valor-investimento')
        }  
        else if ( select === 'calculaPorcentagemAtivos'){            
            router.push('/ativos/calcula-porcentagem-crescimento-cotacoes')
        }          
    }    

    function handleClickMenu(event) {
        setAnchorEl(event.currentTarget);
        setOpen(true)
    }

    function handleCloseMenu() {
        setOpen(false);
    }

    function handleDetail(row) {
        if ( row.tipoAtivo === 'acao'){
            router.push({
                pathname: '/acoes/detail',
                query: { sigla: row.sigla },
            })
        }        
        else if ( row.tipoAtivo === 'fundo imobiliario'){
            router.push({
                pathname: '/fundo-imobiliario/detail',
                query: { sigla: row.sigla },
            })
        }    
        else if ( row.tipoAtivo === 'bdr'){
            router.push({
                pathname: '/bdr/detail',
                query: { sigla: row.sigla },
            })
        }           
    }

    const handleAddAtivoAnalise = async (row) => {


        if ( row.tipoAtivo === 'acao'){
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
        else if ( row.tipoAtivo === 'fundo imobiliario'){
            const response = await fetch(ATIVOS_ANALISE_URL + '/add-analise-ativo/fundo imobiliario/' + row.sigla, {
                method: 'POST',
                body: JSON.stringify(
                    {                
                        
                    }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()           
            alert('Fundo imobiliario adicionado na lista de Ativos sendo analisados: ' + row.sigla) 
        }    
        else if ( row.tipoAtivo === 'bdr'){
            const response = await fetch(ATIVOS_ANALISE_URL + '/add-analise-ativo/bdr/' + row.sigla, {
                method: 'POST',
                body: JSON.stringify(
                    {                
                        
                    }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()           
            alert('BDR adicionado na lista de Ativos sendo analisados: ' + row.sigla) 
        } 
       
    }

    const handleAddAnalise = async (row) => {

        if ( row.tipoAtivo === 'acao'){
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
        else if ( row.tipoAtivo === 'fundo imobiliario'){
            const response = await fetch(FUNDO_IMOBILIARIO_ANALISE_URL + '/add-fundo/' + row.sigla, {
                method: 'POST',
                body: JSON.stringify(
                    {                
                        
                    }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()           
            alert('Fundo Imobiliario adicionado na lista de analises: ' + row.sigla)
        }
        else if ( row.tipoAtivo === 'bdr'){
            const response = await fetch(BDR_ANALISE_URL + '/add-bdr/' + row.sigla, {
                method: 'POST',
                body: JSON.stringify(
                    {                
                        
                    }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
            const data = await response.json()           
            alert('BDR adicionado na lista de analises: ' + row.sigla) 
        }


         
    }

    return (
        <Layout title="Quantitative System">
            <h1>Lista de todos Ativos</h1>

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
                            <MenuItem onClick={(e) => handleSelect(e, 'analisesAtivos')}>Análises Ativos</MenuItem>
                            <MenuItem onClick={(e) => handleSelect(e, 'mapaDividendos')}>Mapa Dividendos</MenuItem>
                            <MenuItem onClick={(e) => handleSelect(e, 'simularValorInvestimentos')}>Simular Valor Investimentos Ativos</MenuItem>
                            <MenuItem onClick={(e) => handleSelect(e, 'calculaPorcentagemAtivos')}>Calcula Porcentagem Crescimento Ativos</MenuItem>
                        </Menu>
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

export default Ativos;

export async function getStaticProps(context) {
    const res = await fetch(ATIVOS_URL )
    const list = await res.json()
    return {
        props: {
            list
        }, // will be passed to the page component as props
    }
}