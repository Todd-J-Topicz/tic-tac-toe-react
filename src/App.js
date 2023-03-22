/*
This is a file that has something called "components" in it. A component is like a little part of a bigger program, and it can do things on its own.
The first component is called "Square", and it makes a button that you can click on. It has a "value" which could be either an "X" or an "O", and it also has a special function that will happen when you click on the button.
The second component is called "Board", and it's the main part of the program. It has nine of those "Square" components inside of it, arranged in a grid to look like a tic-tac-toe board.
When you click on one of the "Square" buttons, the "Board" component checks to see if that button already has an "X" or an "O" on it. If it does, nothing happens. But if it doesn't have anything yet, the "Board" component will put an "X" or an "O" on it, depending on whose turn it is.
The "Board" component keeps track of whose turn it is with something called a "state variable". It starts out as "X"'s turn, and then it switches back and forth between "X" and "O" every time someone makes a move.
That's basically what this file does - it makes a tic-tac-toe game with two different components that work together to let you play the game.
*/

import { useState } from 'react';

//This creates a component called "Square", a child component of "Board" component
//Takes in arguements "value" and function onSqaureClick
function Square({value, onSquareClick}) {
  //Returns a single button className "square" which also has an "onClick" listener set to "onSquareClick"
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

//This creates a component called "Board". This is the PARENT COMPONENT
function Board({xIsNext, squares, onPlay}) {
  //During a click event on a single square, check to see if the "value" of square at [i] is not null.
  //If null, continue through handleClick, if not null, RETURN.
  //If null, "xIsNext" state true, set nextSquares[i] to "X", otherwise set it to "O".
  function handleClick(i){
    if (squares[i] || calculateWinner(squares)){ //true if X or O exists, but untrue if "null" which all squares are initially null.
      return;
    }
    //Makes a copy of the "squares" array each time function is called, updating each index value, to check in following conditional:
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "WINNER! Congratulations: " + winner;
  } else {
    status = "Player up next: " + (xIsNext ? "X's" : "O's");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length -1);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0){
      description = 'Revert board back to move #' + move;
    } else {
      description = 'Click to RESTART game';
    }
    return (
      <li key = {move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className = "game-board">
        <Board xIsNext={xIsNext} squares = {currentSquares} onPlay={handlePlay}/>
      </div>
      <div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

function calculateWinner (squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}

