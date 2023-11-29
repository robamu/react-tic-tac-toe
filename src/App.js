import { useState } from 'react';

function Square({ value, squareClickedCb }) {
  return <button className="square" onClick={squareClickedCb}>{value}</button>;
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i) {
    const nextSquares = squares.slice();
    if (squares[i]) {
      return;
    }
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} squareClickedCb={() => handleClick(0)} />
        <Square value={squares[1]} squareClickedCb={() => handleClick(1)} />
        <Square value={squares[2]} squareClickedCb={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} squareClickedCb={() => handleClick(3)} />
        <Square value={squares[4]} squareClickedCb={() => handleClick(4)} />
        <Square value={squares[5]} squareClickedCb={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} squareClickedCb={() => handleClick(6)} />
        <Square value={squares[7]} squareClickedCb={() => handleClick(7)} />
        <Square value={squares[8]} squareClickedCb={() => handleClick(8)} />
      </div>
    </>
  );
}

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
      return squares[a];
    }
  }
  return null;
}
