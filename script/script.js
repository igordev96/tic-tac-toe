let squares = document.querySelectorAll(".square");
let newGame = document.querySelector(".new");
let start = document.querySelector(".start");
let ticTacToe = document.querySelector(".board");
let title = document.querySelector(".title");
let scorePos = document.querySelectorAll(".score");
let emoji = "";

let board = ["","","","","","","","",""];
let playerTurn = 0;
let win = false;
let tie = false;
let scoreO = 0;
let scoreX = 0;
const pieces = ['O', 'X'];

// const winChances = [
//     ["0", "1", "2"],
//     ["3", "4", "5"],
//     ["6", "7", "8"],
//     ["0", "3", "6"],
//     ["1", "4", "7"],
//     ["2", "5", "8"],
//     ["0", "4", "8"],
//     ["2", "4", "6"]
// ];

newGame.addEventListener("click", () => {
    start.style.display = "none";
    start.style.opacity = "0";
    ticTacToe.style.display = "grid";
    ticTacToe.style.opacity = "1";
    scorePos[0].style.display = "block";
    scorePos[1].style.display = "block";
});

setInterval(() => {
    if(isWin() || isTie()){
        if(win){
            if(playerTurn == 0){
                emoji = "😼";
            } else {
                emoji = "🐧";
            }
            title.innerHTML = "The Player " + emoji + " won";
            getScore();
        } else {
            title.innerHTML = "It's a tie!"
        }

        start.style.display = "flex";
        start.style.opacity = "1";
        ticTacToe.style.display = "none";
        ticTacToe.style.opacity = "0";

        reset();
    }
}, 100)

scorePos.forEach((score) => {
    score.addEventListener("click", () => {
        resetScore();
    })
})

squares.forEach((square) => {
    square.addEventListener("click", makeMovement);
});

function makeMovement(event){
    let position = event.target;
    if(position.classList.value == "square"){
        if(position.innerHTML!=""){
            return; 
        }
        if(win) return; 
        position.innerHTML = "<div class=" + pieces[playerTurn] + "></div>";
        board[position.id] = pieces[playerTurn];
        if(isWin() || isTie()) return;   
        playerTurn = playerTurn == 1 ? 0 : 1;
    } else{
        return ;
    }  
}

function isWin(){
    if(board[0] == board[1] && board[0]==board[2] && board[0]!=""){
       return win=true;
    } else if(board[3] == board[4] && board[3]==board[5] && board[3]!=""){
        return win=true;
    } else if(board[6] == board[7] && board[6]==board[8] && board[6]!=""){
        return win=true;
    } else if(board[0] == board[3] && board[0]==board[6] && board[0]!=""){
        return win=true;
    } else if(board[1] == board[4] && board[1]==board[7] && board[1]!=""){
        return win=true;
    } else if(board[2] == board[5] && board[2]==board[8] && board[2]!=""){
        return win=true;
    } else if(board[0] == board[4] && board[0]==board[8] && board[0]!=""){
        return win=true;
    } else if(board[2] == board[4] && board[2]==board[6] && board[2]!=""){
        return win=true;
    } else {
        return win = false;
    }
}

function getScore(){
    playerTurn == 0 ? scoreO++ : scoreX++;
    scorePos[0].innerHTML = "😼: " + scoreO;
    scorePos[1].innerHTML = "🐧: " + scoreX;
}

function isTie(){
    let full = 0;
    for (let i of board) {
        if (i == ""){

        } else {
            full++;
        }
    }

    if(full == 9){
        return tie = true;
    } else{
        return tie = false;
    }
}

function reset(){
    win = false;
    tie = false;
    board = ["","","","","","","","",""];
    squares.forEach((square) => {
        square.innerHTML = "";
    });
}

function resetScore(){
    scoreO = 0;
    scoreX = 0;
    scorePos[0].innerHTML = "😼: " + scoreO;
    scorePos[1].innerHTML = "🐧: " + scoreX;
}