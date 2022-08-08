import Layout from '../../components/Layout'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { Button } from '@mui/material'

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import HeadList from '../../components/HeadList/HeadList';
import { BDR_URL } from '../../constants/constants';


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

function Bdr({ list }) {
    const classes = useStyles();
    const router = useRouter();

    const [rowsList, setRowsList] = useState([]);

    function handleDetail(row) {       
        router.push({
            pathname:  '/bdr/detail',
            query: { sigla: row.sigla },
        }) 
    }

    useEffect(() => {
        setRowsList(list)
    }, []);

    return (
        <Layout title="Quantitative System">
            <h1>Lista de BDRs</h1>

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
                                                <Button variant='succes' onClick={() => handleDetail(row)}> <ZoomInOutlinedIcon /> </Button>                                        
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

export default Bdr;

export async function getStaticProps(context) {
    const res = await fetch(BDR_URL + '/info-gerais')
    const list = await res.json()
    return {
        props: {
            list
        }, // will be passed to the page component as props
    }
}