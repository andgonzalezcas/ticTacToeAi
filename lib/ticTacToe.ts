type playerIconsProps = ('❤️' | '😒')

const playerIcons: playerIconsProps[] = ['❤️', '😒']

export class TicTacToe {
  squares: any[]
  moveSymbol: playerIconsProps

  constructor(moveSymbol?: playerIconsProps) {
    this.squares = Array(9).fill(null)
    this.moveSymbol = moveSymbol ? moveSymbol : playerIcons[Math.round(Math.random())]
  }

  // getters
  getSquares() { return this.squares }
  getMoveSymbol() { return this.moveSymbol }

  // handlers
  handleMove(i: number) {
    this.squares[i] = this.moveSymbol
    this.moveSymbol === playerIcons[0]
      ? this.moveSymbol = playerIcons[1]
      : this.moveSymbol = playerIcons[0]
  }

  handleReset() {
    this.squares = Array(9).fill(null)
    this.moveSymbol = playerIcons[Math.round(Math.random())]
  }

  handleGameOver() {
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
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        return `Gano: ${this.squares[a]}`
      }
    }

    if (this.isFull()) return 'Empate'

    return '';
  }

  isFull() {
    let returnable = true

    this.squares.map(square => {
      if (typeof (square) !== 'string') {
        returnable = false
      }
    })
    return returnable
  }
}
