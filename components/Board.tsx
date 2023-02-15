import { useEffect, useState } from "react";
import Square from "./Square";

import { TicTacToe } from "@/lib/ticTacToe";
type playerIconsProps = ('❤️' | '😒')

const Board = () => {
  const playerIcons: playerIconsProps[] = ['❤️', '😒']
  const [squares, setSquares] = useState<any>()
  const [moveSymbol, setMoveSymbol] = useState<playerIconsProps>()
  const [finishMessage, setFinishMessage] = useState<string>('')
  const [game, setGame] = useState<TicTacToe>()

  useEffect(() => {
    setSquares(Array(9).fill(null))
    setMoveSymbol(playerIcons[Math.round(Math.random())])
    setGame(new TicTacToe())
  }, [])

  const handleClick = (i: number) => {
    if (squares[i] || finishMessage || !game) return

    // do move on game
    game.handleMove(i, moveSymbol)
    setSquares(game.getSquares())

    const Message = game.handleGameOver()
    setFinishMessage(Message)

    moveSymbol === playerIcons[0]
      ? setMoveSymbol(playerIcons[1])
      : setMoveSymbol(playerIcons[0])
  }

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} handleClick={() => handleClick(i)} />;
  }
  
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="m-3">{`Next player: ${moveSymbol}`}</p>
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