const calculateWinner = (squares) => {
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

const getCoordinatesFromSquare = (square) =>{
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

export {calculateWinner, getCoordinatesFromSquare}