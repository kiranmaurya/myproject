
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

// Function to declareWinner
function declareWinner(){

}

// Function to row
function rowCrossed(){

}

// Function to column 
function columnCrossed(){

}

// Function to diagonal crossing
function diagonalCrossed(){

}

// Function for game over
function gameOver(){

}

// Function to minimax algo
function minimax(){

}

// Function for best move
function bestMove(){

}

// Function for playgame
function playgame(){

}
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
		scanf("%d", & n);
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
	var cont = 'n';
	} while (cont == 'n');
	return;
}

main();