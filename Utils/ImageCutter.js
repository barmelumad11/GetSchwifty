class ImageCutter {
    async cutImageUp(size) {
        let imagePath = document.getElementById("image");
        let image = new Image();
        image.src = imagePath.files && imagePath.files[0] ? URL.createObjectURL(imagePath.files[0]) : "Icon/favicon.ico";
        await image.decode();
    
        let cellSize = Math.round(image.height / size);
        document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);
    
        var imagePieces = [];
    
        for (let row = 0; row < size; row++){
            for (let col = 0; col < size; col++){
                let canvas = document.createElement('canvas');
                canvas.width = cellSize;
                canvas.height = cellSize;
                canvas.style.width = cellSize;
                canvas.style.height = cellSize;
                let context = canvas.getContext('2d');
                context.drawImage(image, col * cellSize, row * cellSize, cellSize, cellSize, 0, 0, canvas.width, canvas.height);
                imagePieces.push(canvas);
            }
        }
    
        return imagePieces;
    }
}