  import { WinnerCombos } from "../constants"
  //checkeamos si hay una posicion ganadora
  export const checkWinner =(boardToCheck) => {
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

  
  export const checkEndGame=(newBoard)=>{
    return newBoard.every((square)=>square != null)
  }