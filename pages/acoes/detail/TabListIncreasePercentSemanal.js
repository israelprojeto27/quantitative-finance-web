import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import { useRouter } from 'next/router'

import { columnsListIncrease } from './data'

 

const useStyles = makeStyles({
    tabselect: {
        background: 'green',
        color: 'white'
    },
    head: {
        backgroundColor: 'blue',
        color: 'white'
    },
    table: {
        paddingTop: '10px',
        paddingBottom: '10px'
    },
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
    }
});


function TabListIncreasePercentSemanal({list}) {

    const classes = useStyles();  
    const router = useRouter();  

    return (
        <>
             <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 1040 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                                {columnsListIncrease.map((column) => (
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
                             {list.map((row) => {
                                return (                                    
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                       <TableCell key={row.id} align={row.align}>
                                            {row.dataBase}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.dataReference}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.percentual}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.valorFechamentoAtual}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.valorFechamentoAnterior}
                                        </TableCell> 
                                        
                                    </TableRow>
                                ); 
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </>
    );
}



export default TabListIncreasePercentSemanal;