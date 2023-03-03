type Player = "X" | "O"
type Square = Player | "_"
type Row = Array<Square>
type Column = Array<Square>
type Board = Array<Row>
type GetSquare = (b:Board, x:number, y:number) => Square
type Move = {
    x:number
    y:number
}
type MakeMove = (gs:GameState, m:Move) => GameState
type SwitchPlayer = (p:Player) => Player
type GameState = {
    board: Board,
    player: Player,
    errorMessage?:string,
}

const switchPlayer:SwitchPlayer = (p) => p == "X" ? "O" : "X"
const x = "X"
const o = "O"
const _ = "_"
const initialBoard:Board = [
    [_,_,_],
    [_,_,_],
    [_,_,_],
]

const getSquare: GetSquare = (b,x,y) => b[y][x]
const initialState: GameState = {
    board: initialBoard,
    player: x
}

const makeMove: MakeMove = (gs, move) => {
    if(getSquare(gs.board, move.x, move.y) != _) {
        return {
            board: gs.board,
            player: gs.player,
            errorMessage: "Invalid move"
        }
    } else {
        const mapSquare = (square:Square, squareIndex:number):Square => squareIndex == move.x ? gs.player : square
        const mapRow = (row:Row, rowIndex:number):Row => rowIndex == move.y ? row.map(mapSquare) : row
        return {
            board: gs.board.map(mapRow),
            player: switchPlayer(gs.player),
            errorMessage: undefined,
        }
    }
        
}

// View Logic Below

const show = (gameState:GameState) => {
    if(gameState.errorMessage) console.log(`ERROR! ${gameState.errorMessage}`)
    console.log(gameState.board.join('\n'))
    console.log(`Current Player: ${gameState.player}`)
    console.log("")
} 

show(initialState)

const move:Move = { x: 1, y: 1 }
const state2 = makeMove(initialState, move)
show(state2)

const move2:Move = { x: 2, y: 0 }
const state3 = makeMove(state2, move)
show(state3)