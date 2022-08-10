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
import { BDR_URL, BDR_COTACAO_URL } from '../../../constants/constants';
import TabListCotacoesDiarias from './TabListCotacoesDiarias';
import TabListCotacoesSemanais from './TabListCotacoesSemanais';
import TabListCotacoesMensais from './TabListCotacoesMensais';
import TabListIncreasePercentMensal from './TabListIncreasePercentMensal';
import TabListIncreasePercentDiario from './TabListIncreasePercentDiario';
import TabListIncreasePercentSemanal from './TabListIncreasePercentSemanal';
import TabListDividendos from './TabListDividendos';


const useStyles = makeStyles({
    tabselect: {
        background: 'green',
        color: 'white'
    }
});  

function index({detalheBdr}) {
    const [value, setValue] = useState('1');    
    const classes = useStyles();    
      
    const router = useRouter();

    const[detail, setDetail] = useState({})

    function handleChange (newValue) {
        setValue(newValue);        
    };

    useEffect(() => { 
        setDetail(detalheBdr)
    }, [router.query]);

    return (
        <Layout>
            Tela de Detalhes do BDR

            <br></br> <br></br>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList aria-label="lab API tabs example">                            
                            <Tab label="Cotações Diárias" onClick={() => handleChange('1')} className={value === '1' ? (classes.tabselect) : ("")} />
                            <Tab label="Cotações Semanais" onClick={() => handleChange('2')} className={value === '2' ? (classes.tabselect) : ("")} />
                            <Tab label="Cotações Mensais" onClick={() => handleChange('3')} className={value === '3' ? (classes.tabselect) : ("")} />
                            <Tab label="Porcentagem Crescimento (Diario)" onClick={() => handleChange('4')} className={value === '4' ? (classes.tabselect) : ("")} />
                            <Tab label="Porcentagem Crescimento (Semanal)" onClick={() => handleChange('5')} className={value === '5' ? (classes.tabselect) : ("")} />
                            <Tab label="Porcentagem Crescimento (Mensal)" onClick={() => handleChange('6')} className={value === '6' ? (classes.tabselect) : ("")} />
                            <Tab label="Dividendos" onClick={() => handleChange('7')} className={value === '7' ? (classes.tabselect) : ("")} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <TabListCotacoesDiarias list={detalheBdr.listCotacaoDiario}  />
                    </TabPanel>

                    <TabPanel value="2">
                        <TabListCotacoesSemanais list={detalheBdr.listCotacaoSemanal}  />                    
                    </TabPanel>

                    <TabPanel value="3">
                         <TabListCotacoesMensais list={detalheBdr.listCotacaoMensal}   />                    
                    </TabPanel>
                    <TabPanel value="4">
                         <TabListIncreasePercentDiario list={detalheBdr.listIncreasePercentDiario}  />
                    </TabPanel>
                    <TabPanel value="5">
                        <TabListIncreasePercentSemanal list={detalheBdr.listIncreasePercentSemanal}  />
                    </TabPanel>
                    <TabPanel value="6">
                        <TabListIncreasePercentMensal list={detalheBdr.listIncreasePercentMensal}  />
                    </TabPanel>
                    <TabPanel value="7">
                        <TabListDividendos list={detalheBdr.listDividendos}  />                    
                    </TabPanel>
                </TabContext>
            </Box>
        </Layout>                
    );
}

export default index;

export async function getServerSideProps({ query }) {
    
    const sigla = query.sigla
    const res = await fetch(BDR_COTACAO_URL + '/cotacao-full-by-sigla/'+sigla)
    const detalheBdr = await res.json()        
    return {
      props: {
        detalheBdr
      }, // will be passed to the page component as props
    }
}