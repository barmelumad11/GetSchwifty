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
        localStorage.Settings = JSON.stringify(new Settings(this.name, new GameState(this.game.board, this.game.movesPlayed, this.game.isOver)));
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
            localStorage.Settings = JSON.stringify(new Settings(this.name, new GameState(this.game.board, this.game.movesPlayed, this.game.isOver)));
        }

        if (this.game.isOver) {
            let now = new Date();
            localStorage.removeItem("Settings");
            this.topScoreTable.newScore(new Score(this.name, this.game.movesPlayed, this.game.board.size, `${now.getDate()}-${now.getMonth()}-${now.getFullYear()}`))
            this.winningDiv.classList.add("show");
        }
    }
}