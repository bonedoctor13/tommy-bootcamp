// would the check win and draw function be a type or CONST? do I need the extra parenthesis in checkWin (thinking NO)? what is js equivalent of "if, else if, else" - is it the ternary expression? am I using the map feature to check for the win or draw?

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