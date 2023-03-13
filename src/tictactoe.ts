type Player = "X" | "O"
type Square = Player | "_"
type Line = Array<Square>
type Row = Line
type Column = Line
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

const throwNotImplemented = () => { throw new Error("Not Implemented")  }
const rows = (b:Board):Array<Row> => b
const columns = (b:Board):Array<Column> => throwNotImplemented()
const diagonals = (b:Board):Array<Line> => throwNotImplemented()
// const winLines = (b:Board):Array<Line> => diagonals(b).concat(columns(b)).concat(rows(b))
const winLines = (b:Board):Array<Line> => [...diagonals(b), ...columns(b), ...rows(b)]

type Predicate<T> = (t:T) => boolean

const isX:Predicate<Square> = square => square == x 
const isO:Predicate<Square> = square => square == o

type Reducer<T, S> = (accumulatedValue:S, currentValue:T) => S
type Reduce = <T, S>(items:Array<T>, initialValue:S, reducer:Reducer<T, S>) => S


const isOdd = (n:number) => n%2 != 0

const reduce:Reduce = (items, initialValue, reducer) => {
    if(items.length == 0) return initialValue;
    else {
        const currentValue = items[0] //first call 1, second call 2; third call 3; fourth call 4
        const remainingArray = items.slice(1) //first call 2,3,4; second call 3,4; third call [4]; fourth call [] 
        return reducer(
            reduce(remainingArray, initialValue, reducer), 
            currentValue
        )
        //first, wind up
        // first call - [1,2,3,4] comes in; reducer(_____, 1) goes out
        // second call - [2,3,4] comes in; reducer (_____, 2) goes out
        // third call - [3,4] comes in; reducer (_____, 3) goes out
        // fourth call [4], reducer (_____, 4) goes out
        // fifth call - empty list, return initialValue (0)

        //then, unwind after hitting the special condition of empty list
        // fifth call - empty list, return initialValue (0)
        // fourth call [4], reducer (0, 4) -> returns 4
        // third call - [3,4] comes in; reducer (4, 3) goes out
        // second call - [2,3,4] comes in; reducer (7, 2) goes out
        // first call - [1,2,3,4] comes in; reducer(9, 1) goes out
    }
}


        //first, wind up
        // first call - [1,2,3,4] comes in; reducer(_____, 1) goes out
        // second call - [2,3,4] comes in; reducer (_____, 2) goes out
        // third call - [3,4] comes in; reducer (_____, 3) goes out
        // fourth call [4], reducer (_____, 4) goes out
        // fifth call - empty list, return initialValue false

        //then, unwind after hitting the special condition of empty list
        // fifth call - empty list, return initialValue false
        // fourth call [4], reducer (false, 4) -> returns false
        // third call - [3,4] comes in; reducer (false, 3) goes out
        // second call - [2,3,4] comes in; reducer (true, 2) goes out
        // first call - [1,2,3,4] comes in; reducer(true, 1) goes out


const exampleNums = [1,2,3,4]
const sum = (nums:Array<number>) => reduce(nums, 0, (acc, current) => acc + current)
const product = (nums:Array<number>) => reduce(nums, 1, (acc, current) => acc * current)

const sumOfNums = sum(exampleNums)
const productOfNums = product(exampleNums)

console.log({sumOfNums, productOfNums})

type ArrayPredicate = <T>(items:Array<T>, predicate:Predicate<T>) => boolean
type Any = ArrayPredicate
const any:Any = (items, predicate) => reduce(
    items, 
    false, 
    (acc, current) => acc || predicate(current) 
        //FIRST REDUCER CALL false, 4 -> false || predicate(4) -> false || isOdd(4) -> false
        //2 false || predicate(3) -> false || true -> true
        //3 true || preiate(2) -> skip predicate(2) because we already know overall is true due to left side being true -> return true
        //4 true || 

)

type All = ArrayPredicate

const all:All = (items, predicate) => reduce(
    items,
    true,
    (acc, current) => acc && predicate(current)
)

const hasAtLeast1OddItem = any(exampleNums, isOdd)
const allItemsOdd = all(exampleNums, isOdd)
const odds = [1,2,3,4].filter(isOdd)

const hasPlayerWon = (playerPredicate:Predicate<Square>) => 
    (b:Board) => any(rows(b), row => all(row, playerPredicate))

const hasXWon = (b:Board) => any(rows(b), row => all(row, isX))
const hasXWon2 = hasPlayerWon(isX)

const hasOWon = (b:Board) => any(rows(b), row => all(row, isO))
const hasOWon2 = hasPlayerWon(isO)



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