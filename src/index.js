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

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        disabled={this.props.ended}
      />
    );
  }

  render() {
    return (
      <div>
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
  
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
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

  jumpTo(step){
    //TODO
  }

  // Uso de arrow funct para heredar ambiente del objeto (this apunta al objeto)
  handleClick = (i) => {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if(squares[i] === null) {
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState(
        {
          history: history.concat([{
            squares: squares,
          }]),
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
      else if(this.tie(squares)) {
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
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={(i)=>this.handleClick(i)}
            ended={this.state.ended}
          />
        </div>
        <div className="game-info">
          <div className="status">{this.state.status}</div>
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