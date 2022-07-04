class NumberCellInitializer {
    initializeCell(i, board, divToAppend, onClick) {
        let div = document.createElement('div');
        div.className = "cell";
        div.innerHTML = board.matrix[i] == 0 ? "" : board.matrix[i];
        div.addEventListener("click", () => onClick(i));

        divToAppend.appendChild(div);
    }
}