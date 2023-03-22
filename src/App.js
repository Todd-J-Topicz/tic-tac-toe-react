import { useState } from 'react';

//This creates a component called "Square", a child component of "Board" component
//Takes in arguements "value" and function onSqaureClick
function Square({value, onSquareClick}) {
  //Returns a single button className "square" which also has an "onClick" listener set to "onSquareClick"
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

//This creates a component called "Board". This is the PARENT COMPONENT
export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  //Declare a state variable called "squares" which can be munipulated by function "setSquares"
  //Example of "Lifting State" or creating a state in the parent component that can be passed down and shared amongst children componenets.
  //"squares" defaults to an array of 9 nulls corresponding to the 9 squares.
  const [squares, setSquares] = useState(Array(9).fill(null));

  //During a click event on a single square, check to see if the "value" of square at [i] is not null.
  //If null, continue through handleClick, if not null, RETURN.
  //If null, "xIsNext" state true, set nextSquares[i] to "X", otherwise set it to "O".
  function handleClick(i){
    if (squares[i]){ //true if X or O exists, but untrue if "null"
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O"
    }
    //?????????
    setSquares(nextSquares);
    //Change the STATE of "xIsNext" to its opposite of current boolean state.
    setXIsNext(!xIsNext);
  }
  return (
    <>
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

