// variable keeps track whos turn it is.
let activePlayer = 'X';
//array that stores an array of moves. Used to determine win conditions.
let selectedSquares = [];

//function to place x or o in a square .
function placeXOrO(squareNumber) {
    //condition ensures a square hasnt been selected already
    //the .some() method is used to check each element of selectedSquare array to
    //see if it contains the square number clicked on.
    if (!selectedSquares.some(element => element.includes(squareNumber))) {
        //variable retrieves the html element id that was clicked.
        let select = document.getElementById(squareNumber);
        //condition checks who's turn it is.
        if (activePlayer === 'X') {
            //if activePlayer is X the X is placed in HTML.
            select.style.backgroundImage = 'url("images/x1.png")';
            //if not X then O    
        } else {
            select.style.backgroundImage = 'url("images/o1.png")';
        }
        //squareNumber and activePlayer are concatenated together and added to array.
        selectedSquares.push(squareNumber + activePlayer);
        //this calls a function to check for any win conditions.
        checkWinConditions();
        //this condition is for changing the active player 
        if (activePlayer === 'X') {
            //if active player is x change it to O
            activePlayer = 'O';
            //if active player is anything other than X
        } else {
            //chenge activeplayer to x
            activePlayer = 'X';
        }
        //this function plays placement sound
        audio('./media/place1.mp3');
        //condition checks if it is computers turn.
        if(activePlayer === 'O') {
            //function disables clicking for computers choice
            disableClick();
            //function waits 1 second before placing image and enable click
            setTimeout(function () {computersTurn(); }, 1000);
        }
        //returning true is needed for computersTurn function to work.
        return true; 
    }
    //function results in a random square being selected.
    function computersTurn() {
        //this boolean is needed for while loop
        let success = false;
        //this variable stores a random number 0-8
        let pickASquare;
        //condition allows while loop to keep trying if square already selected
        while(!success) {
            //a random number between 0 and 8 is selected
            pickASquare=String(Math.floor(Math.random()*9));
            //if the random number evaluates returns true, the square hasn't been selected yet.
            if (placeXOrO(pickASquare)) {
                //this line calls the function.
                placeXOrO(pickASquare);
                //changes our boolean and ends loop
                success = true;
            };
        }
    }
}
//this function parses the selectedSquares array to search for win conditions .
//drawWinLine function is called to draw line if condition is met.
function checkWinConditions() {
    // X 0, 1, 2 condition
    if  (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100); }
    //X 3, 4, 5
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304); }
    // X 6, 7, 8
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508); }
    // X 0, 3, 6
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558); }
    // X 1, 4, 7
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558); }
    // X 2, 5, 8
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558); }
    // X 6, 4, 2
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90); }
    // X 0, 4, 8
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520); }
    // O 0, 1, 2
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100); }
    //O 3, 4, 5
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304); }
    // O 6, 7, 8
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508); }
    // O 0, 3, 6
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558); }
    // O 1, 4, 7
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558); }
    // O 2, 5, 8
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558); }
    // O 6, 4, 2
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90); }
    // O 0, 4, 8
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520); }
    //This condition checks for tie. If none of the above conditions register
    //and 9 squares are selected, the code executes
    else if (selectedSquares.length >= 9) {
        //function plays the tie game sound
        audio('./media/tie1.mp3');
        //function sets a .3 second timer the resetGame is called
        setTimeout(function () { resetGame(); }, 1000);
    }
    //function checks if an array includes 3 strings.
    //check for each win condition
    function arrayIncludes(squareA, squareB, squareC) {
        // next 3 variables will be used to check for 3 in a row.
        const a = selectedSquares.includes(squareA);
        const b = selectedSquares.includes(squareB);
        const c = selectedSquares.includes(squareC);
        //if the 3 variables we pass are all included in array true is
        //returned and our else if condition executes the drawWinLine function.
        if (a === true && b === true && c === true) { return true; }
    }
}

// this function makes body element temporarily unclickable
function disableClick() {
    //this makes body uncklickable
    body.style.pointerEvents = 'none';
    //this makes body clickable again after 1 second
    setTimeout(function() {body.style.pointerEvents = 'auto';}, 1000);
}

//this function takes a string parameter of the path you set earlier for
//placement sound ('./media/place.mp3')
function audio(audioURL) {
    //we create a new audio object and pass the path as a parameter
    let audio = new Audio(audioURL);
    //play method plays audio sound
    audio.play();
}

//this function utilizes html canvas to draw win lines
function drawWinLine(coordX1, coordY1, coordX2, coordY2) {
    //this line accesses html canvas element
    const canvas = document.getElementById('win-lines');
    //this line gives us access to methods and properties to use on canvas
    const c = canvas.getContext('2d');
    //line indicates where the start of a lines x axis is.
    let x1 = coordX1,
    //line indicates where the start of a lines y axis is.
    y1 = coordY1,
    //line indicates where the end of a lines x axis is.
    x2 = coordX2,
    //line indicates where the end of a lines y axis is.
    y2 = coordY2,
    //variable stores temporary x axis data we update in our animation loop.
    x = x1,
     //variable stores temporary y axis data we update in our animation loop.
     y = y1;

//this function interacts with the canvas
function animateLineDrawing() {
    //variable creates the loop for when the game ends it restarts
    const animationLoop = requestAnimationFrame(animateLineDrawing);
    //method clears content from last loop iteration
    c.clearRect(0, 0, 608, 608);
    //this method starts a new path
    c.beginPath();
    //this method moves us to a starting point of our line 
    c.moveTo(x1, y1);
    //this method indicates the end point in our line
    c.lineTo(x, y);
    //set the width of our line
    c.lineWidth = 10;
    //this method sets the color of our line
    c.strokeStyle = 'rgba(70, 255, 33, .8)';
    //method draws everything we laid out above
    c.stroke();
    //condition checks if we've reached the endpoint
    if (x1 <= x2 && y1 <= y2) {
        //condition adds 10 to the previous end x point
        if (x < x2) { x += 10; }
        //condition adds 10 to the previous end y point
        if (y < y2) { y += 10; }
        //this condition cancels animation loop if reach the end points
        if (x >= x2 && y >= y2) { cancelAnimationFrame(animationLoop); }
    }
    //condition necessary for the 6, 4, 2 win conditions 
    if (x1 <= x2 && y1 >=y2) {
        if (x < x2) { x += 10; }
        if (y > y2) { y -= 10; }
        if (x >= x2 && y <= y2) { cancelAnimationFrame(animationLoop); }
    }
}
//this function clears canvas after win line is drawn
function clear() {
    //this line starts animation loop
    const animationLoop = requestAnimationFrame(clear);
    //this line clears canvas
    c.clearRect(0, 0, 608, 608);
    //this line stops animation loop
    cancelAnimationFrame(animationLoop);
}
//this line disallows clicking while the win sound is playing
disableClick();
//this line plays the win sounds
audio('./media/win1.mp3');
//this line calls main animation loop
animateLineDrawing();
//this line waits 1 second
//then clears canvas, resets game, and allows clicking again
setTimeout(function () { clear() ; resetGame(); },1000);
}
//this function resets the game in a tie or a win
function resetGame() {
    //this for loop iterates through each HTML square element
    for (let i = 0; i < 9; i++) {
        //this variable gets the html element of i
        let square = document.getElementById(String(i));
        //this removes elements background image
        square.style.backgroundImage = '';
    }
    //this resets array so it is empty and we can start over 
    selectedSquares = [];
}