class ImageLoader {
    async load() {
        let img = document.getElementById("image");
        let imagePath = img.files && img.files[0] ? URL.createObjectURL(img.files[0]) : "Icon/favicon.ico";

        let image = new Image();
        image.src = imagePath;
        await image.decode();

        return image;
    }
}