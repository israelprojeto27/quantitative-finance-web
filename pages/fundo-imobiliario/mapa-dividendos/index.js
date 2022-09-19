import Layout from "../../../components/Layout";

import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import Box from '@mui/material/Box';

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import AddBoxIcon from '@mui/icons-material/AddBox';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

import { FUNDO_IMOBILIARIO_URL, ATIVOS_ANALISE_URL, FUNDO_IMOBILIARIO_ANALISE_URL } from '../../../constants/constants';


const useStyles = makeStyles({
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
    tabselect: {
        background: 'green',
        color: 'white'
    },
});

function MapaDividendosBdr() {
    const classes = useStyles();
    const router = useRouter();

    const [periodoInicio, setPeriodoInicio] = useState('');
    const [periodoFim, setPeriodoFim] = useState('');

    const [rowsList, setRowsList] = useState([]);
    const [open, setOpen] = useState(false);

    const [result, setResult] = useState({})
    const [value, setValue] = useState('1');

    function handleChange(event, field) {
        if (field === 'periodoInicio') {
            setPeriodoInicio(event.currentTarget.value);
        }
        else if (field === 'periodoFim') {
            setPeriodoFim(event.currentTarget.value);
        }
    }

    const handleSubmit = async () => {
        const res = await fetch(FUNDO_IMOBILIARIO_URL + '/mapa-dividendos/' + periodoInicio + '/' + periodoFim)
        const resultado = await res.json()
        setResult(resultado);
        setOpen(true)
        setValue('1')
    }

    function goBack() {
        router.push('/acoes');
    }

    function handleSelectTab (newValue) {
        setValue(newValue);        
    };

    const handleAddAtivoAnalise = async (sigla) => {

        const response = await fetch(ATIVOS_ANALISE_URL + '/add-analise-ativo/fundo imobiliario/' + sigla, {
            method: 'POST',
            body: JSON.stringify(
                {                
                    
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()           
        alert('Fundo Imobiliario adicionado na lista de Ativos sendo analisados: ' + sigla) 
    }

    const handleAddAnalise = async (sigla) => {

        const response = await fetch(FUNDO_IMOBILIARIO_ANALISE_URL + '/add-fundo/' + sigla, {
            method: 'POST',
            body: JSON.stringify(
                {                
                    
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()           
        alert('Fundo Imobiliario adicionado na lista de analises: ' + sigla) 
    }

    function handleDetail(sigla) {       
        router.push({
            pathname:  '/fundo-imobiliario/detail',
            query: { sigla: sigla },
        }) 
    }

    return (
        <Layout title="Quantitative System">
            <h1>Mapa Dividendos Fundos Imobiliarios</h1>

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
                        label="Periodo Inicio"
                        value={periodoInicio}
                        onChange={(e) => handleChange(e, 'periodoInicio')}
                    />
                </div>

                <div className={classes.text}>
                    <TextField
                        id="outlined-required"
                        label="Periodo Fim"
                        value={periodoFim}
                        onChange={(e) => handleChange(e, 'periodoFim')}
                    />
                </div>

                <div className={classes.button}>
                    <Button variant="contained" fullWidth="true" onClick={handleSubmit}>Gerar Mapa</Button>
                </div>

                <div className={classes.button}>
                    <Button variant="contained" fullWidth="true" onClick={goBack}>Voltar</Button>
                </div>


            </Box>

            <br></br>       <br></br>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>

                            {open === true ? (
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList aria-label="lab API tabs example">
                                            <Tab label="Somatório Dividendos em R$" onClick={() => handleSelectTab('1')} className={value === '1' ? (classes.tabselect) : ("")} />
                                            <Tab label="Quantidade Ocorrências Dividendos" onClick={() => handleSelectTab('2')} className={value === '2' ? (classes.tabselect) : ("")} />
                                            <Tab label="Lista Dividendos Periodos" onClick={() => handleSelectTab('3')} className={value === '3' ? (classes.tabselect) : ("")} />
                                            <Tab label="ROI Dividendo Cotação" onClick={() => handleSelectTab('4')} className={value === '4' ? (classes.tabselect) : ("")} />
                                        </TabList>
                                        <TabPanel value="1">
                                            {result.listSum.map((sum) => {
                                                return (
                                                    <Table size="small" aria-label="purchases">

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Sigla</TableCell>
                                                                <TableCell>Somatório Dividendos R$ (no período)</TableCell>
                                                                <TableCell>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow key="1">
                                                                <TableCell component="th" scope="row">
                                                                    {sum.sigla}
                                                                </TableCell>
                                                                <TableCell>{sum.sumDividendosFmt}</TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleDetail(sum.sigla)}> <ZoomInOutlinedIcon /> </Button>  </TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAnalise(sum.sigla)}> <AddBoxIcon /> </Button>  </TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAtivoAnalise(sum.sigla)}> <ArrowCircleUpIcon /> </Button>  </TableCell> 
                                                            </TableRow>
                                                        </TableBody>
                                                        <br></br><br></br>
                                                    </Table>
                                                );
                                            })}
                                        </TabPanel>

                                        <TabPanel value="2">
                                            {result.listCount.map((count) => {
                                                return (
                                                    <Table size="small" aria-label="purchases">

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Sigla</TableCell>
                                                                <TableCell>Quantidade de Ocorrências de Dividendos</TableCell>
                                                                <TableCell>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow key="1">
                                                                <TableCell component="th" scope="row">
                                                                    {count.sigla}
                                                                </TableCell>
                                                                <TableCell>{count.countDividendos}</TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleDetail(count.sigla)}> <ZoomInOutlinedIcon /> </Button>  </TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAnalise(count.sigla)}> <AddBoxIcon /> </Button>  </TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAtivoAnalise(count.sigla)}> <ArrowCircleUpIcon /> </Button>  </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                        <br></br><br></br>
                                                    </Table>
                                                );
                                            })}
                                        </TabPanel>

                                        <TabPanel value="3">
                                            {result.listMapas.map((mapa) => {
                                                return (
                                                    <div>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            {mapa.anoMes}
                                                        </Typography>

                                                        <Table size="small" aria-label="purchases">

                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Sigla</TableCell>
                                                                    <TableCell>Valor Dividendo R$</TableCell>
                                                                    <TableCell>Actions</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {mapa.list.map((detalhe) => {
                                                                    return (
                                                                        <TableRow key="1">
                                                                            <TableCell component="th" scope="row">
                                                                                {detalhe.sigla}
                                                                            </TableCell>
                                                                            <TableCell>{detalhe.dividendoFmt}</TableCell>
                                                                            <TableCell><Button variant='succes' onClick={() => handleDetail(detalhe.sigla)}> <ZoomInOutlinedIcon /> </Button>  </TableCell>
                                                                            <TableCell><Button variant='succes' onClick={() => handleAddAnalise(detalhe.sigla)}> <AddBoxIcon /> </Button>  </TableCell>
                                                                            <TableCell><Button variant='succes' onClick={() => handleAddAtivoAnalise(detalhe.sigla)}> <ArrowCircleUpIcon /> </Button>  </TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })}
                                                            </TableBody>

                                                        </Table>

                                                        <br></br> <br></br>
                                                    </div>
                                                );
                                            })}
                                        </TabPanel>

                                        <TabPanel value="4">
                                            {result.listRoiInvestimento.map((count) => {
                                                return (
                                                    <Table size="small" aria-label="purchases">

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Sigla</TableCell>
                                                                <TableCell>Coeficiente ROI</TableCell>
                                                                <TableCell>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow key="1">
                                                                <TableCell component="th" scope="row">
                                                                    {count.sigla}
                                                                </TableCell>
                                                                <TableCell>{count.coeficienteRoiFmt}</TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleDetail(count.sigla)}> <ZoomInOutlinedIcon /> </Button>  </TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAnalise(count.sigla)}> <AddBoxIcon /> </Button>  </TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAtivoAnalise(count.sigla)}> <ArrowCircleUpIcon /> </Button>  </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                        <br></br><br></br>
                                                    </Table>
                                                );
                                            })}
                                        </TabPanel>
                                    </Box>
                                </TabContext>
                            ) : ('')}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>


        </Layout>
    );
}

export default MapaDividendosBdr;