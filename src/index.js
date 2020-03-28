import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'


function Square(props) {

    return (
      <button
        className="square"
        onClick={() => props.onClick()}
        disabled={props.disabled}>
          {props.value}
      </button>
    );
}

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // Se maneja con un bool, respecto al jugador de X, los turnos
      // El juego inicia con el jugador X
      xIsNext: true,
      ended: false,
      status: 'Next turn is: X',
    }
  }

  tie(squares){
    for(let square of squares) {
      if(square === null) {
        return false;
      }
    }
    return true;
  }

  calcWinner(squares) {
    // Lista de las lineas que determinan como ganador
    // si un jugador las tiene llenas en dado momento.
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

    for(let line of lines) {
      const [a,b,c] = line;
      if(squares[a] && squares[a]===squares[b] && squares[b]===squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // Uso de arrow funct para heredar ambiente del objeto (this apunta al objeto)
  handleClick = (i) => {
    const squares = this.state.squares.slice();
    if(squares[i] === null) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState(
        {
          squares,
          xIsNext: !this.state.xIsNext,
          status: ('Next turn is: ' + (!this.state.xIsNext ? 'X' : 'O')),
        }
      );
      if(this.calcWinner(squares)) {
        this.setState(
          {
            ended: true,
            status: (squares[i] + ' wins the game!'),
          });
      }
      if(this.tie(squares)) {
        this.setState(
          {
            ended: true,
            status: 'Game ends in a tie',
          });
      }
    } else {
      alert('Square already played.')
    }
  };

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        disabled={this.state.ended}
      />
    );
  }

  render() {

    return (
      <div>
        <div className="status">{this.state.status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
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