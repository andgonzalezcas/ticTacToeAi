type playerIconsProps = ('❤️' | '😒')

export class TicTacToeAi {
  playerIcon: playerIconsProps = '❤️'

  machineMove(board: playerIconsProps[]) {
    let NoPlayer0Moves = 0
    let NoPlayer1Moves = 0

    board.map((square) => {
      if (square === '❤️') {
        NoPlayer0Moves = NoPlayer0Moves + 1
      } else if (square === '😒') {
        NoPlayer1Moves = NoPlayer1Moves + 1
      }
    })

    this.playerIcon = NoPlayer0Moves < NoPlayer1Moves ? '❤️' : '😒'

    const move = this.minimax(board, NoPlayer0Moves < NoPlayer1Moves ? 0 : 1)

    return move.position ? move.position : 0
  }

  minimax(board: playerIconsProps[], player: 0 | 1) {
    const boardResult = this.handleGameOver(board)

    if (boardResult === 'Empate') {
      return { position: null, score: 0 }
    } else if (boardResult === '❤️') {
      return { position: null, score: (this.numberOfWhiteSpaces(board) + 1) }
    } else if (boardResult === '😒') {
      return { position: null, score: -(this.numberOfWhiteSpaces(board) + 1) }
    }

    let best: { position: number | null, score: number }
    if (player === 0) {
      best = { position: null, score: Math.max() }
    } else {
      best = { position: null, score: Math.min() }
    }

    board.map((square, index) => {
      const boardCopy = [...board]
      if (square === null) {
        boardCopy[index] = player === 0 ? '❤️' : '😒'
        let result: { position: number | null, score: number } = this.minimax(boardCopy, player === 0 ? 1 : 0)

        result['position'] = index

        if (player === 0) {
          result['score'] > best['score'] ? best = result : 0
        } else {
          result['score'] < best['score'] ? best = result : 0
        }
      }
    })

    return best
  }

  numberOfWhiteSpaces(board: playerIconsProps[]) {
    let counter = 0

    board.map(square => {
      if (square === null) {
        counter = counter + 1
      }
    })

    return counter
  }

  handleGameOver(board: playerIconsProps[]) {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]
      }
    }

    if (this.numberOfWhiteSpaces(board) === 0) return 'Empate'

    return '';
  }
}