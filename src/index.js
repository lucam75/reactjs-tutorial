import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button style={{color: props.color}}
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
  
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square key={i}
          value={this.props.squares[i]} 
          onClick={() => this.props.onClick(i)}
          color={this.props.colors[i]}
      />
    );
  }
  
  render() {
    let items = [], table = [];
    let index = 0;
    for (let row = 0; row < 3; row++) {
      for (let column = 0; column < 3; column++) {
        items.push(this.renderSquare(index++))
      }
      table.push(<div key={"row-"+row} className="board-row">{items}</div>);
      items = [];
    }

    return (
      <div>
        {table}
      </div>
    );
  }
}
  
class Game extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          positions: Array(9).fill(null),
          colors: Array(9).fill('black')
        }],
        stepNumber: 0,
        xIsNext: true,
        ascendingOrder: true
      };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const colors = current.colors.slice();
    const positions = current.positions.slice();
    const winner = calculateWinner(squares);

    if (winner || squares[i]) {
      return;
    }

    if(winner){
      colors[winner[0]] = 'red';
      colors[winner[1]] = 'red';
      colors[winner[2]] = 'red';
    }

    squares[i] = this.state.xIsNext ? 'X':'O';
    positions[history.length - 1] = i;

    this.setState({
        history: history.concat([{
          squares: squares,
          positions: positions,
          colors: colors
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  toggleOrder() {
    this.setState({
      ascendingOrder: !this.state.ascendingOrder
    });
  }
  render() {
    let history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    //let colors = current.colors.slice();

    if(winner){
      current.colors[winner[0]] = 'red';
      current.colors[winner[1]] = 'red';
      current.colors[winner[2]] = 'red';
    }
      
    const moves = history.map((step, move) => {
      const isBold = (step===current)? true : false;
      const desc = move ?
        'Go to move #' + move + '('+getCoordinatesFromSquare(step.positions[move - 1])+')' :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{(isBold)? <strong>{desc}</strong> : desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if(history.length == 10) {
      status = 'Match draw';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    if (!this.state.ascendingOrder) {
      moves.sort((a,b) => { return b.key - a.key; });
    }
      
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            colors={current.colors}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => this.toggleOrder()}>Change order</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [a, b, c];
      }
    }
    return null;
  }

  function getCoordinatesFromSquare(square){
    const coord = {
      0: '1, 1',
      1: '1, 2',
      2: '1, 3',
      3: '2, 1',
      4: '2, 2',
      5: '2, 3',
      6: '3, 1',
      7: '3, 2',
      8: '3, 3'
    };

    return coord[square];
  }