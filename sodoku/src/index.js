import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// class Square extends React.Component {

//     render() {
//       return (
//         <button 
//             className="square" 
//             onClick={() => this.props.onClick()}
//         >
//           {this.props.value}
//         </button>
//       );
//     }
//   }
  function Square(props) {
    let css = "square " + props.selected;
    
    return (
      <button className={css} onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  class Board extends React.Component {

    renderSquare(i) {
      return <Square 
        value={this.props.squares[i]}
        selected={i === 0 ? "selected" : ""}
        onClick={() => this.props.onClick(i)} 
      />;
    }

    renderRow(startIndex) {
        return <div>
                {this.squares(startIndex).map(i => this.renderSquare(i))}
            </div>
    }

    render() {
      return (
        <div>
            {this.rows().map( r => this.renderRow(r))}
        </div>
        //     <div className="board-row">

        //         {this.renderSquare(0)}
        //         {this.renderSquare(1)}
        //         {this.renderSquare(2)}
        //         {this.renderSquare(3)}
        //         {this.renderSquare(4)}
        //         {this.renderSquare(5)}
        //         {this.renderSquare(6)}
        //         {this.renderSquare(7)}
        //         {this.renderSquare(8)}
        //     </div>
        //     <div className="board-row">
        //         {this.renderSquare(10)}
        //         {this.renderSquare(11)}
        //         {this.renderSquare(12)}
        //     </div>
        //     <div className="board-row">
        //         {this.renderSquare(20)}
        //         {this.renderSquare(7)}
        //         {this.renderSquare(8)}
        //     </div>
        // </div>
      );
    }

    rows() {
        let result = [];
        for (var i = 0; i < 81; i += 9) {
            result.push(i);
        }
        return result;
    }

    squares(startIndex) {
        let result = [];
        for (var i = 0; i < 9; i++) {
            result.push(startIndex + i);
        }
        return result;
    }
  }
  
  class NewGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = { clickHandler: props.onNewGame }
    }  

    render() {
        return <button onClick={this.state.clickHandler}>New Game</button>;
    }
  }

  class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(81).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i) {
        
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => this.handleClick(i)}
                />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <NewGame onNewGame={() => this.newGame()}/>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
    
    newGame() {
        this.setState({
            stepNumber: 0,
            xIsNext: true,
        });
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  

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