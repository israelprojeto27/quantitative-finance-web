import * as React from 'react';
import Layout from "../../../components/Layout";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'next/router';


import { useRouter } from 'next/router'
import { ATIVOS_ANALISE_URL, STOCK_ANALISE_URL, STOCK_COTACAO_URL } from '../../../constants/constants';
import TabListCotacoesDiarias from './TabListCotacoesDiarias';
import TabListCotacoesSemanais from './TabListCotacoesSemanais';
import TabListCotacoesMensais from './TabListCotacoesMensais';
import TabListIncreasePercentMensal from './TabListIncreasePercentMensal';
import TabListIncreasePercentDiario from './TabListIncreasePercentDiario';
import TabListIncreasePercentSemanal from './TabListIncreasePercentSemanal';
import TabListDividendos from './TabListDividendos';
import TabValorRendimentoDividendos from './TabValorRendimentoDividendos';
import TabValorRendimentoDividendosQuantCotas from './TabValorRendimentoDividendosQuantCotas';
import TabListRoiDividendoCotacao from './TabListRoiDividendoCotacao';
import { Button } from '@mui/material'


const useStyles = makeStyles({
    tabselect: {
        background: 'green',
        color: 'white'
    },
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
    buttonback: {
        paddingTop: '25px',
        maxWidth: '250px'
    },
});  

function index({detalheStock}) {
    const [value, setValue] = useState('1');    
    const classes = useStyles();    
      
    const router = useRouter();

    const[detail, setDetail] = useState({})

    function handleChange (newValue) {
        setValue(newValue);        
    };

    useEffect(() => { 
        setDetail(detalheStock)
    }, [router.query]);

    function goBack() {
        router.back();
    }

    const handleAddAtivoAnalise = async (event) => {

        const response = await fetch(ATIVOS_ANALISE_URL + '/add-analise-ativo/stock/' + detail.sigla, {
            method: 'POST',
            body: JSON.stringify(
                {                
                    
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()           
        alert('stock adicionada na lista de Ativos sendo analisados: ' + detail.sigla) 
    }

    const handleAddAnalise = async (event) => {

        const response = await fetch(STOCK_ANALISE_URL + '/add-stock/' + detail.sigla, {
            method: 'POST',
            body: JSON.stringify(
                {                
                    
                }),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()           
        alert('stock adicionada na lista de analises: ' + detail.sigla) 
    }

    return (
        <Layout>

            <br></br>
            
            <h1>Tela de Detalhes da stock</h1>            

            <br></br>

            <p><strong> stock selecionada:  </strong>{detalheStock.sigla}</p>

            <br></br>  

            <p><strong> Dividend Yield (em %):  </strong>{detalheStock.dividendYield}</p>

            <br></br> 

            <table>
                <tr>
                    <td>
                        <Button variant="contained" fullWidth="true" onClick={goBack}>Voltar</Button>
                    </td>
                    <td>
                    <Button variant='contained' onClick={(e) => handleAddAnalise(e)} >Add Lista Análise Stocks</Button>
                     
                    </td>
                    <td>
                    <Button variant='contained' onClick={(e) => handleAddAtivoAnalise(e)} >Add Lista Análise Ativos</Button>
                    </td>
                </tr>
            </table>
            

            

            <br></br> <br></br>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList aria-label="lab API tabs example">                            
                            <Tab label="Cotações Diárias" onClick={() => handleChange('1')} className={value === '1' ? (classes.tabselect) : ("")} />
                            <Tab label="Cotações Semanais" onClick={() => handleChange('2')} className={value === '2' ? (classes.tabselect) : ("")} />
                            <Tab label="Cotações Mensais" onClick={() => handleChange('3')} className={value === '3' ? (classes.tabselect) : ("")} />
                            <Tab label="% Crescimento (Diario)" onClick={() => handleChange('4')} className={value === '4' ? (classes.tabselect) : ("")} />
                            <Tab label="% Crescimento (Semanal)" onClick={() => handleChange('5')} className={value === '5' ? (classes.tabselect) : ("")} />
                            <Tab label="% Crescimento (Mensal)" onClick={() => handleChange('6')} className={value === '6' ? (classes.tabselect) : ("")} />
                            <Tab label="Dividendos" onClick={() => handleChange('7')} className={value === '7' ? (classes.tabselect) : ("")} />
                            <Tab label="Roi Dividendo Cotação " onClick={() => handleChange('8')} className={value === '8' ? (classes.tabselect) : ("")} />
                            <Tab label="Simulação Rendimento Dividendos " onClick={() => handleChange('9')} className={value === '9' ? (classes.tabselect) : ("")} />
                            <Tab label="Simulação Rendimento Dividendos por Cotas" onClick={() => handleChange('10')} className={value === '10' ? (classes.tabselect) : ("")} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <TabListCotacoesDiarias list={detalheStock.listCotacaoDiario}  />
                    </TabPanel>

                    <TabPanel value="2">
                        <TabListCotacoesSemanais list={detalheStock.listCotacaoSemanal}  />                    
                    </TabPanel>

                    <TabPanel value="3">
                         <TabListCotacoesMensais list={detalheStock.listCotacaoMensal}   />                    
                    </TabPanel>
                    <TabPanel value="4">
                         <TabListIncreasePercentDiario list={detalheStock.listIncreasePercentDiario}  />
                    </TabPanel>
                    <TabPanel value="5">
                        <TabListIncreasePercentSemanal list={detalheStock.listIncreasePercentSemanal}  />
                    </TabPanel>
                    <TabPanel value="6">
                        <TabListIncreasePercentMensal list={detalheStock.listIncreasePercentMensal}  />
                    </TabPanel>
                    <TabPanel value="7">
                        <TabListDividendos list={detalheStock.listDividendos}  />                    
                    </TabPanel>
                    <TabPanel value="8">
                        <TabListRoiDividendoCotacao  list={detalheStock.listRoiDividendoCotacao}/>                    
                    </TabPanel>
                    <TabPanel value="9">
                        <TabValorRendimentoDividendos ativo={detalheStock.sigla} />                    
                    </TabPanel>
                    <TabPanel value="10">
                        <TabValorRendimentoDividendosQuantCotas  ativo={detalheStock.sigla}/>                    
                    </TabPanel>
                    
                </TabContext>
            </Box>
        </Layout>                
    );
}

export default index;

export async function getServerSideProps({ query }) {
    
    const sigla = query.sigla
    const res = await fetch(STOCK_COTACAO_URL + '/cotacao-full-by-sigla/'+sigla)
    const detalheStock = await res.json()        
    return {
      props: {
        detalheStock
      }, // will be passed to the page component as props
    }
}