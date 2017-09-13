import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';

import Board from './Board';

const AppBar = (props) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          { props.barName }
        </Navbar.Brand>
      </Navbar.Header>
    </Navbar>
  );
}

export default class App extends Component {
  render() {
    return (
      <div>
        <AppBar barName={'Game of Life'} />
        <Board />
      </div>
    );
  }
}
