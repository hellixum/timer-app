import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'; 
import '../styles.css'

import {Button} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        margin: '10px', 
    }
})

function Timer(props) {
    const classes = useStyles();
    const second = ("0" + Math.floor((props.time / 1000) % 60)).slice(-2); 
    const millisecond = ("0" + ((props.time / 10) % 100)).slice(-2);
    const minute = ("0" + Math.floor((props.time / 60000) % 60)).slice(-2);

    return (
        <div className="Main">
            <h1>STOPWATCH</h1>
            <p className="time">
            {minute} : {second} : {millisecond}
            </p>
            <Button classes={{root: classes.root}} variant="outlined" color="primary" onClick={props.handleStart}>Start</Button>
            <Button classes={{root: classes.root}} variant="outlined" color="primary" onClick={props.handlePauseResume}>{props.isPaused ? "Resume" : "Pause"}</Button>
            <Button classes={{root: classes.root}} variant="outlined" color="primary" onClick={props.handleReset}>Reset</Button>
            <br />
            <Button classes={{root: classes.root}} variant="contained">
                <Link to='/history'>
                    History
                </Link>
            </Button>
        </div>
    )
}

export default Timer
