class Bootstraper {
    bootstrap() {
        let name = document.getElementById("name");
        let size = document.getElementById("size");
        let useImage = document.getElementById("useImage");

        let topScoreTable = localStorage.topScoresList === undefined ? new TopScoreTable([]) : new TopScoreTable(JSON.parse(localStorage.topScoresList));
        
        let incrementSize = document.getElementById("incrementSize");
        incrementSize.addEventListener("click", () => {
            size.innerText = Number(size.innerText) + 1;
        });
        
        let decrementSize = document.getElementById("decrementSize");
        decrementSize.addEventListener("click", () => {
            size.innerText = size.innerText > 2 ? Number(size.innerText) - 1 : size.innerText;
        });
    
        let stateToView = new Map();

        let menuDiv = document.getElementById("menu");
        let topScoresPage = document.getElementById("topScores");
        let topScoresPageDiv = document.getElementById("topScoresPage");
        let boardDiv = document.getElementById("board");
        let boardPageDiv = document.getElementById("boardPage");
        let winningDiv = document.getElementById("winningMessage");
        
        stateToView.set("menu", new View(menuDiv));

        stateToView.set("topScores", new View(topScoresPageDiv, () => {
            while (topScoresPage.firstChild) {
                topScoresPage.removeChild(topScoresPage.firstChild);
            }

            for (let score in topScoreTable.topScores) {
                let div = document.createElement('div');
                div.innerText = `${topScoreTable.topScores[score].username}, ${topScoreTable.topScores[score].movesPlayed},`
                + `${topScoreTable.topScores[score].boardSize}, ${topScoreTable.topScores[score].date}`;
                topScoresPage.appendChild(div);
            }
        }));

        stateToView.set("board", new View(boardPageDiv, async () => {
            let game = new GameFactory().createGame(size.innerText);
            document.documentElement.style.setProperty('--cell-size', `${100}px`);
            let imageCutter = new ImageCutter();
            let cellInitializer = useImage.checked ? new ImageCellInitializer(await imageCutter.cutImageUp(size.innerText)) : new NumberCellInitializer();
            let gameViewIntializer = new GameViewIntializer(game, topScoreTable, boardDiv, name.value, winningDiv, cellInitializer);
            gameViewIntializer.initialize();

            let exportButton = document.getElementById("exportButton");
            exportButton.addEventListener("click", () => {
                let fileDonwloader = new FileDonwloader();
                fileDonwloader.download("game.json", JSON.stringify(game));
            });
        }));
        
        let viewStateMachine = new ViewStateMachine("menu", stateToView);
        
        let startButton = document.getElementById("startButton");
        startButton.addEventListener("click", () => {
            if (name.value !== "") {
                viewStateMachine.switchState("board");
            }
        });
            
        let restartButton = document.getElementById("restartButton");
        restartButton.addEventListener("click", () => {
            viewStateMachine.switchState("menu");
            winningDiv.classList.remove("show");
        });

        let topScoresButton = document.getElementById("topScoresButton");
        topScoresButton.addEventListener("click", () => {
            viewStateMachine.switchState("topScores");
            winningDiv.classList.remove("show");
        });

        let backToMenuButton = document.getElementById("backToMenuButton");
        backToMenuButton.addEventListener("click", () => {
            viewStateMachine.switchState("menu");
            winningDiv.classList.remove("show");
        });
    }
}