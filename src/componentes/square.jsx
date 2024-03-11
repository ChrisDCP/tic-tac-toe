export const Square = ({children, isSelected,updateBoard, index })=>
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