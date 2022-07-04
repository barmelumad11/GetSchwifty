class GameFactory {
    createGame(size) {
        const arrayShuffler = new ArrayShuffler();
        const matrixValidator = new MatrixValidator();
        const boardFactory = new BoardFactory();
    
        //let board = boardFactory.createSolvableBoard(size, arrayShuffler, matrixValidator);
        let board = boardFactory.createEasyBoard(size);
        return new Game(board, 0, false);
    }

    createFromState(gameState) {
        return new Game(gameState.board, gameState.movesPlayed, gameState.isOver);
    }
}