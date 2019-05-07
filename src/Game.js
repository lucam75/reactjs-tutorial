import React from 'react';
import Board from './Board';
import {calculateWinner, getCoordinatesFromSquare} from './utils';

//const winnerColor = 'green';

export default class Game extends React.Component {

    state = {
        history: [{
          squares: Array(9).fill(null),
          positions: Array(9).fill(null),
          colors: Array(9).fill('black')
        }],
        stepNumber: 0,
        xIsNext: true,
        ascendingOrder: true
    };

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
  
      if(winner){
        current.colors[winner[0]] = this.props.winnerColor;
        current.colors[winner[1]] = this.props.winnerColor;
        current.colors[winner[2]] = this.props.winnerColor;
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
      } else if(history.length === 10) {
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