import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalIsOpen: false
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
        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        <Backdrop />
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
