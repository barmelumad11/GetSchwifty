class BoardFactory {
    createSolvableBoard(size, arrayShuffler, matrixValidator) {
        let unshuffled = [...Array(size * size).keys()];

        let shuffled = arrayShuffler.shuffle(unshuffled);
        while (!matrixValidator.validate(size, shuffled)) {
            shuffled = arrayShuffler.shuffle(unshuffled);
        }

        return new Board(size, shuffled);
    }

    createEasyBoard(size) {
        return new Board(size, [...Array(size * size - 1).keys(), 0, size * size - 1].slice(1));
    }
}