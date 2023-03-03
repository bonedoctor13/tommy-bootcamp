type Player = "X" | "O"
type Square = Player | "_"
type Row = Array<Square>
type Column = Array<Square>
type Board = Array<Array<Square>>
type GetSquare = (b:Board, x:Number, y:Number) => Square
type Move = {
    x:Number
    y:Number
}
type MakeMove = (gs:GameState, m:Move) => GameState

const nums:Array<number> = [1,2,3]
const squareMe = (t:number) => t * t 
const doubleMe = (t:number) => t * 2
const isEven = (t:number) => t % 2 == 0
const isOdd = (t:number) => {
    return t % 2 != 0 
}

const doubleMeIfIndexIsOdd = (johnny:number, i:number) => isOdd(i) ? johnny * 2 : johnny
const numToStringWithHelloInFront = (t:number) => `Hello ${t}`

type OurMap = <InputElementType, OutputElementType>
    (
        inputArray:Array<InputElementType>, 
        mapperFunction:(currentElement:InputElementType, i:number) => OutputElementType
    ) => Array<OutputElementType>

const myMap:OurMap = (inputArray, mapperFunction) => {
    var resultArray = []
    for(var i = 0; i < inputArray.length; i++) {
        resultArray[i] = mapperFunction(inputArray[i], i)
    }
    return resultArray
}

const strings = ["hi", "bye", "myes"]

const doubleOf7 = doubleMe(7)
const squaresOfNums = myMap(nums, squareMe)
const doublesOfNums = myMap(nums, doubleMe)
// doublesOfNumsMethodStyle = nums.map(doubleMe)
const doublesOfNumsInOddIndexPositions = myMap(nums, doubleMeIfIndexIsOdd)

const addEmptySpaceToString = (s:string) => `${s}    `

const result = myMap(strings, addEmptySpaceToString)
const disudisufh = myMap(nums, numToStringWithHelloInFront)

type SwitchPlayer = (p:Player) => Player
type GameState = {
    board: Board,
    player: Player
}

// confirm lower then upper
const switchPlayer = (p) => p == "X" ? "O" : "X"
const x = "X"
const o = "O"
const _ = "_"
const initialBoard:Board = [
    [_,_,_],
    [_,_,_],
    [_,_,_]
]
// check if example or part of code
const function: _ = (_,_) => _
const getSquare: GetSquare = (b,x,y) => b[y][x]
const initialState: GameState = {
    board: initialBoard,
    player: X
}
const makeMove: MakeMove = (gs, move) => ({
    // confirm this line based on picture on the () before row and whole line or separate
    board: gs.board.map(row, i) => i != move.y ? row:row.map((square, j) => j != move.x ? square:gs.player, player: switchPlayer(gs.player)
})