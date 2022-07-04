class View {
    constructor (menuDiv, initializationFunction) {
        this.menuDiv = menuDiv;
        this.initializationFunction = initializationFunction;
    }

    show() {
        if (this.initializationFunction !== undefined) {
            this.initializationFunction();
        }

        this.menuDiv.style.display = "grid";
    }

    hide() {
        this.menuDiv.style.display = "none";
    }
}