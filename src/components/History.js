import React from 'react'
import {Link} from 'react-router-dom'; 
import '../styles.css'

import {Button} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        maxWidth: "700px", 
        margin:"auto"
    },
  });

function History(props) {
    const classes = useStyles();

    return (
        <div className="Main">
            <h1>HISTORY</h1>
            <TableContainer component={Paper} className={classes.table}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Button Pressed</TableCell>
                        <TableCell align="right">Timer Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.history.map((row, index) => (
                    <TableRow key={index}>
                    <TableCell component="th" scope="row">
                        {row.action}
                    </TableCell>
                    <TableCell align="right">
                        <span>
                            {("0" + Math.floor((row.timerValue / 60000) % 60)).slice(-2)}
                            </span>
                            : 
                            <span>
                            {("0" + Math.floor((row.timerValue / 1000) % 60)).slice(-2)}
                            </span>
                            : 
                            <span>
                            {("0" + ((row.timerValue / 10) % 100)).slice(-2)}
                        </span>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <br />
            <Button className="btn" variant="contained">
                <Link to='/'>
                    Stopwatch
                </Link>
            </Button>
        </div>
    )
}

export default History
