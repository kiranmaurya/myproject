    // const tiles = Array.from(document.querySelectorAll('.cells'));
    const playerDisplay = document.querySelector('.display-player');
    const announcer = document.querySelector('.announcer');
    const cells = document.querySelectorAll('.cells');

    [].forEach.call(cells, (e)=>{
    console.log(e);
    });
    const tiles =Array.from(cells);

    tiles.forEach( (cells, index) => {
        cells.addEventListener('click', () => userAction(cells, index));
    });
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';


    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (cells) => {
        if (cells.innerText === 'X' || cells.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (cells, index) => {
        if(isValidAction(cells) && isGameActive) {
            cells.innerText = currentPlayer;
            cells.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

   


//     let SIDE = 3;
// let board = [
//     [],
//     [],
//     []
// ];
// function initialise(board) {
//     console.log ("\n\n\tTic Tac Toe\n\n") ;
//     console.log ("Player 1 (X)  -  Player 2 (O)");
//     console.log ;
//     for (var i = 0; i < SIDE; i++) {
//         for (var j = 0; j < SIDE; j++) {
//             board[i][j] = '*';
//         }
//     }
// }
// function main()
// {
// 	var player = 1,i,choice;
//     var mark;
//     do
//     {
//         initialise(board);
//         player=(player%2)?1:2;

//         console.log << "Player " << player << ", enter a number:  ";
//         var choice =1 ;

//         mark=(player == 1) ? 'X' : 'O';

//         if (choice == 1 && board[0][0] == '1')

//         board[0][0] = mark;
//         else if (choice == 2 && board[0][1] == '2')

//         board[0][1] = mark;
//         else if (choice == 3 && board[0][2] == '3')

//         board[0][2] = mark;
//         else if (choice == 4 && board[1][0] == '4')

//         board[1][0] = mark;
//         else if (choice == 5 && board[1][1] == '5')

//         board[1][1] = mark;
//         else if (choice == 6 && board[1][2] == '6')

//         board[1][2] = mark;
//         else if (choice == 7 && board[2][0] == '7')

//         board[2][0] = mark;
//         else if (choice == 8 && board[2][1] == '8')

//         board[2][1] = mark;
//         else if (choice == 9 && board[2][2] == '9')

//         board[2][2] = mark;
//         else
//         {
//             console.log<<"Invalid move ";

//         }
//         i=checkwin();

//         player++;
//     }while(i==-1);
//     initialise();
//     if(i==1)

//         console.log("player win ");
//     else
//         console.log("==>\aGame draw");
//     return 0;
// }

// /*********************************************
//     FUNCTION TO RETURN GAME STATUS
//     1 FOR GAME IS OVER WITH RESULT
//     -1 FOR GAME IS IN PROGRESS
//     O GAME IS OVER AND NO RESULT
// **********************************************/

// function checkwin()
// {
//     if (board[0][0]== board[0][1]&& board[0][1]== board[0][2])

//         return 1;
//     else if (board[1][0]== board[1][1]&& board[1][1]== board[1][2])

//         return 1;
//     else if (board[2][0]== board[2][1]&& board[2][1]== board[2][2])

//         return 1;
//     else if (board[0][0]== board[1][0]&& board[1][0]== board[2][0])

//         return 1;
//     else if (board[0][1]== board[1][1]&& board[1][1]== board[2][1])

//         return 1;
//     else if (board[0][2]== board[1][2]&& board[1][2]== board[2][2])

//         return 1;
//     else if (board[0][0]== board[1][1]&& board[1][1]== board[2][2])

//         return 1;
//     else if (board[0][2]== board[1][1]&& board[1][1]== board[2][0])

//         return 1;
//     else if (board[0][0]!= '1' && board[0][1]!= '2' && board[0][2]!= '3'
//                     && board[1][0]!= '4' && board[1][1]!= '5' && board[1][2]!= '6'
//                   && board[2][0]!= '7' && board[2][1]!= '8' && board[2][2]!= '9')

//         return 0;
//     else
//         return -1;
// }

