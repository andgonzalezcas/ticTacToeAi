import { useEffect, useState } from "react";
import Square from "./Square";

type playerIconsProps = ('❤️' | '😒')

const Board = () => {
  const playerIcons: playerIconsProps[] = ['❤️', '😒']
  const [squares, setSquares] = useState<any>()
  const [moveSymbol, setMoveSymbol] = useState<playerIconsProps>()
  const [finishMessage, setFinishMessage] = useState<string>('')

  useEffect(() => {
    setSquares(Array(9).fill(null))
    setMoveSymbol(playerIcons[Math.round(Math.random())])
  }, [])

  const handleClick = (i: number) => {
    if (squares[i] || finishMessage) return
    const auxSquares = [...squares]
    auxSquares[i] = moveSymbol
    moveSymbol === playerIcons[0]
      ? setMoveSymbol(playerIcons[1])
      : setMoveSymbol(playerIcons[0])
    setSquares(auxSquares)
    handleGameOver(auxSquares)
  }

  const handleGameOver = (matrix: any) => {
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
      if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
        setFinishMessage(`Gano: ${matrix[a]}`)
      }
    }
    return null;
  }

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} handleClick={() => handleClick(i)} />;
  }

  const status = `Next player: ${moveSymbol}`;

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="m-3">{status}</p>
      <div className="grid grid-cols-3 gap-1">
        {squares && squares.map((square: any, index: number) => {
          return (<div key={index}>{renderSquare(index)}</div>)
        })}
      </div>
      {finishMessage && <p>{finishMessage}</p>}
    </div>
  );


}

export default Board