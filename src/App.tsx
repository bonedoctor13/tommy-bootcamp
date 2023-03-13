import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './tictactoe'
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';
import { initialState, jsxElementForGameState, state3 } from './tictactoe';

function App() {
  const [gameState, setGameState] = useState(initialState)
  const gameJSXElement = jsxElementForGameState(gameState, setGameState)
  return (
    <div className="App">
      <header className="App-body">
        <th>Welcome to Tic Tac Toe!</th>
        <br></br>
        { gameJSXElement }
      </header>
    </div>
  );
}

export default App;

// td in tr, function that imports initial game board, then exports move back to program to re-export new gameboard to WritableStreamDefaultWriter, div to make Player X, Player O, and error message.

{{/* <table>
<tr>_ | _ | _ </tr>
<tr>_ | _ | _ </tr>
<tr>_ | _ | _ </tr>
</table> */}}

/* under 1st div
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>Johnny</p>
</header> */