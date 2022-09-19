import Layout from "../../../components/Layout";



import AddBoxIcon from '@mui/icons-material/AddBox';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

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

import Collapse from '@mui/material/Collapse';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BDR_COTACAO_URL, BDR_URL, ATIVOS_ANALISE_URL, BDR_ANALISE_URL } from '../../../constants/constants';

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


function CalculaPorcentagemCrescimentoCotacoes({ result }) {
    const classes = useStyles();
    const router = useRouter();

    const [value, setValue] = useState('1');
    const [open, setOpen] = useState(true);
    
    function handleSelectTab (newValue) {
        setValue(newValue);        
    };

    const handleAddAtivoAnalise = async (sigla) => {

        const response = await fetch(ATIVOS_ANALISE_URL + '/add-analise-ativo/bdr/' + sigla, {
            method: 'POST',
            body: JSON.stringify(
                {                
                    
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()           
        alert('BDR adicionado na lista de Ativos sendo analisados: ' + sigla) 
    }

    const handleAddAnalise = async (sigla) => {

        const response = await fetch(BDR_ANALISE_URL + '/add-bdr/' + sigla, {
            method: 'POST',
            body: JSON.stringify(
                {                
                    
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()           
        alert('BDR adicionado na lista de analises: ' + sigla) 
    }

    function handleDetail(sigla) {       
        router.push({
            pathname:  '/bdr/detail',
            query: { sigla: sigla },
        }) 
    }


    return (
        <Layout title="Quantitative System">
            <h1>Calculo Porcentagem Crescimento BDRs</h1>

            <br></br> <br></br> <br></br>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>

                            {open === true ? (
                                <TabContext value={value}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <TabList aria-label="lab API tabs example">
                                            <Tab label="Porcentagem Cotações Diarias" onClick={() => handleSelectTab('1')} className={value === '1' ? (classes.tabselect) : ("")} />
                                            <Tab label="Porcentagem Cotações Semanais" onClick={() => handleSelectTab('2')} className={value === '2' ? (classes.tabselect) : ("")} />
                                            <Tab label="Porcentagem Cotações Mensais" onClick={() => handleSelectTab('3')} className={value === '3' ? (classes.tabselect) : ("")} />
                                        </TabList>
                                        <TabPanel value="1">
                                            {result.listDiario.map((sum) => {
                                                return (
                                                    <Table size="small" aria-label="purchases">

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Sigla</TableCell>
                                                                <TableCell>Somatório Porcentagem</TableCell>
                                                                <TableCell>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow key="1">
                                                                <TableCell component="th" scope="row">
                                                                    {sum.sigla}
                                                                </TableCell>
                                                                <TableCell>{sum.sumIncreasePercentFmt}</TableCell>
                                                                <TableCell>  <Button variant='succes' onClick={() => handleDetail(sum.sigla)}> <ZoomInOutlinedIcon /> </Button></TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAnalise(sum.sigla)}> <AddBoxIcon /> </Button></TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAtivoAnalise(sum.sigla)}> <ArrowCircleUpIcon /> </Button></TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                        <br></br><br></br>
                                                    </Table>
                                                );
                                            })}
                                        </TabPanel>

                                        <TabPanel value="2">
                                            {result.listSemanal.map((count) => {
                                                return (
                                                    <Table size="small" aria-label="purchases">

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Sigla</TableCell>
                                                                <TableCell>Somatório Porcentagem</TableCell>
                                                                <TableCell>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow key="1">
                                                                <TableCell component="th" scope="row">
                                                                    {count.sigla}
                                                                </TableCell>
                                                                <TableCell>{count.sumIncreasePercentFmt}</TableCell>
                                                                <TableCell>  <Button variant='succes' onClick={() => handleDetail(count.sigla)}> <ZoomInOutlinedIcon /> </Button></TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAnalise(count.sigla)}> <AddBoxIcon /> </Button></TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAtivoAnalise(count.sigla)}> <ArrowCircleUpIcon /> </Button></TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                        <br></br><br></br>
                                                    </Table>
                                                );
                                            })}
                                        </TabPanel>

                                        <TabPanel value="3">
                                            {result.listMensal.map((count) => {
                                                return (
                                                    <Table size="small" aria-label="purchases">

                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Sigla</TableCell>
                                                                <TableCell>Somatório Porcentagem</TableCell>
                                                                <TableCell>Actions</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow key="1">
                                                                <TableCell component="th" scope="row">
                                                                    {count.sigla}
                                                                </TableCell>
                                                                <TableCell>{count.sumIncreasePercentFmt}</TableCell>
                                                                <TableCell>  <Button variant='succes' onClick={() => handleDetail(count.sigla)}> <ZoomInOutlinedIcon /> </Button></TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAnalise(count.sigla)}> <AddBoxIcon /> </Button></TableCell>
                                                                <TableCell><Button variant='succes' onClick={() => handleAddAtivoAnalise(count.sigla)}> <ArrowCircleUpIcon /> </Button></TableCell>
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

export default CalculaPorcentagemCrescimentoCotacoes;


export async function getStaticProps(context) {
    const res = await fetch(BDR_COTACAO_URL + '/sum-increase-percent-cotacao')
    const result = await res.json()
    return {
        props: {
            result
        }, // will be passed to the page component as props
    }
}