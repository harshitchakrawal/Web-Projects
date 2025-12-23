const board = document.querySelector(".board")
const cells = document.querySelectorAll(".cell");
const winline = document.querySelector(".winline");
const win = document.querySelector(".win");
const redo = document.querySelector(".redo");
const ask = document.querySelector(".ask");
const computer = document.querySelector(".computer");
const friend = document.querySelector(".friend");

let clickcount = 0;
let gameover = false;

function resetgame() {
    setTimeout(() => {

        clickcount = 0;
        gameover = false;


        cells.forEach((cell) => {
            cell.innerText = "";
            cell.classList.remove("x", "o");
        });

        winline.className = "winline";
        win.innerText = "";
        win.classList.remove("win2");
        win.classList.remove("draw");

    }, 1500);

}
redo.addEventListener("click", () => {
    setTimeout(() => {
        cells.forEach((cell) => {
            cell.innerText = "";
            cell.classList.remove("x", "o");
        });


        winline.className = "winline";
        win.innerText = "";
        win.classList.remove("win2");
    }, 100);

});
function checkwin() {
    let winner = null;

    // Check all win conditions
    if (
        cells[0].innerText !== "" &&
        cells[0].innerText === cells[1].innerText &&
        cells[1].innerText === cells[2].innerText
    ) {
        winline.classList.add("row-1");
        winner = cells[0].innerText;
    }
    else if (
        cells[0].innerText !== "" &&
        cells[0].innerText === cells[3].innerText &&
        cells[3].innerText === cells[6].innerText
    ) {
        winline.classList.add("column-1");
        winner = cells[0].innerText;
    }
    else if (
        cells[3].innerText !== "" &&
        cells[3].innerText === cells[4].innerText &&
        cells[4].innerText === cells[5].innerText
    ) {
        winline.classList.add("row-2");
        winner = cells[3].innerText;
    }
    else if (
        cells[6].innerText !== "" &&
        cells[6].innerText === cells[7].innerText &&
        cells[7].innerText === cells[8].innerText
    ) {
        winline.classList.add("row-3");
        winner = cells[6].innerText;
    }
    else if (
        cells[1].innerText !== "" &&
        cells[1].innerText === cells[4].innerText &&
        cells[4].innerText === cells[7].innerText
    ) {
        winline.classList.add("column-2");
        winner = cells[1].innerText;
    }
    else if (
        cells[2].innerText !== "" &&
        cells[2].innerText === cells[5].innerText &&
        cells[5].innerText === cells[8].innerText
    ) {
        winline.classList.add("column-3");
        winner = cells[2].innerText;
    }
    else if (
        cells[0].innerText !== "" &&
        cells[0].innerText === cells[4].innerText &&
        cells[4].innerText === cells[8].innerText
    ) {
        winline.classList.add("diagonal-1");
        winline.classList.add("active");
        winner = cells[0].innerText;
    }
    else if (
        cells[2].innerText !== "" &&
        cells[2].innerText === cells[4].innerText &&
        cells[4].innerText === cells[6].innerText
    ) {
        winline.classList.add("diagonal-2");
        winline.classList.add("active");
        winner = cells[2].innerText;
    }

    // Handle winner
    if (winner) {
        gameover = true;
        win.classList.add("win2");
        win.innerText = winner + " WIN";
        setTimeout(() => {
            resetgame();
        }, 2000);
        return; // Exit early, don't check for draw
    }

    // Check for draw only if no winner
    let allFilled = true;
    cells.forEach((cell) => {
        if (cell.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled && !gameover) {
        gameover = true;
        win.classList.add("draw");
        win.innerText = "DRAW";
        setTimeout(() => {
            resetgame();

        }, 2000); 
    }
}

computer.addEventListener("click", () => {
    ask.style.display = "none"
    board.style.opacity = "1"
    redo.style.opacity = "1"
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {

            if (gameover) return;
            if (cell.innerText != "") return;

            cell.innerText = "❌";

            checkwin();
            if (gameover) return;
            setTimeout(() => {
                makecomputermove();
            }, 500);
        })
    })

})

function makecomputermove() {
    if (gameover) return;

    if (advancedcomputer()) {
        clickcount++;
        checkwin();
        return;
    }

    const emptyCells = Array.from(cells).filter(cell => cell.innerText === "");

    if (emptyCells.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const chosenCell = emptyCells[randomIndex];

    chosenCell.innerText = "⭕";
    clickcount++;

    advancedcomputer()
    checkwin();
}
function advancedcomputer() {
    // Check all winning/blocking patterns
    const patterns = [
        // Horizontal
        [0, 1, 2], [1, 2, 0], [0, 2, 1],
        [3, 4, 5], [4, 5, 3], [3, 5, 4],
        [6, 7, 8], [7, 8, 6], [6, 8, 7],
        // Vertical
        [0, 3, 6], [3, 6, 0], [0, 6, 3],
        [1, 4, 7], [4, 7, 1], [1, 7, 4],
        [2, 5, 8], [5, 8, 2], [2, 8, 5],
        // Diagonal
        [0, 4, 8], [4, 8, 0], [0, 8, 4],
        [2, 4, 6], [4, 6, 2], [2, 6, 4]
    ];

    for (let [a, b, c] of patterns) {
        if (cells[c].innerText === "" &&
            cells[a].innerText !== "" &&
            cells[a].innerText === cells[b].innerText) {
            cells[c].innerText = "⭕";
            cells[c].classList.add("o");
            return true; // Move made
        }
    }

    return false; // No smart move found
}


friend.addEventListener("click", () => {
    ask.style.display = "none"
    board.style.opacity = "1"
    redo.style.opacity = "1"

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {

            if (gameover) return;

            if (cell.innerText !== "") return;

            if (clickcount % 2 === 0) {
                cell.innerText = "❌";
                cell.classList.add("x");
            }
            else {
                cell.innerText = "⭕";
                cell.classList.add("o");
            }

            clickcount++;
            checkwin();
            return
        });
    });
})
