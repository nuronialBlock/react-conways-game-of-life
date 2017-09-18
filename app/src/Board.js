import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  Panel
} from 'react-bootstrap';

const GameBoard = (props) => {
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
  let style, btnInfo;
  style = "success";
  btnInfo = "Play";
  return (
    <div>
      <Panel header='The GAME is on'>
        <Button
          onClick={ props.onPlayBtn }
          bsStyle={ style }
        >
          { btnInfo }
        </Button>
        <hr/>
        <br/>
        { grid }
      </Panel>
    </div>
  );
}

const checkAliveNeighbor = (board, ii, jj, n, m) => {
  let x = [-1, -1, -1, 0, 0, 1, 1, 1];
  let y = [-1, 0, 1, -1, 1, -1, 0, 1];
  let count = 0;
  for (var i = 0; i < x.length; i++) {
    let xx = x[i] + ii;
    let yy = y[i] + jj;
    if((xx >= 0 && xx < n) && (yy >= 0 && yy < m)) {
      if(board[xx][yy]) {
        count = count + 1;
      }
    }
  }
  return count;
}
const algorithm = (curBoard, n, m) => {
  let i = 0;
  let nextBoard = curBoard.map(board => {
    i = i + 1;
    let j = 0;
    return board.map(board => {
      j = j + 1;
      let alive = checkAliveNeighbor(curBoard, i-1, j-1, n, m);
      if(board) {
        if(alive < 2) return false;
        if(alive > 3) return false;
        return true;
      } else {
        alive === 3 ? true : false;
      }
    })
  })
  return nextBoard;
}

const GamePlay = (props) => {
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
  let style, btnInfo;
  style = "danger";
  btnInfo = "Cancel";
  return (
    <div>
      <Panel header='The GAME is on'>
        <Button
          onClick={ props.onPlayBtn }
          bsStyle={ style }
        >
          { btnInfo }
        </Button>
        <hr/>
        <br/>
        { grid }
      </Panel>
    </div>
  );
}

const GenerateBoard = (props) => {
  if(props.playBtn) {
    return (
      <GameBoard
        n={ props.n }
        m={ props.m }
        board={ props.board }
        playBtn={ props.playBtn }
        onPlayBtn={ props.onPlayBtn }
        onBtnClick={ props.onBtnClick }
      />
    );
  } else {
    return(
      <GamePlay
        n={ props.n }
        m={ props.m }
        board={ props.board }
        playBtn={ props.playBtn }
        onPlayBtn={ props.onPlayBtn }
        onBtnClick={ props.onBtnClick }
      />
    );
  }
}

export default class Board extends Component {
  constructor(props){
    super(props);

    this.state = {
      intervalID: "",
      board: [],
      playBtn: true
    };
    this.updateGrid = this.updateGrid.bind(this);
    this.togglePlayBtn = this.togglePlayBtn.bind(this);
    this.toggleColor = this.toggleColor.bind(this);
  }

  componentWillMount() {
    let initValue = () => Array(20).fill(0).map(() =>
      Array(30).fill(false));
    let board = initValue();
    this.setState({ board });
  }

  toggleColor(e) {
    let i = parseInt(e.target.getAttribute("data-i"));
    let j = parseInt(e.target.getAttribute("data-j"));

    let board = this.state.board;
    board[i][j] = !this.state.board[i][j];
    this.setState({
      board
    });
  }

  updateGrid(){
    let board = algorithm(this.state.board, 20, 30);
    this.setState({ board });
  }

  togglePlayBtn() {
    if(this.state.playBtn) {
      let intervalID = setInterval(this.updateGrid, 100);
      this.setState({ intervalID });
    } else {
      clearInterval(this.state.intervalID);
    }
    this.setState({
      playBtn : !this.state.playBtn
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col lg={2}></Col>
          <Col lg={9}>
            <GenerateBoard
              n={20}
              m={30}
              board={ this.state.board }
              playBtn={ this.state.playBtn }
              onPlayBtn={ this.togglePlayBtn }
              onBtnClick={ this.toggleColor }
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
