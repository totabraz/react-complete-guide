import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import { Transition } from "react-transition-group";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false,
      showBlock: false,
    }
  }

  showModal = () => {
    this.setState({ modalIsOpen: true })
    console.log('modalIsOpen: true', this.state.modalIsOpen);

  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
    console.log('modalIsOpen: false');

  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button onClick={() => this.setState((prevState) => ({ showBlock: !prevState.showBlock }))}>Toggle</button>
        <br />


        <Transition
          in={this.state.showBlock}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {state => <div style={{
            backgroundColor: 'red',
            height: 100,
            width: 100,
            margin: "auto",
            transition: 'opacity 1s ease-out',
            opacity: state === 'exiting' ? 0 : 1
          }}>
            <p>{state}</p>
          </div>}
        </Transition>


        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />

        {this.state.modalIsOpen ? null : null}
        {this.state.modalIsOpen ? <Backdrop show /> : null}
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
