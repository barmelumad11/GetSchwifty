class ImageCellInitializer {
    constructor (images) {
        this.images = images;
    }

    initializeCell(i, board, divToAppend, onClick) {
        let size = this.images[0].width;

        let dest = document.createElement('canvas');
        dest.width = size;
        dest.height = size;
        dest.className = "cell";
        dest.addEventListener("click", () => onClick(i));

        if (board.matrix[i] != 0) {
            let ctx = dest.getContext("2d");
            ctx.drawImage(this.images[board.matrix[i] - 1], 0, 0);
        }

        divToAppend.appendChild(dest);
    }
}