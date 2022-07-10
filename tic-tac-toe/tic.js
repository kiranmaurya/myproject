
let COMPUTER=1;
let HUMAN=2;
let SIDE=3;
let COMPUTERMOVE='O';
let HUMANMOVE='X';

// Function to reset game
function func_reset() {
	location.reload();
	document.getElementById('0').value = '';
	document.getElementById("1").value = '';
	document.getElementById("2").value = '';
	document.getElementById("3").value = '';
	document.getElementById("4").value = '';
	document.getElementById("5").value = '';
	document.getElementById("6").value = '';
	document.getElementById("7").value = '';
	document.getElementById("8").value = '';

}
function showBoard(board) {
	console.log("\t\t\t",board[0][0] ,"|", board[0][1] ,"|", board[0][2],"/n");
	console.log("\t\t\t-----------\n");
	console.log("\t\t\t",board[1][0] ,"|", board[1][1] ,"|", board[1][2],"/n");
	console.log("\t\t\t-----------\n");
	console.log("\t\t\t" ,board[2][0] ,"|", board[2][1] ,"|", board[2][2],"/n");
  }
  
  // Initially the board to '*' as said

function initialise( board) {
	for (var i = 0; i < SIDE; i++) {
	  for (var j = 0; j < SIDE; j++)
		board[i][j] = '*';
	}
  }
  
  

// Function to declareWinner
function declareWinner(whoseTurn) {
	if (whoseTurn == COMPUTER)
	  console.log("COMPUTER has won\n");
	else
	  console.log("HUMAN has won\n");
  }
  

// Function to row
function  rowCrossed(board) {
	for (var i = 0; i < SIDE; i++) {
	  if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != '*')
		return (true);
	}
	return (false);
}

// Function to column 
function columnCrossed(board) {
	for (var i = 0; i < SIDE; i++) {
	  if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != '*')
		return (true);
	}
	return (false);
}

// Function to diagonal crossing
function diagonalCrossed(board) {
	if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != '*')
	  return (true);
	if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != '*')
	  return (true);
	return (false);
}

// Function for game over
function gameOver(board) {
	return (rowCrossed(board) || columnCrossed(board) || diagonalCrossed(board));
  }

// Function to minimax algo
function minimax( board,depth,isAI) {
	var score = 0;
	var bestScore = 0;
	if (gameOver(board) == true) {
	  if (isAI == true)
		return -10;
	  if (isAI == false)
		return +10;
	} else {
	  if (depth < 9) {
		if (isAI == true) {
		  bestScore = -999;
		  for (var i = 0; i < SIDE; i++) {
			for (var j = 0; j < SIDE; j++) {
			  if (board[i][j] == '*') {
				board[i][j] = COMPUTERMOVE;
				score = minimax(board, depth + 1, false);
				board[i][j] = '*';
				if (score > bestScore) {
				  bestScore = score;
				}
			  }
			}
		  }
		  return bestScore;
		} else {
		  bestScore = 999;
		  for (var i = 0; i < SIDE; i++) {
			for (var j = 0; j < SIDE; j++) {
			  if (board[i][j] == '*') {
				board[i][j] = HUMANMOVE;
				score = minimax(board, depth + 1, true);
				board[i][j] = '*';
				if (score < bestScore) {
				  bestScore = score;
				}
			  }
			}
		  }
		  return bestScore;
		}
	  } else {
		return 0;
	  }
	}
  }
  

// Function for best move
function  bestMove(board,moveIndex) {
	var x = -1, y = -1;
	var score = 0, bestScore = -999;
	for (var i = 0; i < SIDE; i++) {
	  for (var j = 0; j < SIDE; j++) {
		if (board[i][j] == '*') {
		  board[i][j] = COMPUTERMOVE;
		  score = minimax(board, moveIndex + 1, false);
		  board[i][j] = '*';
		  if (score > bestScore) {
			bestScore = score;
			x = i;
			y = j;
		  }
		}
	  }
	}
	return x * 3 + y;
  }

// Function for playgame
function playTicTacToe(whoseTurn) {
	var board = [[]];
	var moveIndex = 0, x = 0, y = 0;
	initialise(board);
	showInstructions();
	while (gameOver(board) == false && moveIndex != SIDE * SIDE) {
	  var n;
	  if (whoseTurn == COMPUTER) {
		n = bestMove(board, moveIndex);
		x = n / SIDE;
		y = n % SIDE;
		board[x][y] = COMPUTERMOVE;
		console.log("COMPUTER has put a %c in cell %d\n\n", COMPUTERMOVE, n + 1);
		showBoard(board);
		moveIndex++;
		whoseTurn = HUMAN;
	  } else if (whoseTurn == HUMAN) {
		console.log("You can insert in the following positions : ");
		for (var i = 0; i < SIDE; i++)
		  for (var j = 0; j < SIDE; j++)
			if (board[i][j] == '*')
			  console.log("%d ", (i * 3 + j) + 1);
		console.log("\n\nEnter the position = ");
		var n = prompt("\n\nEnter the position = ");
		n--;
		x = n / SIDE;
		y = n % SIDE;
		if (board[x][y] == '*' && n < 9 && n >= 0) {
		  board[x][y] = HUMANMOVE;
		  console.log("\nHUMAN has put a %c in cell %d\n\n", HUMANMOVE,
			n + 1);
		  showBoard(board);
		  moveIndex++;
		  whoseTurn = COMPUTER;
		} else if (board[x][y] != '*' && n < 9 && n >= 0) {
		  console.log("\nPosition is occupied, select any one place from the available places\n\n");
		} else if (n < 0 || n > 8) {
		  console.log("Invalid position\n");
		}
	  }
	}
	if (gameOver(board) == false && moveIndex == SIDE * SIDE)
	  console.log("It's a draw\n");
	else {
	  if (whoseTurn == COMPUTER)
		whoseTurn = HUMAN;
	  else if (whoseTurn == HUMAN)
		whoseTurn = COMPUTER;
	  declareWinner(whoseTurn);
	}
  }
  
function main(){
	console.log("\n-------------------------------------------------------------------\n\n");
	console.log("\t\t\t Tic-Tac-Toe\n");
	console.log("\n-------------------------------------------------------------------\n\n");
	let cont = 'y';
	do {
	var choice;
	console.log("Do you want to start first?(y/n) : ");
	var choice = 'n';
	if (choice == 'n')
	playTicTacToe(COMPUTER);
	else if (choice == 'y')
		playTicTacToe(HUMAN);
	else
		console.log("Invalid choice\n");

	console.log("\nDo you want to quit(y/n) : ");
	cont = 'n';
	} while (cont == 'n');
	return;
}
main();