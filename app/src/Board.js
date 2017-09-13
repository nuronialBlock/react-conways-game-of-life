import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  Panel
} from 'react-bootstrap';

const row = (fn, n) => Array(n).fill(false).map(fn);
const genrateBoard = (n, m) => {
  row(() => row(() => {
    <Button bsClass="xs"></Button>
  },m), n);
}

export default class Board extends Component {
  constructor(props){
    super(props);

    this.state = {
      board: []
    };
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={2}></Col>
          <Col lg={8}>
            <Panel header='The GAME is on'>
              { genrateBoard(10, 20) }
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}
