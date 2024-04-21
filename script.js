var rows = 5;
var columns = 5;

var currTile;
var otherTile;

var turns = 0;


window.onload = function () {
    // initialize the 5x5 board
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img id="0-0" src="tile_2.png">
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "blank.jpg";

            // drag functionality
            tile.addEventListener("dragstart", dragStart);   // click on image to drag
            tile.addEventListener("dragover", dragOver);     // drag an image
            tile.addEventListener("dragenter", dragEnter);    // dragging an image into another one
            tile.addEventListener("dragleave", dragLeave);    // dragging an image away from another one
            tile.addEventListener("drop", dragDrop);    // drop an image onto another one
            tile.addEventListener("dragend", dragEnd);   // after you completed dragDrop

            document.getElementById("board").append(tile);
        }
    }

    //pieces
    let pices = [];
    for (let i = 1; i <= rows * columns; i++) {
        pices.push(i.toString());   // put 1 to 25 into the array (puzzle images names)

    }
    pices.reverse();
    for (let i = 0; i < pices.length; i++) {
        let j = Math.floor(Math.random() * pices.length);

        //swap
        let tmp = pices[i];
        pices[i] = pices[j];
        pices[j] = tmp;
    }

    for (let i = 0; i < pices.length; i++) {
        let tile = document.createElement("img");
        tile.src = pices[i] + ".jpg";

        // drag functionality
        tile.addEventListener("dragstart", dragStart);   // click on image to drag
        tile.addEventListener("dragover", dragOver);     // drag an image
        tile.addEventListener("dragenter", dragEnter);    // dragging an image into another one
        tile.addEventListener("dragleave", dragLeave);    // dragging an image away from another one
        tile.addEventListener("drop", dragDrop);    // drop an image onto another one
        tile.addEventListener("dragend", dragEnd);   // after you completed dragDrop

        document.getElementById("pices").append(tile);
    }
}


//drag tiles
function dragStart() {
    currTile = this; //this refers to the img tile being dragged    
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){
    
}

function dragDrop(){
    otherTile=this; //this refers to the img tile being dropped on
}

function dragEnd(){
    if(currTile.src.includes("blank")){
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src=otherImg;
    otherTile.src=currImg;

    turns+=1;

    document.getElementById("turns").innerText=turns;
}