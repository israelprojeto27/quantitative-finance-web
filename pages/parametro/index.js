
import { PARAMETRO_URL } from '../../constants/constants';

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

import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';

import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { Button } from '@mui/material'
import Layout from '../../components/Layout';

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
});


export const columnsList = [
    { id: 1, label: 'Tipo Parâmetro', align: 'left', minWidth: 10, },
    { id: 2, label: 'Tipo Valor Parâmetro', align: 'left', minWidth: 10, },
    { id: 3, label: 'Valor', align: 'left', minWidth: 10, },
    { id: 4, label: 'Observação', align: 'left', minWidth: 10, },    
    { id: 5, label: 'Actions', align: 'left', minWidth: 10, },
];


function Parametro({ list }) {
    const classes = useStyles();
    const router = useRouter();

    const [rowsList, setRowsList] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(false);
    const [msgErrorSubmit, setMsgErrorSubmit] = useState('');

    const [parametroSelecionado, setParametroSelecionado] = useState('');

    useEffect(() => {
        setRowsList(list)
    }, []);

    function goAddParametro(){
        router.push('/parametro/add-parametro')
    }

    const handleDelete = async () => {        
        const response = await fetch(PARAMETRO_URL  + '/' + parametroSelecionado, {
            method: 'DELETE'           
        })
        const data = await response.json()  
        
        const res = await fetch(PARAMETRO_URL )
        const list = await res.json()
        setRowsList(list)

        setOpenDialog(false);
    }; 

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    function handleDetail(row) {    
        setOpenDialog(true);
        setParametroSelecionado(row.id);
    };  

    function handleEdit(row) {    
        router.push({
            pathname: '/parametro/edit-parametro',
            query: { object: JSON.stringify(row) },
        })
    }

    return (
        <Layout title="Quantitative System">
            <h1>Lista de Parametros</h1>

            <br></br> <br></br>

            <Button
                id="basic-button"                            
                variant="contained" fullWidth="true"                       
                onClick={goAddParametro}
                className={classes.buttonAdd}
            >
                Adicionar
            </Button>

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
                            {rowsList.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.tipoParametro}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.tipoValorParametro}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.valor}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.obs}
                                        </TableCell>                                     
                                        <TableCell key={row.id} align={row.align}>
                                            <Button variant='success' onClick={() => handleDetail(row)}> <ZoomInOutlinedIcon /> </Button>      
                                            <Button variant='success' onClick={() => handleEdit(row)}> <EditOutlinedIcon /> </Button> 
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <br></br>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="700px"
            >
                <DialogTitle id="alert-dialog-title" >
                    Confirmação de exclusao
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div className={classes.paddingDialogRow}>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Você deseja realmente excluir este parametro?
                            </Typography>                            
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <DialogTitle id="alert-dialog-title" >
                        <Button onClick={handleCloseDialog}>Fechar</Button>
                        <Button onClick={handleDelete}>Confirmar</Button>
                    </DialogTitle>
                </DialogActions>

                
                <br></br>        
                {errorSubmit === true ? (
                    <FormHelperText error={errorSubmit}>
                       <fontSize className={classes.msgError}> {msgErrorSubmit} </fontSize> 
                    </FormHelperText>
                ) : ('') }

            </Dialog>


        </Layout>
    );
}

export default Parametro;

export async function getStaticProps(context) {
    const res = await fetch(PARAMETRO_URL )
    const list = await res.json()
    return {
        props: {
            list
        }, // will be passed to the page component as props
    }
}