import { MouseEventHandler, useState } from "react";

interface SquareProps {
  value: string;
  squareClickedCb: MouseEventHandler;
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: Array<number>[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setCurrentMove(nextHistory.length - 1);
    setHistory([...history, nextSquares]);
  }
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description;
    if (move === 0) {
      description = "Go to game start";
    } else if (move < history.length - 1) {
      description = "Go to move #" + move;
    } else {
      description = "You are at move #" + move;
      return <li key={move}>{description}</li>;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

interface BoardProps {
  xIsNext: boolean;
  squares: string[];
  onPlay: any;
}

export function Board({ xIsNext, squares, onPlay }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  let board = [];
  for (let row = 0; row < 3; row++) {
    let squaresForRow = [];
    for (let col = 0; col < 3; col++) {
      const squareIndex = row * 3 + col;
      squaresForRow.push(
        <Square
          key={squareIndex}
          value={squares[squareIndex]}
          squareClickedCb={() => handleClick(squareIndex)}
        />,
      );
    }
    board.push(
      <div key={row} className="board-row">
        {squaresForRow}
      </div>,
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">{board}</div>
    </>
  );
}

function Square({ value, squareClickedCb }: SquareProps) {
  return (
    <button className="square" onClick={squareClickedCb}>
      {value}
    </button>
  );
}

function calculateWinner(squares: string[]) {
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
