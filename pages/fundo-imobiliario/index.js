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

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import HeadList from '../../components/HeadList/HeadList';
import { FUNDO_IMOBILIARIO_URL } from '../../constants/constants';


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

function FundoImobiliario({ list }) {

    const classes = useStyles();
    const router = useRouter();
    
    const [rowsList, setRowsList] = useState([]);

    const [searchPapel, setSearchPapel] = useState('');

    function handleDetail(row) {       
        router.push({
            pathname:  '/fundo-imobiliario/detail',
            query: { sigla: row.sigla },
        }) 
    }

    useEffect(() => {
        setRowsList(list)
    }, []);


    const handleSearchPapel = async () => {
        setRowsList([])
        if (searchPapel !== '') {
            const res = await fetch(FUNDO_IMOBILIARIO_URL + '/info-gerais-by-sigla/' + searchPapel )
            const list = await res.json()
            setRowsList(list)
        }
        else {
            const res = await fetch(FUNDO_IMOBILIARIO_URL + '/info-gerais')
            const list = await res.json()
            setRowsList(list)
        }
    }

    function handleChange(event, field) {
        if (field === 'searchPapel') {
            setSearchPapel(event.currentTarget.value);
        }
    }

    return (
        <Layout title="Quantitative System">
            <h1>Lista de Fundos Imobiliarios</h1>

            <br></br> <br></br>

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

export default FundoImobiliario;

export async function getStaticProps(context) {
    const res = await fetch(FUNDO_IMOBILIARIO_URL + '/info-gerais')
    const list = await res.json()
    return {
        props: {
            list
        }, // will be passed to the page component as props
    }
}