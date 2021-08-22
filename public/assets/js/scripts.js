// Function called whenever user tab on any box
function initDecide() {

    // Setting DOM to all boxes or input field
    var b1, b1, b3, b4, b5, b6, b7, b8, b9, i, bArray = [];
    for (i = 1; i <= 9; i++) {
        bArray[i] = document.getElementById("b" + i).value;
    }
    console.log(bArray);

    // Checking if Player X won or not and after 
    // that disabled all the other fields
    if (
        ((bArray[1] == 'X') && (bArray[2] == 'X') && (bArray[3] == 'X')) ||
        ((bArray[1] == 'X') && (bArray[4] == 'X') && (bArray[7] == 'X')) ||
        ((bArray[1] == 'X') && (bArray[5] == 'X') && (bArray[9] == 'X')) ||

        ((bArray[2] == 'X') && (bArray[5] == 'X') && (bArray[8] == 'X')) ||

        ((bArray[3] == 'X') && (bArray[5] == 'X') && (bArray[7] == 'X')) ||
        ((bArray[3] == 'X') && (bArray[6] == 'X') && (bArray[9] == 'X')) ||

        ((bArray[4] == 'X') && (bArray[5] == 'X') && (bArray[6] == 'X')) ||

        ((bArray[7] == 'X') && (bArray[8] == 'X') && (bArray[9] == 'X'))

    ) {
        document.getElementById('print').innerHTML = "Player X won";
        for (i = 1; i <= 9; i++) {
            bArray[i] = document.getElementById("b" + i).disabled = true;
        }
        window.alert('Player X won');
    }

    // Checking of Player X finsh
    // Checking for Player 0 starts, Is player 0 won or
    // not and after that disabled all the other fields
    else if (
        ((bArray[1] == '0') && (bArray[2] == '0') && (bArray[3] == '0')) ||
        ((bArray[1] == '0') && (bArray[4] == '0') && (bArray[7] == '0')) ||
        ((bArray[1] == '0') && (bArray[5] == '0') && (bArray[9] == '0')) ||

        ((bArray[2] == '0') && (bArray[5] == '0') && (bArray[8] == '0')) ||

        ((bArray[3] == '0') && (bArray[5] == '0') && (bArray[7] == '0')) ||
        ((bArray[3] == '0') && (bArray[6] == '0') && (bArray[9] == '0')) ||

        ((bArray[4] == '0') && (bArray[5] == '0') && (bArray[6] == '0')) ||

        ((bArray[7] == '0') && (bArray[8] == '0') && (bArray[9] == '0'))

    ) {
        document.getElementById('print').innerHTML = "Player 0 won";
        for (i = 1; i <= 9; i++) {
            bArray[i] = document.getElementById("b" + i).disabled = true;
        }
        window.alert('Player 0 won');
    }

    // Checking of Player 0 finsh
    // Here, Checking about Tie
    else if (
        (bArray[1] == 'X' || bArray[1] == '0') &&
        (bArray[2] == 'X' || bArray[2] == '0') &&
        (bArray[3] == 'X' || bArray[3] == '0') &&
        (bArray[4] == 'X' || bArray[4] == '0') &&
        (bArray[5] == 'X' || bArray[5] == '0') &&
        (bArray[6] == 'X' || bArray[6] == '0') &&
        (bArray[7] == 'X' || bArray[7] == '0') &&
        (bArray[8] == 'X' || bArray[8] == '0') &&
        (bArray[9] == 'X' || bArray[9] == '0')
    ) {
        document.getElementById('print').innerHTML = "Match Tie";
        window.alert('Match Tie');
    } else {
        // Here, Printing Result
        if (flag == 1) {
            document.getElementById('print').innerHTML = "Player X Turn";
        } else {
            document.getElementById('print').innerHTML = "Player 0 Turn";
        }
    }
}

// Function to reset game
function resetGame() {
    location.reload();
    for (i = 1; i <= 9; i++) {
        document.getElementById("b" + i).value = '';
    }
}

// Here onwards, functions check turn of the player 
// and put accordingly value X or 0
flag = 1;

function toogleTurn(element) {
    var i;
    console.log(element.getAttribute("id"));
    for (i = 1; i <= 9; i++) {
        if (element.getAttribute("id") == "b" + i) {
            if (flag == 1) {
                document.getElementById("b" + i).value = "X";
                document.getElementById("b" + i).disabled = true;
                flag = 0;
            } else {
                document.getElementById("b" + i).value = "0";
                document.getElementById("b" + i).disabled = true;
                flag = 1;
            }
        }
    }
}