import React from 'react';
import './Modal.css';
import { Transition } from "react-transition-group";


const animationTime = {
    enter: 400,
    exit: 400
}
const modal = (props) => {
    console.log('props.show', props.show)
    return (
        <Transition
            in={props.show}
            timeout={animationTime}
            mountOnEnter
            unmountOnExit
            onEnter={() => { console.log('onEnter')}}
            onEntering={() => { console.log('onEntering')}}
            onEntered={() => { console.log('onEntered')}}
            onExit={() => { console.log('onExit')}}
            onExiting={() => { console.log('onExiting')}}
            onExited={() => { console.log('onExited')}}
            >
            {state => {
                const cssClass = [
                    'Modal',
                    state === "entering"
                        ? 'ModalOpen'
                        : state === 'exiting' ? 'ModalClosed' : null]
                return (
                    <div className={cssClass.join(' ')}>
                        <h1>A Modal</h1>
                        <button className="Button" onClick={props.closed}>Dismiss</button>
                    </div>
                )
            }}
        </Transition>
    )
}

export default modal;