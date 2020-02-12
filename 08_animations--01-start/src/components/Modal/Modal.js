import React from 'react';

import './Modal.css';

const modal = (props) => {
    console.log('props.show', props.show );
    
    const cssClass = ['Modal', props.show ? 'ModalOpen' : 'ModalClosed']
    console.log('cssClass', cssClass );
    return (
        <div className={cssClass.join(' ')}>
            <h1>A Modal</h1>
            <button className="Button" onClick={props.closed}>Dismiss</button>
        </div>
    )
}

export default modal;