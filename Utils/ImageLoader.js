class ImageLoader {
    async load(size, path) {
        let imagePath = undefined;
        if (path !== undefined)
        {
            imagePath = localStorage.Image;
        } else {
            let img = document.getElementById("image");
            if (img.files && img.files[0]) {
                imagePath = URL.createObjectURL(img.files[0]);
            } else {
                imagePath = "Icon/favicon.ico";
                localStorage.Image = "Icon/favicon.ico";
            }
        }

        let image = new Image();
        image.src = imagePath;
        await image.decode();

        return image;
    }
}