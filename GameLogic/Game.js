class Game {
    constructor (board, movesPlayed, isOver) {
        this.board = board;
        this.movesPlayed = movesPlayed;
        this.isOver = isOver;
    }

    moveIfPossible(currentIndex) {
        if (this.isOver) {
            return false;
        }

        let newIndex = this.canMove(currentIndex);
        if (newIndex === -1) {
            return false;
        }
        
        this.move(currentIndex, newIndex);
        this.movePlayed();

        return true;
    }

    canMove(currentIndex) {
        const i = Number(currentIndex); 
        if (this.board.matrix[i] === 0) {
            return -1;
        }
        
        const size = Number(this.board.size);

        const left =  i % size !== 0 && this.board.matrix[i - 1] === 0;
        if (left) {
            return i - 1;
        }

        const right = i % size !== size - 1 && this.board.matrix[i + 1] === 0;
        if (right) {
            return i + 1;
        }

        const up = this.board.matrix[i - size] === 0;
        if (up) {
            return i - size;
        }


        const down = this.board.matrix[i + size] === 0;
        if (down) {
            return i + size;
        }

        return -1;
    }

    move(currentIndex, newIndex) {
        this.board.matrix[newIndex] = this.board.matrix[currentIndex];
        this.board.matrix[currentIndex] = 0;
    }

    movePlayed() {
        this.movesPlayed++;
        this.isOver = this.checkIfOver();
    }

    checkIfOver() {
        return this.board.matrix.join() == [...Array(this.board.size * this.board.size).keys(), 0].slice(1).join();
    }
}