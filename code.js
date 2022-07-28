// 0 == empty
// 1 == red
// 2 == yellow
// 3 == possibility

let connectField = [[0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0], 
                    [0, 0, 0, 0, 0, 0, 0], 
                    [3, 3, 3, 3, 3, 3, 3]];

var turn = 1;
                    
window.onload = function(){
    drawField(connectField);
};

function drawField(field){
    let connect = createFieldHTML(field);
    document.getElementById("connect_container").innerHTML = connect;
}

function createFieldHTML(field){
    let fieldHTML = "<table>";
    for (let i = 0; i < field.length; i++){
        fieldHTML += createRowHTML(field, i);
    }
    fieldHTML += "</table>";
    return fieldHTML;
}

function createRowHTML(field, row){
    let rowHTML = "<tr>";
    for (let i = 0; i < field[row].length; i++){
        rowHTML += createCellHTML(field, row, i);
    }
    rowHTML += "</tr>";
    return rowHTML;
}

function createCellHTML(field, row, col){
    let cellValue = field[row][col];
    if (cellValue == 0){
        return '<td><span class="empty"></span></td>';
    }
    else if (cellValue == 1){
        return '<td><span class="red"></span></td>';
    }
    else if (cellValue == 2){
        return '<td><span class="yellow"></span></td>';
    }
    else if (cellValue == 3){
        return '<td onclick=clickHandler(this)><span class="possibility"></span></td>';
    }
}

function clickHandler(cell){
    let row = cell.parentNode.rowIndex;
    let col = cell.cellIndex;
    placeCoin(connectField, row, col);
    updatePossibilities(connectField, row, col)
    drawField(connectField);
    if (checkWin(connectField, row, col)){
        if (turn == 2) alert("Red wins!");
        else alert("Yellow wins!");
    }
}

function placeCoin(field, row, col){
    if (canPlaceCoin(field, row, col)){
        if (turn == 1){
            field[row][col] = 1;
            turn = 2;
        }
        else if (turn == 2){
            field[row][col] = 2;
            turn = 1;
        }
    }
}

function canPlaceCoin(field, row, col){
    if (field[row][col] == 3) {
        return true;
    }
    else {
        return false;
    }
}

function updatePossibilities(field, row, col){
    if (row != 0){
        field[row - 1][col] = 3;
    }
}

function checkWin(field, row, col){

    let bottom = checkBottom(field, row, col);
    let left = checkLeft(field, row, col);
    let bottomLeft = checkBottomLeft(field, row, col);
    let bottomRight = checkBottomRight(field, row, col);

    if (bottom || left || bottomLeft || bottomRight){
        return true;
    }
    else {
        return false;
    }

}

function checkBottom(field, row, col){
    if (row <= 3){
        let previousTurn;

        if (turn == 1) previousTurn = 2;
        else previousTurn = 1;

        let counter = 1;
        for (let i = row + 1; i <= row + 3; i++){
            if (field[i][col] == previousTurn) counter++;
            else if (field[i][col] != previousTurn) break;
        }

        if (counter == 4) return true;
        else return false;
    }
    else return false;
}

function checkLeft(field, row, col){
    if (col >= 3){
        let previousTurn;

        if (turn == 1) previousTurn = 2;
        else previousTurn = 1;

        let counter = 1;
        for (let i = col - 1; i >= col - 3; i--){
            if (field[row][i] == previousTurn) counter++;
            else if (field[row][i] != previousTurn) break;
        }

        if (counter == 4) return true;
        else return false;
    }
    else return false;
}

function checkBottomLeft(field, row, col){
    if (row < 3 && col > 2){
        let previousTurn;

        if (turn == 1) previousTurn = 2;
        else previousTurn = 1;

        let counter = 1;
        for (let i = 0; i < 3; i++){
            if (field[++row][--col] == previousTurn) counter++;
            else if (field[++row][--col] != previousTurn) break;
        }

        if (counter == 4) return true;
        else return false;
    }
    else return false;
}

function checkBottomRight(field, row, col){
    if (row < 3 && col < 4){
        let previousTurn;

        if (turn == 1) previousTurn = 2;
        else previousTurn = 1;

        let counter = 1;
        for (let i = 0; i < 3; i++){
            if (field[++row][++col] == previousTurn) counter++;
            else if (field[++row][++col] != previousTurn) break;
        }

        if (counter == 4) return true;
        else return false;
    }
    else return false;
}
