type JSXElement = JSX.Element
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
export const initialState: GameState = {
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
const winLines = (b:Board):Array<Line> => [...diagonals(b), ...columns(b), ...rows(b)]

type Predicate<T> = (t:T) => boolean

const isX:Predicate<Square> = square => square == x 
const isO:Predicate<Square> = square => square == o

type Reducer<T, S> = (accumulatedValue:S, currentValue:T) => S
type Reduce = <T, S>(items:Array<T>, initialValue:S, reducer:Reducer<T, S>) => S

const reduce:Reduce =  (items, initialValue, reducer) => items.reduce(reducer, initialValue)

type ArrayPredicate = <T>(items:Array<T>, predicate:Predicate<T>) => boolean
type Any = ArrayPredicate
const any:Any = (items, predicate) => items.some(predicate)

type All = ArrayPredicate
const all:All = (items, predicate) => items.every(predicate)

const hasPlayerWon = (playerPredicate:Predicate<Square>) => 
    (b:Board) => any(winLines(b), line => all(line, playerPredicate))

const hasXWon = hasPlayerWon(isX)
const hasOWon = hasPlayerWon(isO)


// View Logic Below

const logGamestate = (gameState:GameState) => {
    if(gameState.errorMessage) console.log(`ERROR! ${gameState.errorMessage}`)
    console.log(gameState.board.join('\n'))
    console.log(`Current Player: ${gameState.player}`)
    console.log("")
} 

logGamestate(initialState)

const move:Move = { x: 1, y: 1 }
const state2 = makeMove(initialState, move)
logGamestate(state2)

const move2:Move = { x: 2, y: 0 }
export const state3 = makeMove(state2, move)
logGamestate(state3)

type SetGameState = (gs:GameState) => void

type JSXElementForGameState = (gameState: GameState, setGameState:SetGameState) => JSXElement

const jsxElementForSquare = (square:Square, y:number, x:number, setGameState:SetGameState, gs:GameState):JSXElement => (
    <>
        { square == _ ? <button onClick={() => setGameState(makeMove(gs, {x, y}))}>_</button> : square }
    </>
)

const jsxElementForRow = (row:Row, y:number, setGameState:SetGameState, gs:GameState):JSXElement => (
    <>
        {row.map((square, x) => <td>{jsxElementForSquare(square, y, x, setGameState, gs)}</td>)}
    </>
)

export const jsxElementForGameState:JSXElementForGameState = (gs, setGameState) => (
    <>
        <table>
            {
                rows(gs.board).map((row, y) => <tr>{jsxElementForRow(row, y, setGameState, gs)}</tr>)
            }
        </table>
        <br></br>
        {gs.errorMessage ? <div>Error {gs.errorMessage}</div> : null}
        <div> Current Player: {gs.player}</div>
    </>
)