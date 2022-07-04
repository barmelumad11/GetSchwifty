class Bootstraper {
    bootstrap() {
        let name = document.getElementById("name");
        let size = document.getElementById("size");
        let useImage = document.getElementById("useImage");
        let importedGame = document.getElementById("importedGame");

        let topScoreTable = localStorage.topScoresList === undefined ? new TopScoreTable([]) : new TopScoreTable(JSON.parse(localStorage.topScoresList));
        let settings = localStorage.Settings === undefined ? undefined : JSON.parse(localStorage.Settings);
        
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
            if (importedGame.files[0]) {
                var fr = new FileReader();
                
                fr.onload = () => {
                    start(fr.result);
                }
                
                await fr.readAsText(importedGame.files[0])
            }
            else {
                start();
            }

            async function start(gameJson) {
                settings = localStorage.Settings === undefined ? undefined : JSON.parse(localStorage.Settings);
                if (settings === undefined) {
                    let game = gameJson ? new GameFactory().createFromState(JSON.parse(gameJson)) : new GameFactory().createGame(size.innerText);
                    document.documentElement.style.setProperty('--cell-size', `${100}px`);
                    let imageCutter = new ImageCutter();
                    let imageLoader = new ImageLoader();
                    let cellInitializer = useImage.checked ? new ImageCellInitializer(imageCutter.cutImageUp(await imageLoader.load(), size.innerText)) 
                    : new NumberCellInitializer();
                    let gameViewIntializer = new GameViewIntializer(game, topScoreTable, boardDiv, name.value, winningDiv, cellInitializer);
                    gameViewIntializer.initialize();
                    let exportButton = document.getElementById("exportButton");
    
                    exportButton.addEventListener("click", () => {
                        let fileDonwloader = new FileDonwloader();
                        fileDonwloader.download("game.json", JSON.stringify(new GameState(game.board, game.movesPlayed, game.isOver)));
                    });
                } else {
                    let game = new GameFactory().createFromState(settings.gameState);
                    document.documentElement.style.setProperty('--cell-size', `${100}px`);
                    let cellInitializer = new NumberCellInitializer();
                    let gameViewIntializer = new GameViewIntializer(game, topScoreTable, boardDiv, settings.name, winningDiv, cellInitializer);
                    gameViewIntializer.initialize();
                    let exportButton = document.getElementById("exportButton");
    
                    exportButton.addEventListener("click", () => {
                        let fileDonwloader = new FileDonwloader();
                        fileDonwloader.download("game.json", JSON.stringify(new GameState(game.board, game.movesPlayed, game.isOver)));
                    });
                }
            }
        }));
        
        let viewStateMachine = undefined;
        if (settings === undefined) {
            viewStateMachine = new ViewStateMachine("menu", stateToView);
        } else {
            viewStateMachine = new ViewStateMachine("board", stateToView);
        }
        
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

        let endGame = document.getElementById("endGame");
        endGame.addEventListener("click", () => {
            localStorage.removeItem("Settings");
            viewStateMachine.switchState("menu");
        });
    }
}