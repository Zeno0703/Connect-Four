// 0 == empty
// 1 == red
// 2 == yellow
// 3 == possibility

let connect_field = [[0, 0, 0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0],
                     [0, 0, 0, 0, 0, 0, 0], 
                     [0, 0, 0, 0, 0, 0, 0], 
                     [0, 0, 0, 0, 0, 0, 0], 
                     [3, 3, 3, 3, 3, 3, 3]];
                    
window.onload = function(){
    draw_field(connect_field);
};

function draw_field(field){
    let playing_field = create_field(field);
    document.getElementById("connect_container").innerHTML = playing_field;
}

function create_field(field){
    let fieldHTML = "<table>";
    for (let i = 0; i < field.length; i++){
        fieldHTML += create_row(field, i);
    }
    fieldHTML += "</table>";
    return fieldHTML;
}

function create_row(field, row){
    let rowHTML = "<tr>";
    for (let i = 0; i < field[row].length; i++){
        rowHTML += create_cell(field, row, i);
    }
    rowHTML += "</tr>";
    return rowHTML;
}

function create_cell(field, row, col){
    let cell_value = field[row][col];
    if (cell_value == 0){
        return '<td><span class="empty"></span></td>';
    }
    else if (cell_value == 1){
        return '<td><span class="red"></span></td>';
    }
    else if (cell_value == 2){
        return '<td><span class="yellow"></span></td>';
    }
    else if (cell_value == 3){
        return '<td onclick=click_cell(this)><span class="possibility"></span></td>';
    }
}

function click_cell(cell){
    let row = cell.parentNode.rowIndex;
    let col = cell.cellIndex;
    draw_click(connect_field, row, col);
    draw_field(connect_field);
}

function draw_click(field, row, col){
    field[row][col] = 1;
}
