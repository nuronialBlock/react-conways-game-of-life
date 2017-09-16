import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  Panel
} from 'react-bootstrap';

const GenerateBoard = (props) => {
  const board = props.board;
  const column = (x) => {
    let y = -1;
    const ara = Array(props.m).fill(0).map(() => {
      y = y + 1;

      let colorType="default";
      if(board[x][y]) {
        colorType="primary";
      }

      return (
        <Button
          bsStyle={ colorType }
          onClick={ props.onBtnClick }
          data-i={ x.toString() }
          data-j={ y.toString() }
        >
        </Button>
      );
    });
    ara.push(<br/>);
    return ara;
  }

  const row = () => {
    let x = 0;
    const ara = Array(props.n).fill(0).map(() => {
      const val = column(x);
      x = x + 1;
      return val;
    });
    return ara;
  }

  const grid = row();

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

  async componentWillMount() {
    let initValue = () => Array(20).fill(0).map(() =>
      Array(30).fill(false));
    let board = initValue();
    await this.setState({ board });
  }

  toggleColor(e) {
    let i = parseInt(e.target.getAttribute("data-i"));
    let j = parseInt(e.target.getAttribute("data-j"));

    let board = this.state.board;
    board[i][j] = !this.state.board[i][j];
    console.log(board[i][j]);
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
