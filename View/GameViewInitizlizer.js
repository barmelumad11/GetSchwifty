class GameViewIntializer {
    constructor (game, topScoreTable, boardDiv, name, winningDiv, cellInitializer) {
        this.game = game;
        this.topScoreTable = topScoreTable;
        this.boardDiv = boardDiv;
        this.name = name;
        this.winningDiv = winningDiv;
        this.cellInitializer = cellInitializer;
    }

    initialize() {
        this.boardDiv.style.gridTemplateColumns = `repeat(${this.game.board.size}, auto)`;
        this.updateBoard();
    }

    updateBoard() {
        while (this.boardDiv.firstChild) {
            this.boardDiv.removeChild(this.boardDiv.firstChild);
        }

        this.initializeBoard();
    }

    initializeBoard() {
        for (let i in this.game.board.matrix) {
            this.cellInitializer.initializeCell(i, this.game.board, this.boardDiv, () => this.onClick(i));
        }
    }

    onClick(i) {
        if (this.game.moveIfPossible(i)) {
            this.updateBoard();
        }

        if (this.game.isOver) {
            let now = new Date();
            this.topScoreTable.newScore(new Score(this.name, this.game.movesPlayed, this.game.board.size, `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`))
            this.winningDiv.classList.add("show");
        }
    }
}