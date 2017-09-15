import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  Panel
} from 'react-bootstrap';

const GenerateBoard = (props) => {
  const column = (st, board) => {
    const ara = Array(props.m).fill(0).map(() => {
      st = st + 1;
      let i = parseInt(st / 30);
      let j = st % 30;
      let colorType="default";
      if(board[i][j]) {
        colorType="primary";
      }
      return (
        <Button
          bsStyle={ colorType }
          onClick={ props.onBtnClick }
          id={ (st - 1).toString() }
        >
        </Button>
      );
    });
    ara.push(<br/>);
    return ara;
  }

  const row = (board) => {
    let st = 0;
    const ara = Array(props.n).fill(0).map(() => {
      const val = column(st, board);
      st = st + props.m;
      return val;
    });
    return ara;
  }

  const grid = row(props.board);

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
      board: [],
    };
    this.toggleColor = this.toggleColor.bind(this);
  }

  componentWillMount() {
    let initValue = () => Array(20).fill(0).map(() =>
      Array(30).fill(false));
    let board = initValue();
    console.log(board);
    this.setState({ board });
    // console.log("here ::::" , this.state.board);
  }

  toggleColor(e) {
    let id = parseInt(e.target.id);
    let i = parseInt(id / 30);
    let j = id % 30;

    let board = this.state.board;
    board[i][j] = !this.state.board[i][j];
    this.setState({
      board
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={2}></Col>
          <Col lg={10}>
            <GenerateBoard
              n={20}
              m={30}
              board={ this.state.board }
              onBtnClick={ this.toggleColor }
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
