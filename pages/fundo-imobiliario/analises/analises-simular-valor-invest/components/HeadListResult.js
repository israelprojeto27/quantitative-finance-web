import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { makeStyles } from '@material-ui/styles';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'


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

export const columnsList = [
    { id: 1, label: 'Sigla', align: 'left', minWidth: 10, },
    { id: 2, label: 'Valor Investimento R$', align: 'left', minWidth: 10, },
    { id: 2, label: 'Valor Ultima Cotação R$', align: 'left', minWidth: 10, },
    { id: 3, label: 'Data Ultima Cotação R$', align: 'left', minWidth: 10, },
    { id: 4, label: 'Valor Ultimo Dividendo R$', align: 'left', minWidth: 10, },
    { id: 5, label: 'Data Ultimo Dividendo R$', align: 'left', minWidth: 10, },   
    { id: 6, label: 'Actions', align: 'left', minWidth: 10, },
];

function HeadListResult() {
    const classes = useStyles();
    const router = useRouter();
    return (
        <>
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
        </>
    );
}

export default HeadListResult;