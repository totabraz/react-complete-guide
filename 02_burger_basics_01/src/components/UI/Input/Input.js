import React from 'react';
import classes from './Input.module.css';

const input =  (props) => {
    
    let inputElement = null
    const inputClasses = [classes.inputElement]
    if (props.invalid && props.shouldValidate && props.touched) inputClasses.push(classes.Invalid)
    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
            break;
            
        case ('textarea'):
            inputElement = <textarea
                onChange={props.changed}
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}/>
            break;
        
        case ('select'):
            inputElement = <select
                onChange={props.changed}
                    className={inputClasses.join(' ')}
                    value={props.value}>
                    {props.elementConfig.options.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.displayValue}</option>
                        ))
                    }
                </select>
            break;
            
        default:
                inputElement = <input
                    onChange={props.changed}
                    className={inputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}/>
            break;
    }
    
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
    }


    return (
        <div className={classes.InputArea}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}
export default input;