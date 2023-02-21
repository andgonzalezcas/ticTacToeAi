import { useEffect, useState } from "react";
import Square from "./Square";

import { TicTacToe } from "@/lib/ticTacToe";
import { TicTacToeAi } from "@/lib/ticTacToeAi";

const Board = () => {
  const [squares, setSquares] = useState<any>()
  const [moveSymbol, setMoveSymbol] = useState<string>()
  const [finishMessage, setFinishMessage] = useState<string>()

  const [game, setGame] = useState<TicTacToe>()
  const [aiAgent, setAiAgent] = useState<TicTacToeAi>()
  const [aiTurn, setAiTurn] = useState<boolean>(false)

  useEffect(() => {
    setSquares(Array(9).fill(null))
    setGame(new TicTacToe())
    setAiAgent(new TicTacToeAi())
  }, [])

  useEffect(() => {
    if (!game) return
    setMoveSymbol(game.getMoveSymbol())
  }, [game])

  useEffect(() => {
    if (!aiAgent || !game || !aiTurn || finishMessage) return
    const aiMove = aiAgent.machineMove(game.getSquares())
    game.handleMove(aiMove)

    setSquares(game.getSquares())
    setMoveSymbol(game.getMoveSymbol())
    setFinishMessage(game.handleGameOver())

    setAiTurn(false)
  }, [aiTurn])

  const handleClick = (i: number) => {
    if (squares[i] || finishMessage || !game) return

    // do move on game
    game.handleMove(i)
    setSquares(game.getSquares())
    setMoveSymbol(game.getMoveSymbol())
    setFinishMessage(game.handleGameOver())

    setAiTurn(true)
  }

  const handleReset = () => {
    if (!game) return
    game?.handleReset()
    setSquares(game.getSquares())
    setMoveSymbol(game.getMoveSymbol())
    setFinishMessage('')
  }

  const renderSquare = (i: number) => {
    return <Square value={squares[i]} handleClick={() => handleClick(i)} />;
  }

  return (
    <div className="w-fit h-fit flex flex-col justify-center items-center p-6 glass-morphism">
      <p className="m-3">{`Next player: ${moveSymbol}`}</p>
      <div className="grid grid-cols-3 gap-1">
        {squares && squares.map((square: any, index: number) => {
          return (<div key={index}>{renderSquare(index)}</div>)
        })}
      </div>
      <p className="h-6 p-4">{finishMessage}</p>
      <div className="flex justify-center items-center w-20">
        <button
          className="mt-5 border-b-2 p-2 hover:w-full transition duration-700 ease-in-out border-gray-600"
          onClick={() => { handleReset() }}
        >Reset</button>
      </div>
    </div>
  );
}

export default Board