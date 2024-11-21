var candies = ["Blue", "Green", "Orange", "Purple", "Red", "Yellow"];

// variables
var score = 0;
var board = [];
var rows = 9;
var cols = 9;

//find position of the candy
var currentTile;
var otherTile;

// when first load the screen show the borad full of candy
window.onload = function () {
  startGame();

  //1/10th of second
  window.setInterval(function () {
    crushCandy();
    slideCandy()
    generateRandomCandy();
    document.getElementById("score").innerText = score;
  }, 100);
};

function randomCandy() {
  return candies[Math.floor(Math.random() * candies.length)]; //0-5.99
}

function startGame() {
  for (r = 0; r < rows; r++) {
    let row = [];
    for (c = 0; c < cols; c++) {
      //create img element 9 * 9
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString();
      tile.src = "./images/" + randomCandy() + ".png";

      //Drag functionality
      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }

  console.log(board);
}

function dragStart() {
  // this refers to the tile that was clicked on for dragging
  currentTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  //this refers to the target tile that was dropped on
  otherTile = this;
}

function dragEnd() {
  //if it's a blank tile don't allow move
  if (currentTile.src.includes("blank") || otherTile.src.includes("blank")) {
    return;
  }

  let currentCoords = currentTile.id.split("-"); // id = "0-0" -> ["0","0"]
  let r = parseInt(currentCoords[0]); //x1
  let c = parseInt(currentCoords[1]); //y1

  let otherCoords = otherTile.id.split("-");
  let r2 = parseInt(otherCoords[0]); //x2
  let c2 = parseInt(otherCoords[1]); //y2

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveUp = c == c2 && r2 == r - 1;
  let moveDown = c == c2 && r2 == r + 1;

  let isMoved = moveDown || moveUp || moveLeft || moveRight;

  if (isMoved) {
    let currentImg = currentTile.src;
    let otherImg = otherTile.src;

    //swaped b/w 2 image
    currentTile.src = otherImg;
    otherTile.src = currentImg;

    //check if the move is allow
    let validMove = checkValid();
    if (!validMove) {
      let currentImg = currentTile.src;
      let otherImg = otherTile.src;

      //swaped b/w 2 image
      currentTile.src = otherImg;
      otherTile.src = currentImg;
    }
  }
}

function crushCandy() {
  crushFive();
  crushFour();
  crushThree();
}

function crushThree() {
  //check row
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "/images/blank.png";
        candy2.src = "/images/blank.png";
        candy3.src = "/images/blank.png";
        score += 10;
      }
    }
  }

  //check 'col'
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "/images/blank.png";
        candy2.src = "/images/blank.png";
        candy3.src = "/images/blank.png";
        score += 10;
      }
    }
  }
}

function crushFour() {
  //check row
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 3; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "/images/blank.png";
        candy2.src = "/images/blank.png";
        candy3.src = "/images/blank.png";
        candy4.src = "/images/blank.png";
        score += 10;
      }
    }
  }

  //check 'col'
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 3; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        !candy1.src.includes("blank")
      ) {
        console.log(`Crush found at row ${r}, cols ${c}-${c + 3}`);
        console.log("Before crushing:", candy1.src, candy2.src, candy3.src, candy4.src);


        candy1.src = "/images/blank.png";
        candy2.src = "/images/blank.png";
        candy3.src = "/images/blank.png";
        candy4.src = "/images/blank.png";
        score += 10;
      }
    }
  }
}

function crushFive() {
  //check row
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 4; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];
      let candy5 = board[r][c + 4];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        candy4.src == candy5.src &&
        !candy1.src.includes("blank")
      ) {
        candy1.src = "/images/blank.png";
        candy2.src = "/images/blank.png";
        candy3.src = "/images/blank.png";
        candy4.src = "/images/blank.png";
        candy5.src = "/images/blank.png";
        score += 10;
      }
    }
  }

  //check 'col'
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 4; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];
      let candy5 = board[r + 4][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        candy4.src == candy5.src &&
        !candy1.src.includes("blank")
      ) {

        candy1.src = "/images/blank.png";
        candy2.src = "/images/blank.png";
        candy3.src = "/images/blank.png";
        candy4.src = "/images/blank.png";
        candy5.src = "/images/blank.png";
        score += 10;
      }
    }
  }
}

function checkValid() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 2; c++) {
      let candy1 = board[r][c];
      let candy2 = board[r][c + 1];
      let candy3 = board[r][c + 2];
      let candy4 = board[r][c + 3];
      let candy5 = board[r][c + 4];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        candy4.src == candy5.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }

  //check 'col'
  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows - 2; r++) {
      let candy1 = board[r][c];
      let candy2 = board[r + 1][c];
      let candy3 = board[r + 2][c];
      let candy4 = board[r + 3][c];
      let candy5 = board[r + 4][c];

      if (
        candy1.src == candy2.src &&
        candy2.src == candy3.src &&
        candy3.src == candy4.src &&
        candy4.src == candy5.src &&
        !candy1.src.includes("blank")
      ) {
        return true;
      }
    }
  }
  return false;
}

function slideCandy() {
  for (let c = 0; c < cols; c++) {
    let ind = rows - 1; //start from the bottom 9 - 1
    for (let r = cols - 1; r >= 0; r--) {
      if (!board[r][c].src.includes("blank")) {
        board[ind][c].src = board[r][c].src;
        ind -= 1;
      }
    }

    for (let r = ind; r >= 0; r--) {
        board[r][c].src = "/images/blank.png"
        
      }
  }

  
}


function generateRandomCandy(){
    for (let c = 0; c < cols ; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png"; 
        }
        
    }
}