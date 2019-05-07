import React from 'react';

const Square = (props) => 
  (
    <button style={{color: props.color}}
      className="square" 
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );

export default class Board extends React.Component {
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