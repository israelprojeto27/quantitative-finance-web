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

import { columnsListCotacoes } from './data'

 

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


function TabListCotacoesMensais({list}) {

    const classes = useStyles();  
    const router = useRouter();  

    return (
        <>
             <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 1040 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead >
                            <TableRow >
                                {columnsListCotacoes.map((column) => (
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
                                            {row.data}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.close}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.high}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.low}
                                        </TableCell>
                                        <TableCell key={row.id} align={row.align}>
                                            {row.open}
                                        </TableCell>    
                                        <TableCell key={row.id} align={row.align}>
                                            {row.adjclose}
                                        </TableCell> 
                                        <TableCell key={row.id} align={row.align}>
                                            {row.volume}
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



export default TabListCotacoesMensais;