import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  Panel
} from 'react-bootstrap';

const GenerateBoard = (props) => {
  const oneButton = <Button></Button>;
  const row = (fn, n) => {
    const ara = Array(n).fill(0).map(fn);
    ara.push(<br/>);
    return ara;
  }
  const grid = row(() => row(() => oneButton, props.m), props.n);

  return (
    <div>
      <Panel header='The GAME is on'>
        { grid }
      </Panel>
    </div>
  );
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
          <Col lg={10}>
            <GenerateBoard n={20} m={30} />
          </Col>
        </Row>
      </Grid>
    );
  }
}
