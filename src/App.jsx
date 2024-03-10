//minuto 26 del tutorial

import { useState } from 'react'
import './App.css'

//declaracion de turnos
const TURNS = {
  x : 'x',
  o: 'o'
}


const Square = ({children, isSelected,updateBoard, index })=>
{
  //
  const className = `square ${isSelected ? 'is-selected' : ''}`
  
  //cuando se da clic se llama a esta funcion que ejecuta el update board
  const handleClick=() =>{
    updateBoard(index)
  }
  //permite dar clic en el div del cuadro
  return(
    <div  onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WinnerCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  //cambia el turno
  const[turn, setTurn] = useState(TURNS.x)
  //null significa sin ganador, false un empate
  const [winner, setwinner] = useState(null)

  //checkeamos si hay una posicion ganadora
  const checkWinner =(boardToCheck) => {
    for(const combo of  WinnerCombos){
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){return boardToCheck[a]}
    }
    return null
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setwinner(null)
  }

  const checkEndGame=(newBoard)=>{
    return newBoard.every((square)=>square != null)
  }

  const updateBoard =(index) =>{
    //si actualiza la posicion si ya hay un dato
    if(board[index] || winner)return
    //actualiza el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    //si el turno es x el siguiente es y y si no, es x
    const newTurn = turn ===TURNS.x? TURNS.o : TURNS.x
    setTurn(newTurn)
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      setwinner(newWinner)
    }else if (checkEndGame(newBoard)){
      setwinner(false)
    }
  }

  return (
    <main className="board">
      <h1>tic tac toe </h1>

      <section className="game">
        {
          board.map((_,index)=>{
            return(
              <Square 
                key = {index}
                index = {index}
                updateBoard={updateBoard}
                >
                  {board[index]}
                </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn=== TURNS.x} >
          {TURNS.x}
        </Square>

        <Square isSelected={turn=== TURNS.o}
          >{TURNS.o}
        </Square>
        <button onClick={resetGame} >Reset Game</button>
      </section>

      {
        winner != null && (
          <section className='winner' >
            <div className="text">
              <h2>
                {
                winner == false
                ? 'Empate'
                : 'Gano'
                }
              </h2>
                <header className="win">
                  {winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={resetGame} >Empezar de nuevo</button>
                </footer>

            </div>
          </section>
        )
      }

    </main>
  )
}

export default App
