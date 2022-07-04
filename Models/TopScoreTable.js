class TopScoreTable {
    constructor(topScores) {
        this.topScores = topScores;
    }

    newScore(score) {
        this.topScores.push(score);
        this.topScores.sort((a, b) => {
            return a.movesPlayed - b.movesPlayed;
        });

        if (this.topScores.length > 5) {
            this.topScores.pop();
        }

        localStorage.topScoresList = JSON.stringify(this.topScores);
    }
}