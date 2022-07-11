
let COMPUTER=1;
let HUMAN=2;
let SIDE=3;
let COMPUTERMOVE='O';
let HUMANMOVE='X';
let board = [[],[],[]];
let moveIndex = 0;
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
	console.log("\t\t\t",board[0][0] ,"|", board[0][1] ,"|", board[0][2],"\n");
	console.log("\t\t\t-----------\n");
	console.log("\t\t\t",board[1][0] ,"|", board[1][1] ,"|", board[1][2],"\n");
	console.log("\t\t\t-----------\n");
	console.log("\t\t\t" ,board[2][0] ,"|", board[2][1] ,"|", board[2][2],"\n");
}
  
  //Show Instructions function

 function showInstructions() {
	console.log("\nChoose a cell numbered from 1 to 9 as below and play\n\n");
	console.log("\t\t\t 1 | 2 | 3 \n");
	console.log("\t\t\t-----------\n");
	console.log("\t\t\t 4 | 5 | 6 \n");
	console.log("\t\t\t-----------\n");
	console.log("\t\t\t 7 | 8 | 9 \n\n");
  }
  
  // Initially the board to '*' as said

function initialise(board) {
	for (var i = 0; i < SIDE; i++) {
	  for (var j = 0; j < SIDE; j++){
		board[i][j] = '*';
	  }
	}
}
  
  

// Function to declareWinner
function declareWinner(whoseTurn) {
	if (whoseTurn == COMPUTER){
	  console.log("COMPUTER has won\n");
	  document.getElementById("print").innerHTML += "COMPUTER has won\n"
}
	else {
	  console.log("HUMAN has won\n");
	  document.getElementById("print").innerHTML += "HUMAN has won\n"
	}
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

function setSymbol(n,whoseTurn){
	cellId = "#"+n;
	if (whoseTurn == COMPUTER) {
		$(cellId).text(COMPUTERMOVE);
	} else {
		$(cellId).text(HUMANMOVE);
	}
}
function checkWhoWin(whoseTurn){
	if (gameOver(board) == false && moveIndex == SIDE * SIDE){
		console.log("It's a draw\n");
		document.getElementById("print").innerHTML += "It's a draw\n"
	} else {
		if (whoseTurn == COMPUTER)
			whoseTurn = HUMAN;
		else if (whoseTurn == HUMAN)
			whoseTurn = COMPUTER;
		declareWinner(whoseTurn);
	}
	return 0;
}
function humanPlay(whoseTurn,n){
	var x = 0, y = 0;
	x =parseInt(n / SIDE);
	y = n % SIDE;
	if (board[x][y] == '*' && n < 9 && n >= 0) {
		board[x][y] = HUMANMOVE;
		setSymbol(n,whoseTurn);
		showBoard(board);
		moveIndex++;
		checkWhoWin(whoseTurn);
		whoseTurn = COMPUTER;
		computerPlay(whoseTurn,null);
	}
}
function computerPlay(whoseTurn,n){
	var x = 0, y = 0;
	n = bestMove(board, moveIndex);
	x = parseInt(n / SIDE);
	y = n % SIDE;
	board[x][y] = COMPUTERMOVE;
	setSymbol(n,whoseTurn);
	moveIndex++;
	checkWhoWin(whoseTurn);
	whoseTurn = HUMAN;
}
// Function for playgame
function main(choice){
	initialise(board);
	choice = prompt("Do you want to start first?(y/n) : " ,"");
	if (choice == 'n'){
	    computerPlay(COMPUTER,null);
	}
	return 0;
}