import React from 'react';
import classes from './BuildControl.module.css'
const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>LESS</button>
        <button className={classes.More}>MORE</button>
    </div>
);

export default buildControl;