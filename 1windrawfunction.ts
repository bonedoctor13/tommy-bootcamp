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

// would the check win feature be a type or CONST? need the extra parenthesis (thinking NO)? what is js equivalent of "if, else if, else" ?
// const checkWin: = 
//  is "X" in board in location {([0,0], [1,0], [2,0]) || ([0,1], [1,1], [2,1]) || ([0,2], [1,2], [2,2]) || ([0,0], [0,1], [0,2]) || ([1,0], [1,1], [1,2]) || ([2,0], [2,1], [2,2]) || ([0,0], [1,1], [2,2]) || ([2,0], [1,1], [0,2])}
//      console.log('X Wins!)
//  else if "O" in board in location {([0,0], [1,0], [2,0]) || ([0,1], [1,1], [2,1]) || ([0,2], [1,2], [2,2]) || ([0,0], [0,1], [0,2]) || ([1,0], [1,1], [1,2]) || ([2,0], [2,1], [2,2]) || ([0,0], [1,1], [2,2]) || ([2,0], [1,1], [0,2])}
//      console.log('O Wins!)
//  else makeMove

// const checkDraw: = 
//  is there a "_" in location {[0,0], [1,0], [2,0], [0,1], [1,1], [2,1], [0,2], [1,2], [2,2]}
//      makeMove
//      else
//      console.log('Draw Game!')