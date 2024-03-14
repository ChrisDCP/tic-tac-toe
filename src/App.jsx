//minuto 1:10:30 del tutorial

import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Square } from './componentes/square.jsx'
import { TURNS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './componentes/winnerModal.jsx'

function App() {
  const [board, setBoard] = useState(()=> {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage? JSON.parse(boardFromStorage):Array(9).fill(null)
  })
  //cambia el turno
  const[turn, setTurn] = useState(()=>{
    const TurnFromStorage = window.localStorage.getItem('turn')
    return TurnFromStorage?? TURNS.x
   })
  //null significa sin ganador, false un empate
  const [winner, setwinner] = useState(null)

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setwinner(null)

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
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
    //guardar partida
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn)
    //revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
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

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
